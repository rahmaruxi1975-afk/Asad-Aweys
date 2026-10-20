import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = parseInt(process.env.PORT || '3000', 10);

app.use(express.json({ limit: '10mb' }));

// Initialize Google GenAI
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System instruction for Asad's AI Academic Mentor
const ACADEMIC_MENTOR_SYSTEM_INSTRUCTION = `
You are "Asad's AI Academic Mentor", a dedicated, encouraging, and highly knowledgeable university mentor for Asad Aweys, who is studying BSc Public Health.

Asad's Public Health curriculum covers:
1. Public Health Law & Legislation (quarantine, sanitary regulations, IHR, ethics)
2. Meat Hygiene and Safety (abattoir inspection, zoonoses, slaughter hygiene, foodborne pathogens like Salmonella, Taenia, Campylobacter)
3. Health Economics (cost-effectiveness CEA, QALYs, DALYs, health financing, universal coverage)
4. Environmental Health Impact Assessment (EHIA, water quality, sanitation, waste management, air pollution)
5. International Health (WHO frameworks, global health disparities, pandemic preparedness, SDGs)
6. Mental Health (community mental health, stigma, psychiatric epidemiology, psychosocial support)
7. Monitoring and Evaluation (M&E logframes, indicators, SMART goals, program evaluation, surveillance)
8. Health Research Methodology (study designs: cross-sectional, case-control, cohort, RCT; sampling, bias, confounding, biostatistics, p-values, odds ratios, relative risks)
9. Population Demography & Reproductive Health (fertility, mortality, census, maternal/neonatal health, family planning)
10. Management and Administration (health systems leadership, strategic planning, human resources for health, supply chains)

Guidelines:
- Explain difficult public health topics clearly with real-world examples, step-by-step reasoning, and practical scenarios.
- Support English, Somali (Af-Soomaali), and Arabic (العربية) fluently. If the user asks in Somali or Arabic, respond in that language warmly and accurately.
- Provide study tips, generate revision flashcards, formulate practice MCQs with explanations, summarize lecture notes, and suggest structured study plans.
- Always be supportive, professional, inspiring, and academically rigorous.
`;

// AI Academic Mentor chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, subject, language = 'en' } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Valid messages array is required.' });
    }

    if (!process.env.GEMINI_API_KEY) {
      return res.status(503).json({
        error: 'GEMINI_API_KEY is not configured on the server. Please check the Secrets panel in AI Studio.',
        fallbackMessage:
          'API key is not detected in environment. Asad, you can configure your GEMINI_API_KEY in the AI Studio environment secrets panel to activate full interactive AI mentoring.'
      });
    }

    // Format contents for Gemini
    const lastUserMessage = messages[messages.length - 1]?.text || '';
    const conversationHistory = messages.slice(0, -1).map((m: { role: string; text: string }) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }],
    }));

    const promptText = `
Subject Context: ${subject || 'General Public Health'}
Preferred Response Language: ${language === 'so' ? 'Somali (Af-Soomaali)' : language === 'ar' ? 'Arabic (العربية)' : 'English'}

User Message:
${lastUserMessage}
`;

    const contents = [
      ...conversationHistory,
      {
        role: 'user',
        parts: [{ text: promptText }],
      },
    ];

    let response;
    try {
      response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents,
        config: {
          systemInstruction: ACADEMIC_MENTOR_SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    } catch (primaryErr: any) {
      console.warn('Primary model hit temporary demand spike, trying fallback model gemini-flash-latest:', primaryErr?.message);
      try {
        response = await ai.models.generateContent({
          model: 'gemini-flash-latest',
          contents,
          config: {
            systemInstruction: ACADEMIC_MENTOR_SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
      } catch (secondaryErr: any) {
        console.error('All AI models temporarily busy:', secondaryErr);
        return res.status(503).json({
          error: 'AI service is temporarily experiencing high load. Please try again in a moment.',
        });
      }
    }

    const reply = response.text || 'I am here to help you with your Public Health studies, Asad.';

    return res.json({ reply });
  } catch (error: any) {
    console.error('Error in /api/chat:', error);
    return res.status(500).json({
      error: error?.message || 'Failed to generate response from Gemini API',
    });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Vite or Static file serving
async function startServer() {
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${port}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});

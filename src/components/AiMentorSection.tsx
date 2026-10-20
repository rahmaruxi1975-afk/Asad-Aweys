import React, { useState, useRef, useEffect } from 'react';
import {
  Bot,
  Send,
  Sparkles,
  BookOpen,
  HelpCircle,
  CheckCircle,
  Copy,
  RefreshCw,
  AlertCircle,
  GraduationCap,
  FileCheck,
} from 'lucide-react';
import { Subject, Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface AiMentorSectionProps {
  subjects: Subject[];
  language: Language;
  profile: UserProfile;
}

export const AiMentorSection: React.FC<AiMentorSectionProps> = ({
  subjects,
  language,
  profile,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>('all');
  const [inputPrompt, setInputPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: `Assalamu Alaikum and welcome, Asad Aweys! I am your AI Academic Mentor for your BSc in Public Health.\n\nI can help you:\n• Break down complex epidemiology and biostatistics concepts (Odds Ratios, Relative Risk, P-values, Confounding)\n• Summarize your lecture notes for Public Health Law, Meat Hygiene, or Environmental Health\n• Generate 5-question mock quizzes and flashcards with detailed answer keys\n• Review research methodology, study designs, and M&E logframes\n• Provide explanations in English, Somali (Af-Soomaali), or Arabic (العربية)\n\nWhat topic would you like to explore today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId);
  const subjectName = selectedSubject ? selectedSubject.name : 'All Public Health Subjects';

  const handleSendMessage = async (textToSend?: string) => {
    const text = textToSend || inputPrompt;
    if (!text.trim() || loading) return;

    setErrorMessage(null);
    const userMsg: Message = {
      id: `usr-${Date.now()}`,
      role: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputPrompt('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({ role: m.role, text: m.text })),
          subject: subjectName,
          language,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Server error communicating with AI Mentor');
      }

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        role: 'model',
        text: data.reply || 'I am ready to help you with your Public Health studies, Asad.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (err: any) {
      console.error('Error contacting AI mentor:', err);
      setErrorMessage(
        err.message || 'Unable to connect to AI Mentor service. Please ensure your GEMINI_API_KEY is configured in AI Studio Secrets.'
      );

      // Provide local knowledge base fallback response for immediate educational benefit
      const fallbackText = getFallbackResponse(text, subjectName, language);
      const fallbackMsg: Message = {
        id: `bot-fallback-${Date.now()}`,
        role: 'model',
        text: `${fallbackText}\n\n*(Note: Generated via offline Public Health academic knowledge base. Real-time Gemini API will connect when backend key is active).*`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, fallbackMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickPrompt = (promptText: string) => {
    handleSendMessage(promptText);
  };

  const handleCopyText = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-900 via-sky-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-teal-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
            <Bot className="w-3.5 h-3.5" />
            <span>Asad's AI Academic Mentor • Powered by Gemini AI</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.aiMentor.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.aiMentor.subtitle}
          </p>
        </div>

        {/* Subject Context Selector */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 min-w-[220px] space-y-1">
          <label className="text-[10px] uppercase font-bold text-teal-300 block">
            Subject Focus Filter
          </label>
          <select
            value={selectedSubjectId}
            onChange={(e) => setSelectedSubjectId(e.target.value)}
            className="w-full text-xs font-bold bg-slate-900/90 text-white border border-teal-500/40 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-teal-400"
          >
            <option value="all">All Public Health Subjects</option>
            {subjects.map((sub) => (
              <option key={sub.id} value={sub.id}>
                {sub.code}: {sub.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Suggested Quick Prompt Chips */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400">
          <Sparkles className="w-3.5 h-3.5 text-teal-500" />
          <span>{t.aiMentor.quickPromptsTitle}:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            t.aiMentor.prompt1,
            t.aiMentor.prompt2,
            t.aiMentor.prompt3,
            t.aiMentor.prompt4,
            t.aiMentor.prompt5,
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickPrompt(prompt)}
              className="text-left text-xs bg-slate-50 dark:bg-slate-800/80 hover:bg-teal-50 dark:hover:bg-teal-950/40 hover:text-teal-700 dark:hover:text-teal-300 border border-slate-200 dark:border-slate-700/80 rounded-xl px-3 py-2 text-slate-700 dark:text-slate-300 transition-colors"
            >
              {prompt}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Messages Log */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col h-[550px] overflow-hidden">
        {/* Chat message stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((msg) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center shrink-0 shadow-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 text-xs sm:text-sm space-y-2 shadow-xs ${
                    isUser
                      ? 'bg-teal-600 text-white rounded-tr-none'
                      : 'bg-slate-50 dark:bg-slate-800/80 text-slate-800 dark:text-slate-200 border border-slate-200/80 dark:border-slate-700/80 rounded-tl-none'
                  }`}
                >
                  <div className="flex justify-between items-center text-[10px] opacity-75 pb-1 border-b border-white/10 dark:border-slate-700">
                    <span className="font-bold">
                      {isUser ? profile.name : 'AI Academic Mentor'}
                    </span>
                    <span>{msg.timestamp}</span>
                  </div>

                  <div className="whitespace-pre-wrap leading-relaxed font-sans">
                    {msg.text}
                  </div>

                  {!isUser && (
                    <div className="pt-2 flex justify-end">
                      <button
                        onClick={() => handleCopyText(msg.text)}
                        className="text-[10px] text-slate-500 hover:text-teal-600 dark:hover:text-teal-400 flex items-center gap-1"
                        title="Copy text"
                      >
                        <Copy className="w-3 h-3" />
                        Copy
                      </button>
                    </div>
                  )}
                </div>

                {isUser && (
                  <img
                    src={profile.avatarUrl}
                    alt={profile.name}
                    className="w-8 h-8 rounded-xl object-cover shrink-0 ring-1 ring-teal-500/40"
                  />
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 justify-start items-center">
              <div className="w-8 h-8 rounded-xl bg-teal-600 text-white flex items-center justify-center animate-pulse">
                <Bot className="w-4 h-4" />
              </div>
              <div className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-500 dark:text-slate-400 flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-teal-600" />
                <span>Asad's Academic Mentor is thinking & analyzing public health curricula...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder={t.aiMentor.placeholder}
              value={inputPrompt}
              onChange={(e) => setInputPrompt(e.target.value)}
              disabled={loading}
              className="flex-1 px-4 py-3 text-xs sm:text-sm rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-teal-500 text-slate-900 dark:text-white"
            />
            <button
              type="submit"
              disabled={loading || !inputPrompt.trim()}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-teal-600 hover:bg-teal-700 disabled:opacity-50 text-white text-xs font-bold shadow-sm transition-all shrink-0"
            >
              <span>{t.aiMentor.send}</span>
              <Send className="w-4 h-4" />
            </button>
          </form>

          <p className="text-[10px] text-slate-400 text-center mt-2">
            {t.aiMentor.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};

// Fallback academic explanation engine when offline or awaiting external key
function getFallbackResponse(query: string, subject: string, lang: Language): string {
  const q = query.toLowerCase();

  if (q.includes('odds ratio') || q.includes('relative risk') || q.includes('or vs rr')) {
    return `### Odds Ratio (OR) vs. Relative Risk (RR) in Epidemiology:

1. **Relative Risk (RR)**:
   - **Formula**: $RR = \\frac{Risk\\ in\\ Exposed}{Risk\\ in\\ Unexposed} = \\frac{A / (A + B)}{C / (C + D)}$
   - **When to use**: **Cohort studies** and Randomized Controlled Trials (RCTs) where incidence of disease can be directly computed.
   - **Interpretation**: RR = 1 means no association; RR > 1 indicates increased risk.

2. **Odds Ratio (OR)**:
   - **Formula**: $OR = \\frac{Odds\\ of\\ exposure\\ in\\ cases}{Odds\\ of\\ exposure\\ in\\ controls} = \\frac{A \\times D}{B \\times C}$
   - **When to use**: **Case-Control studies** where true incidence is unknown because the researcher chooses the number of cases and controls.
   - **Rare Disease Assumption**: When the disease is rare in the general population (< 5-10%), OR closely approximates RR!`;
  }

  if (q.includes('3 delays') || q.includes('maternal mortality') || q.includes('delays model')) {
    return `### The Three Delays Model in Maternal Mortality (Thaddeus & Maine):

1. **Delay 1: Deciding to Seek Care**
   - *Factors*: Low maternal health literacy, fear of clinical mistreatment, financial constraints, gender/patriarchal household decisions.
   - *Intervention*: Community mobilization, antenatal education, conditional cash transfers.

2. **Delay 2: Reaching an Adequate Healthcare Facility**
   - *Factors*: Remote terrain, impassable roads during rainy seasons, absence of functional ambulances, communication blackouts.
   - *Intervention*: Maternity waiting homes, emergency community transport schemes, motorized tricycles.

3. **Delay 3: Receiving Quality Care upon Arrival**
   - *Factors*: Shortage of blood products, stockouts of essential medicines (oxytocin, magnesium sulfate), lack of EmONC-trained personnel.
   - *Intervention*: Supply-chain strengthening, 24/7 emergency obstetric readiness, clinical audit and mentoring.`;
  }

  if (q.includes('meat') || q.includes('zoonoses') || q.includes('mcq')) {
    return `### Practice MCQs: Meat Hygiene & Zoonoses

**Question 1**: Which lesion in bovine carcasses warrants TOTAL condemnation rather than localized trimming?
- A) Localized fascioliasis in bile ducts
- B) Generalized acute Anthrax or septicaemia *(Correct)*
- C) Isolated healed injection abscess
- D) Mild localized bronchopneumonia

**Question 2**: What is the target temperature threshold for slaughterhouse carcass chilling rooms?
- A) ≤ 7°C for red meat *(Correct)*
- B) ≤ 15°C
- C) 0°C to -18°C
- D) 20°C`;
  }

  if (lang === 'so') {
    return `Walaal Asad, su'aashaada ku saabsan "${query}" ee maaddada ${subject}:

Caafimaadka Dadweynaha (Public Health) wuxuu ku salaysan yahay ka-hortagga cudurrada iyo daryeelka bulshada. Haddii aad u baahan tahay faahfaahin dheeri ah oo ku saabsan biostatistics, hababka kormeerka (M&E), ama nadaafadda deegaanka, si gaar ah u weydii qodobka aad doonayso inaan si talaabo-talaabo ah kuugu sharaxo!`;
  }

  return `Here is an academic breakdown regarding "${query}" in ${subject}:
1. **Core Concept**: Identify the population at risk and the primary public health determinants.
2. **Methodology**: Apply standardized WHO and epidemiologic protocols.
3. **Application**: Formulate evidence-based interventions suitable for community implementation and health systems strengthening.`;
}

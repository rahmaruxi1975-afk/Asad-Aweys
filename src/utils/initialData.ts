import { Subject, ExerciseItem, SleepRoutineData, UserProfile, CalendarEvent } from '../types';

export const INITIAL_USER_PROFILE: UserProfile = {
  name: 'Asad Aweys',
  title: 'BSc Public Health Scholar',
  degree: 'Bachelor of Science in Public Health',
  university: 'University Faculty of Public Health & Epidemiology',
  studentId: 'PH-2024-8849',
  email: 'asad.aweys@student.edu',
  bio: 'Dedicated Public Health student passionate about epidemiology, maternal and child health, biostatistics, environmental hygiene, and healthcare systems strengthening.',
  avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  targetDailyStudyMinutes: 240, // 4 hours
};

export const INITIAL_SUBJECTS: Subject[] = [
  {
    id: 'subject-1',
    name: 'Public Health Law & Legislation',
    nameSo: 'Sharciga & Xeerarka Caafimaadka Dadweynaha',
    nameAr: 'تشريعات وقوانين الصحة العامة',
    code: 'PHL-301',
    icon: 'Scale',
    color: '#0284c7', // sky-600
    progress: 72,
    description: 'Study of statutory powers, public health acts, international health regulations (IHR 2005), quarantine laws, infectious disease reporting mandates, and biomedical ethics.',
    notes: [
      {
        id: 'note-1-1',
        title: 'IHR (2005) & Public Health Emergencies of International Concern (PHEIC)',
        lectureNumber: 'Lecture 4',
        date: '2026-10-14',
        summary: 'Overview of legal triggers under WHO regulations for declaring a global public health emergency and state obligations.',
        content: `### Core Points:
1. **Scope of IHR (2005)**: Legally binding instrument on 196 countries to prevent, protect against, control and provide a public health response to the international spread of disease.
2. **Criteria for PHEIC**:
   - Is public health impact serious?
   - Is the event unusual or unexpected?
   - Is there significant risk of international spread?
   - Is there significant risk of international travel or trade restrictions?
3. **Balancing Civil Liberties vs Public Safety**:
   - Compulsory isolation vs voluntary quarantine.
   - Proportionality and least restrictive means doctrine.`,
        tags: ['WHO', 'IHR', 'Law', 'PHEIC'],
      },
      {
        id: 'note-1-2',
        title: 'Food & Sanitary Regulation Enforcement Powers',
        lectureNumber: 'Lecture 6',
        date: '2026-10-17',
        summary: 'Powers of public health inspectors: entry, seizure, condemnation of contaminated lots, and closure of unhygienic premises.',
        content: `### Legal Instruments:
- Statutory powers of environmental health officers (EHOs).
- Notice of improvement vs emergency closure orders.
- Due process and right of administrative appeal.`,
        tags: ['Sanitation', 'Enforcement', 'EHO'],
      },
    ],
    assignments: [
      {
        id: 'asg-1-1',
        subjectId: 'subject-1',
        title: 'Comparative Case Analysis: Quarantine Authority vs Personal Privacy',
        dueDate: '2026-10-28',
        status: 'in_progress',
        weight: 25,
        instructions: 'Critically analyze legal precedents regarding mandated isolation during communicable outbreaks under statutory public health law.',
      },
    ],
    exams: [
      {
        id: 'exam-1-1',
        subjectId: 'subject-1',
        title: 'Midterm Examination: Legal Frameworks & IHR',
        date: '2026-11-12',
        time: '09:00 AM',
        location: 'Lecture Hall B3',
        weight: 35,
        topics: ['Statutory Health Acts', 'IHR 2005', 'Quarantine jurisprudence', 'Medical confidentiality exceptions'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-1-1', text: 'Master legal criteria for emergency disease isolation and civil rights balance', completed: true },
      { id: 'goal-1-2', text: 'Understand drafting procedures for municipal sanitation bylaws', completed: false },
      { id: 'goal-1-3', text: 'Analyze International Health Regulations (2005) country obligations', completed: true },
    ],
    reviewSchedule: [
      { id: 'rev-1-1', topic: 'PHEIC criteria & WHO Director-General powers', nextReviewDate: '2026-10-22', status: 'pending', intervalDays: 3 },
      { id: 'rev-1-2', topic: 'Sanitary inspection enforcement notices', nextReviewDate: '2026-10-25', status: 'pending', intervalDays: 7 },
    ],
    resourceLinks: [
      { id: 'res-1-1', title: 'WHO International Health Regulations (2005)', url: 'https://www.who.int/publications/i/item/9789241580496', type: 'guideline' },
      { id: 'res-1-2', title: 'CDC Public Health Law Program', url: 'https://www.cdc.gov/phlp/index.html', type: 'other' },
    ],
  },
  {
    id: 'subject-2',
    name: 'Meat Hygiene and Safety',
    nameSo: 'Nadaafadda & Badbaadada Hilibka',
    nameAr: 'صحة وسلامة اللحوم والمجازر',
    code: 'MHS-304',
    icon: 'ShieldCheck',
    color: '#0d9488', // teal-600
    progress: 80,
    description: 'Ante-mortem and post-mortem inspection, slaughterhouse hygiene, zoonotic diseases (Anthrax, Bovine TB, Brucellosis, Taeniasis), HACCP systems, and cold-chain integrity.',
    notes: [
      {
        id: 'note-2-1',
        title: 'Ante-Mortem & Post-Mortem Inspection Protocols',
        lectureNumber: 'Lecture 3',
        date: '2026-10-12',
        summary: 'Key clinical signs to observe during rest and systematic organ palpation/incision on the slaughter floor.',
        content: `### Steps of Systematic Post-Mortem Inspection:
1. **Head & Lymph Nodes**: Submaxillary, parotid, and retro-pharyngeal lymph nodes. Check masseter muscles for *Cysticercus bovis*.
2. **Lungs & Pluck**: Palpate lung parenchyma; incise bronchial and mediastinal lymph nodes for granulomatous lesions (*Mycobacterium bovis*).
3. **Liver & Spleen**: Hepatic lymph nodes; inspect bile ducts for liver flukes (*Fasciola hepatica*).
4. **Carcass Condemnation Categories**: Total condemnation (anthrax, generalized emaciation, septicaemia) vs Partial trimming.`,
        tags: ['Abattoir', 'Inspection', 'Zoonoses'],
      },
    ],
    assignments: [
      {
        id: 'asg-2-1',
        subjectId: 'subject-2',
        title: 'HACCP Plan Design for Modern Abattoir Facility',
        dueDate: '2026-10-31',
        status: 'in_progress',
        weight: 30,
        instructions: 'Formulate Critical Control Points (CCPs) for evisceration, carcass chilling, and pathogen testing.',
      },
    ],
    exams: [
      {
        id: 'exam-2-1',
        subjectId: 'subject-2',
        title: 'Practical Abattoir Pathology & Zoonosis Exam',
        date: '2026-11-18',
        time: '11:00 AM',
        location: 'Central Veterinary Laboratory & Abattoir',
        weight: 40,
        topics: ['Cysticercosis', 'Bovine Tuberculosis', 'Hydatid cysts', 'HACCP critical limits', 'Emergency slaughter'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-2-1', text: 'Accurately distinguish localized vs generalized lesions in beef carcasses', completed: true },
      { id: 'goal-2-2', text: 'Establish CCP thresholds for slaughterhouse chilling chambers (≤ 7°C)', completed: true },
      { id: 'goal-2-3', text: 'Differentiate *Taenia saginata* vs *Taenia solium* epidemiology and prevention', completed: false },
    ],
    reviewSchedule: [
      { id: 'rev-2-1', topic: 'Zoonotic lymphadenopathy differentials', nextReviewDate: '2026-10-23', status: 'pending', intervalDays: 4 },
    ],
    resourceLinks: [
      { id: 'res-2-1', title: 'FAO Manual on Meat Inspection for Developing Countries', url: 'https://www.fao.org/3/t0756e/t0756e00.htm', type: 'textbook' },
      { id: 'res-2-2', title: 'WOAH (OIE) Terrestrial Animal Health Code', url: 'https://www.woah.org', type: 'guideline' },
    ],
  },
  {
    id: 'subject-3',
    name: 'Health Economics',
    nameSo: 'Dhaqaalaha Caafimaadka',
    nameAr: 'اقتصاديات الصحة والتمويل الصحي',
    code: 'HEC-302',
    icon: 'TrendingUp',
    color: '#d97706', // amber-600
    progress: 65,
    description: 'Economic evaluation methods (CEA, CUA, CBA), QALYs & DALYs, healthcare financing mechanisms, out-of-pocket expenditure, health insurance models, and equity.',
    notes: [
      {
        id: 'note-3-1',
        title: 'Cost-Effectiveness Analysis (CEA) & ICER Calculations',
        lectureNumber: 'Lecture 5',
        date: '2026-10-15',
        summary: 'Incremental Cost-Effectiveness Ratio (ICER) formula and interpretation on the cost-effectiveness plane.',
        content: `### Formulas:
$$ICER = \\frac{Cost_B - Cost_A}{Effect_B - Effect_A}$$
- **QALY (Quality-Adjusted Life Year)** = Additional years of life × Utility weight (0 to 1).
- **Willingness to Pay (WTP) threshold**: WHO recommendation of 1-3× GDP per capita per DALY averted.`,
        tags: ['CEA', 'ICER', 'QALY', 'Financing'],
      },
    ],
    assignments: [
      {
        id: 'asg-3-1',
        subjectId: 'subject-3',
        title: 'CEA Evaluation Problem Set: Malaria Bed Nets vs IRS Spraying',
        dueDate: '2026-11-04',
        status: 'not_started',
        weight: 20,
        instructions: 'Calculate ICER per case averted for Long-Lasting Insecticidal Nets vs Indoor Residual Spraying.',
      },
    ],
    exams: [
      {
        id: 'exam-3-1',
        subjectId: 'subject-3',
        title: 'Health Financing & Economic Appraisal Examination',
        date: '2026-11-25',
        time: '02:00 PM',
        location: 'Economics Hall 101',
        weight: 35,
        topics: ['Moral hazard', 'Adverse selection', 'CUA/CBA', 'Universal Health Coverage financing models'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-3-1', text: 'Compute ICER and interpret cost-effectiveness acceptability curves', completed: true },
      { id: 'goal-3-2', text: 'Analyze catastrophic out-of-pocket health expenditure in low-resource settings', completed: false },
    ],
    reviewSchedule: [
      { id: 'rev-3-1', topic: 'Moral hazard vs supplier-induced demand', nextReviewDate: '2026-10-24', status: 'pending', intervalDays: 5 },
    ],
    resourceLinks: [
      { id: 'res-3-1', title: 'WHO Guide to Cost-Effectiveness Analysis (CHOICE)', url: 'https://www.who.int/choice/en/', type: 'guideline' },
    ],
  },
  {
    id: 'subject-4',
    name: 'Environmental Health Impact Assessment',
    nameSo: 'Qiimaynta Saamaynta Caafimaadka Deegaanka',
    nameAr: 'تقييم الأثر البيئي والصحي',
    code: 'EHI-305',
    icon: 'Leaf',
    color: '#059669', // emerald-600
    progress: 70,
    description: 'Screening, scoping, baseline health profiling, risk assessment of toxic exposures, water and sanitation (WASH), air pollutants (PM2.5, NO2), and mitigation planning.',
    notes: [
      {
        id: 'note-4-1',
        title: 'The 6-Step EHIA Framework',
        lectureNumber: 'Lecture 2',
        date: '2026-10-11',
        summary: 'Screening, Scoping, Assessment, Mitigation & Recommendations, Reporting, and Monitoring & Audit.',
        content: `### Stages:
1. **Screening**: Does the proposed infrastructure project require full EHIA?
2. **Scoping**: Establishing boundaries, vulnerable demographic groups, and environmental determinants.
3. **Dose-Response Evaluation**: Hazard identification and exposure pathways (inhalation, ingestion, dermal).`,
        tags: ['EHIA', 'WASH', 'Pollution', 'Risk'],
      },
    ],
    assignments: [
      {
        id: 'asg-4-1',
        subjectId: 'subject-4',
        title: 'Drafting an Environmental Health Risk Matrix for Urban Landfills',
        dueDate: '2026-11-02',
        status: 'in_progress',
        weight: 25,
      },
    ],
    exams: [
      {
        id: 'exam-4-1',
        subjectId: 'subject-4',
        title: 'EHIA Midterm Exam',
        date: '2026-11-20',
        time: '10:00 AM',
        location: 'Science Complex C4',
        weight: 35,
        topics: ['Toxicology metrics (NOAEL, LOAEL)', 'Air & Water quality standards', 'Community consultation in EHIA'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-4-1', text: 'Calculate hazard quotients (HQ) for non-carcinogenic chemical hazards', completed: true },
      { id: 'goal-4-2', text: 'Design environmental mitigation and surveillance plans', completed: false },
    ],
    reviewSchedule: [
      { id: 'rev-4-1', topic: 'WASH indicators and WHO drinking water guidelines', nextReviewDate: '2026-10-26', status: 'pending', intervalDays: 6 },
    ],
    resourceLinks: [
      { id: 'res-4-1', title: 'WHO Guidelines for Drinking-water Quality', url: 'https://www.who.int/publications/i/item/9789240045064', type: 'guideline' },
    ],
  },
  {
    id: 'subject-5',
    name: 'International Health',
    nameSo: 'Caafimaadka Caalamiga ah',
    nameAr: 'الصحة الدولية والعالمية',
    code: 'INH-303',
    icon: 'Globe',
    color: '#6366f1', // indigo-500
    progress: 75,
    description: 'Global burden of disease, SDGs, humanitarian public health in crisis/conflict zones, refugee health, eradication programs (Polio, Guinea worm), and cross-border epidemiology.',
    notes: [
      {
        id: 'note-5-1',
        title: 'Transition from MDGs to SDGs & Global Health Architecture',
        lectureNumber: 'Lecture 1',
        date: '2026-10-09',
        summary: 'SDG 3 targets: Maternal mortality ratio < 70/100,000 live births, ending preventable child deaths, UHC.',
        content: `### Key Global Initiatives:
- Gavi, the Vaccine Alliance.
- Global Fund to Fight AIDS, Tuberculosis and Malaria.
- Sphere Standards in Humanitarian Action (minimum 15L water/person/day; 2,100 kcal energy).`,
        tags: ['SDGs', 'GlobalHealth', 'RefugeeHealth'],
      },
    ],
    assignments: [
      {
        id: 'asg-5-1',
        subjectId: 'subject-5',
        title: 'Humanitarian Response Plan: Cholera Outbreak in IDP Camp',
        dueDate: '2026-11-08',
        status: 'not_started',
        weight: 30,
      },
    ],
    exams: [
      {
        id: 'exam-5-1',
        subjectId: 'subject-5',
        title: 'International Health Systems & Policy Final',
        date: '2026-12-04',
        time: '09:00 AM',
        location: 'Auditorium A',
        weight: 40,
        topics: ['Disease eradication barriers', 'Refugee camp health management', 'Global governance', 'One Health'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-5-1', text: 'Apply SPHERE minimum standards in emergency public health interventions', completed: true },
      { id: 'goal-5-2', text: 'Evaluate the role of multilateral bodies in health emergency declarations', completed: true },
    ],
    reviewSchedule: [
      { id: 'rev-5-1', topic: 'Epidemiological surveillance in humanitarian settings', nextReviewDate: '2026-10-27', status: 'pending', intervalDays: 7 },
    ],
    resourceLinks: [
      { id: 'res-5-1', title: 'The Sphere Handbook: Humanitarian Charter', url: 'https://spherestandards.org/handbook-2018/', type: 'guideline' },
    ],
  },
  {
    id: 'subject-6',
    name: 'Mental Health',
    nameSo: 'Caafimaadka Maskaxda',
    nameAr: 'الصحة النفسية وعلم النفس المجتمعي',
    code: 'MNH-306',
    icon: 'HeartPulse',
    color: '#ec4899', // pink-500
    progress: 68,
    description: 'Community mental health integration, psychiatric epidemiology, post-traumatic stress disorder (PTSD) in post-conflict populations, depression, stigma reduction, and mhGAP.',
    notes: [
      {
        id: 'note-6-1',
        title: 'WHO mhGAP Intervention Guide: Primary Healthcare Integration',
        lectureNumber: 'Lecture 4',
        date: '2026-10-13',
        summary: 'De-institutionalization of psychiatric care and task-shifting to community health workers.',
        content: `### mhGAP Priority Conditions:
1. Depression & Anxiety disorders
2. Psychosis (Schizophrenia)
3. Epilepsy / Seizures
4. Substance abuse disorders
5. Conditions specifically related to stress (PTSD, acute stress).`,
        tags: ['mhGAP', 'CommunityMentalHealth', 'Depression'],
      },
    ],
    assignments: [
      {
        id: 'asg-6-1',
        subjectId: 'subject-6',
        title: 'Community Anti-Stigma Campaign Strategy for Post-Conflict Youth',
        dueDate: '2026-11-06',
        status: 'in_progress',
        weight: 25,
      },
    ],
    exams: [
      {
        id: 'exam-6-1',
        subjectId: 'subject-6',
        title: 'Community Psychiatric Epidemiology Exam',
        date: '2026-11-28',
        time: '01:00 PM',
        location: 'Hall B1',
        weight: 35,
        topics: ['Diagnostic criteria', 'Task-shifting models', 'Screening tools (PHQ-9, GAD-7)'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-6-1', text: 'Administer and interpret PHQ-9 and SRQ-20 mental health screening tools', completed: true },
      { id: 'goal-6-2', text: 'Design community-based psychosocial support (MHPSS) programs', completed: false },
    ],
    reviewSchedule: [
      { id: 'rev-6-1', topic: 'Task-shifting and mhGAP clinical algorithms', nextReviewDate: '2026-10-25', status: 'pending', intervalDays: 5 },
    ],
    resourceLinks: [
      { id: 'res-6-1', title: 'WHO Mental Health Gap Action Programme (mhGAP)', url: 'https://www.who.int/teams/mental-health-and-substance-use/treatment-care/mental-health-gap-action-programme', type: 'guideline' },
    ],
  },
  {
    id: 'subject-7',
    name: 'Monitoring and Evaluation',
    nameSo: 'Kormeerka & Qiimaynta (M&E)',
    nameAr: 'المتابعة والتقييم للبرامج الصحية',
    code: 'MNE-307',
    icon: 'CheckCircle2',
    color: '#8b5cf6', // purple-500
    progress: 85,
    description: 'Logical frameworks (logframes), Theory of Change, indicator development (input, process, output, outcome, impact), routine data quality audits, and program evaluation designs.',
    notes: [
      {
        id: 'note-7-1',
        title: 'Logical Framework Analysis (LFA) & Theory of Change',
        lectureNumber: 'Lecture 3',
        date: '2026-10-16',
        summary: 'Hierarchy of objectives, Objectively Verifiable Indicators (OVIs), Means of Verification (MoV), and critical assumptions.',
        content: `### Logframe Hierarchy:
- **Impact**: High-level goal (e.g., Reduced under-5 child mortality).
- **Outcome**: Behavioral or operational change (e.g., Increased coverage of pentavalent vaccination to 90%).
- **Output**: Tangible deliverables (e.g., 20,000 infants vaccinated, 50 vaccinators trained).
- **Activities & Inputs**: Cold-chain fridges, funding, transport.`,
        tags: ['Logframe', 'Indicators', 'Evaluation'],
      },
    ],
    assignments: [
      {
        id: 'asg-7-1',
        subjectId: 'subject-7',
        title: 'Design a Complete M&E Plan for a Maternal Health Nutrition Project',
        dueDate: '2026-10-30',
        status: 'submitted',
        grade: 'A (94%)',
        weight: 30,
      },
    ],
    exams: [
      {
        id: 'exam-7-1',
        subjectId: 'subject-7',
        title: 'Midterm Practical Exam: Indicator Matrix & Logframe Analysis',
        date: '2026-11-10',
        time: '08:30 AM',
        location: 'Informatics Lab 2',
        weight: 35,
        topics: ['DQA methodologies', 'SMART indicator formulation', 'Baseline vs Endline survey designs'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-7-1', text: 'Develop comprehensive Performance Monitoring Plans (PMP)', completed: true },
      { id: 'goal-7-2', text: 'Conduct Routine Data Quality Assessments (RDQA) on DHIS2 records', completed: true },
    ],
    reviewSchedule: [
      { id: 'rev-7-1', topic: 'Process vs Outcome evaluation methodologies', nextReviewDate: '2026-10-22', status: 'pending', intervalDays: 3 },
    ],
    resourceLinks: [
      { id: 'res-7-1', title: 'MEASURE Evaluation Health Indicators Catalog', url: 'https://www.measureevaluation.org', type: 'guideline' },
    ],
  },
  {
    id: 'subject-8',
    name: 'Health Research Methodology',
    nameSo: 'Habka Cilmi-Baarista Caafimaadka',
    nameAr: 'مناهج البحث العلمي والإحصاء الصحي',
    code: 'HRM-308',
    icon: 'Microscope',
    color: '#0284c7', // sky-600
    progress: 78,
    description: 'Study designs (cross-sectional, case-control, cohort, randomized trials), bias & confounding, sampling techniques, hypothesis testing, Odds Ratio (OR), Relative Risk (RR), and research ethics.',
    notes: [
      {
        id: 'note-8-1',
        title: 'Observational Study Designs: Cohort vs Case-Control',
        lectureNumber: 'Lecture 5',
        date: '2026-10-18',
        summary: 'Key distinctions in directionality, measure of association (RR vs OR), and susceptibility to recall vs attrition bias.',
        content: `### Comparison Table:
| Feature | Cohort Study | Case-Control Study |
| :--- | :--- | :--- |
| **Direction** | Exposure $\\rightarrow$ Disease | Disease $\\rightarrow$ Exposure |
| **Primary Metric** | Relative Risk (RR) | Odds Ratio (OR) |
| **Best for** | Rare exposures | Rare diseases |
| **Main Bias** | Loss to follow-up (attrition) | Recall bias & selection bias |
| **Cost / Time** | Expensive, long | Cheaper, faster |`,
        tags: ['Epidemiology', 'Cohort', 'CaseControl', 'Biostatistics'],
      },
    ],
    assignments: [
      {
        id: 'asg-8-1',
        subjectId: 'subject-8',
        title: 'Research Proposal Protocol: Prevalence of Anemia in Rural Pregnant Women',
        dueDate: '2026-11-15',
        status: 'in_progress',
        weight: 35,
        instructions: 'Write a full 10-page IRB protocol including sample size calculation using Kish-Leslie formula.',
      },
    ],
    exams: [
      {
        id: 'exam-8-1',
        subjectId: 'subject-8',
        title: 'Biostatistics & Epidemiologic Methods Comprehensive Exam',
        date: '2026-11-23',
        time: '09:00 AM',
        location: 'Hall A2',
        weight: 40,
        topics: ['Chi-Square testing', 'Confidence intervals', 'Confounding control (stratification/regression)', 'IRB ethical principles'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-8-1', text: 'Calculate sample sizes for cross-sectional studies and clinical trials', completed: true },
      { id: 'goal-8-2', text: 'Distinguish effect modification from confounding in epidemiologic data', completed: false },
      { id: 'goal-8-3', text: 'Critique published medical literature using STROBE guidelines', completed: true },
    ],
    reviewSchedule: [
      { id: 'rev-8-1', topic: 'Confounding vs Effect Modification & Mantel-Haenszel pooling', nextReviewDate: '2026-10-23', status: 'pending', intervalDays: 4 },
    ],
    resourceLinks: [
      { id: 'res-8-1', title: 'STROBE Statement: Reporting Observational Studies', url: 'https://www.strobe-statement.org', type: 'guideline' },
      { id: 'res-8-2', title: 'PubMed Central (PMC) Open Access Repository', url: 'https://www.ncbi.nlm.nih.gov/pmc/', type: 'paper' },
    ],
  },
  {
    id: 'subject-9',
    name: 'Population Demography & Reproductive Health',
    nameSo: 'Tirokoobka Dadweynaha & Caafimaadka Taranka',
    nameAr: 'الديموغرافيا السكانية والصحة الإنجابية',
    code: 'PDR-309',
    icon: 'Users',
    color: '#14b8a6', // teal-500
    progress: 82,
    description: 'Demographic transition model, population pyramids, maternal mortality, antenatal care (ANC) models, family planning methods, emergency obstetric care (EmONC), and census analysis.',
    notes: [
      {
        id: 'note-9-1',
        title: 'The 3 Delays Model in Maternal Mortality',
        lectureNumber: 'Lecture 4',
        date: '2026-10-10',
        summary: 'Thaddeus & Maine framework: Delay 1 (Deciding to seek care), Delay 2 (Reaching health facility), Delay 3 (Receiving adequate care).',
        content: `### Breakdown:
1. **Delay 1 (Home/Community)**: Low health literacy, lack of emergency funds, patriarchal decision-making.
2. **Delay 2 (Transportation)**: Poor road infrastructure, lack of ambulances, geographical distance.
3. **Delay 3 (Facility/Clinical)**: Shortage of blood products, lack of trained EmONC staff, stockouts of oxytocin/magnesium sulfate.`,
        tags: ['MaternalHealth', 'EmONC', 'Demography'],
      },
    ],
    assignments: [
      {
        id: 'asg-9-1',
        subjectId: 'subject-9',
        title: 'Demographic Pyramid Interpretation & Family Planning Policy Paper',
        dueDate: '2026-10-29',
        status: 'in_progress',
        weight: 25,
      },
    ],
    exams: [
      {
        id: 'exam-9-1',
        subjectId: 'subject-9',
        title: 'Maternal & Neonatal Health Midterm',
        date: '2026-11-17',
        time: '01:30 PM',
        location: 'Health Science Lecture Hall 3',
        weight: 35,
        topics: ['Total Fertility Rate (TFR)', 'Contraceptive Prevalence Rate (CPR)', 'Partograph usage', 'Active management of third stage of labor'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-9-1', text: 'Interpret population age-sex pyramids and calculate dependency ratios', completed: true },
      { id: 'goal-9-2', text: 'Design interventions addressing the Three Delays model in rural clinics', completed: true },
    ],
    reviewSchedule: [
      { id: 'rev-9-1', topic: 'EmONC signal functions & maternal death surveillance (MPDSR)', nextReviewDate: '2026-10-24', status: 'pending', intervalDays: 5 },
    ],
    resourceLinks: [
      { id: 'res-9-1', title: 'UNFPA State of World Population Report', url: 'https://www.unfpa.org', type: 'guideline' },
    ],
  },
  {
    id: 'subject-10',
    name: 'Management and Administration',
    nameSo: 'Maamulka & Maareynta Caafimaadka',
    nameAr: 'الإدارة والقيادة الصحية',
    code: 'MGT-310',
    icon: 'Briefcase',
    color: '#f59e0b', // amber-500
    progress: 74,
    description: 'Health systems leadership, organizational behavior, strategic health planning, Human Resources for Health (HRH) retention, pharmaceutical supply chain management, and budgeting.',
    notes: [
      {
        id: 'note-1-1',
        title: 'Strategic Planning in District Health Management Teams (DHMT)',
        lectureNumber: 'Lecture 3',
        date: '2026-10-14',
        summary: 'SWOT and PESTLE analyses, stakeholder mapping, priority setting using Hanlon method.',
        content: `### Hanlon Method for Priority Setting:
$$Priority Score = (A + 2B) \\times C \\times D$$
- **A**: Size of problem
- **B**: Seriousness of problem
- **C**: Effectiveness of intervention
- **D**: PEARL factors (Propriety, Economics, Acceptability, Resources, Legality).`,
        tags: ['Leadership', 'Planning', 'DHMT', 'SupplyChain'],
      },
    ],
    assignments: [
      {
        id: 'asg-10-1',
        subjectId: 'subject-10',
        title: 'Human Resources for Health (HRH) Retention Strategy in Rural Clinics',
        dueDate: '2026-11-09',
        status: 'not_started',
        weight: 30,
      },
    ],
    exams: [
      {
        id: 'exam-10-1',
        subjectId: 'subject-10',
        title: 'Health Systems Administration Exam',
        date: '2026-12-01',
        time: '11:00 AM',
        location: 'Business & Governance Center Hall 2',
        weight: 40,
        topics: ['Pharmaceutical supply chain inventory models (EOQ)', 'Transformational leadership', 'Health budget execution'],
        completed: false,
      },
    ],
    learningGoals: [
      { id: 'goal-10-1', text: 'Apply the Hanlon method to prioritize district health interventions', completed: true },
      { id: 'goal-10-2', text: 'Manage essential drug supply chains and prevent stockouts', completed: false },
    ],
    reviewSchedule: [
      { id: 'rev-10-1', topic: 'EOQ inventory formulas and cold-chain logistics', nextReviewDate: '2026-10-26', status: 'pending', intervalDays: 6 },
    ],
    resourceLinks: [
      { id: 'res-10-1', title: 'Management Sciences for Health (MSH) Resources', url: 'https://msh.org', type: 'guideline' },
    ],
  },
];

export const INITIAL_MORNING_EXERCISES: ExerciseItem[] = [
  {
    id: 'm-ex-1',
    title: 'Neck & Upper Back Decompression',
    category: 'morning',
    durationMinutes: 4,
    description: 'Gentle neck rolls, lateral flexion, and thoracic extensions to release study tension.',
    icon: 'Activity',
    completed: true,
  },
  {
    id: 'm-ex-2',
    title: 'Hamstring & Hip Flexor Mobility',
    category: 'morning',
    durationMinutes: 6,
    description: 'Dynamic low lunges, world greatest stretch, and hamstring sweeps for optimal posture.',
    icon: 'Flame',
    completed: true,
  },
  {
    id: 'm-ex-3',
    title: 'Light Morning Cardio & Jumping Jacks',
    category: 'morning',
    durationMinutes: 8,
    description: 'Brisk pacing, light jumping jacks, and high knees to elevate oxygen flow and wakefulness.',
    icon: 'Heart',
    completed: false,
  },
  {
    id: 'm-ex-4',
    title: 'Core Activation Plank & Bird-Dog',
    category: 'morning',
    durationMinutes: 5,
    description: 'Stabilizing spinal core muscles for long hours of seated academic focus.',
    icon: 'Shield',
    completed: false,
  },
];

export const INITIAL_EVENING_EXERCISES: ExerciseItem[] = [
  {
    id: 'e-ex-1',
    title: 'Child’s Pose & Deep Diaphragmatic Breathing',
    category: 'evening',
    durationMinutes: 5,
    description: 'Restorative breathing in balasana to lower cortisol and switch on parasympathetic tone.',
    icon: 'Moon',
    completed: false,
  },
  {
    id: 'e-ex-2',
    title: 'Seated Spinal Twist & Chest Opener',
    category: 'evening',
    durationMinutes: 5,
    description: 'Counteracting desk hunch, opening pectoral muscles and relieving lower lumbar fatigue.',
    icon: 'Wind',
    completed: false,
  },
  {
    id: 'e-ex-3',
    title: 'Legs-Up-The-Wall Restoration',
    category: 'evening',
    durationMinutes: 6,
    description: 'Promotes venous return, relieves fatigued legs, and calms the nervous system before sleep.',
    icon: 'Smile',
    completed: false,
  },
  {
    id: 'e-ex-4',
    title: 'Progressive Muscle Relaxation (PMR)',
    category: 'evening',
    durationMinutes: 4,
    description: 'Sequential tensing and releasing of muscle groups from toes to forehead for restorative sleep.',
    icon: 'Sparkles',
    completed: false,
  },
];

export const INITIAL_SLEEP_ROUTINE: SleepRoutineData = {
  targetBedtime: '21:30', // 9:30 PM
  reminderTime: '21:00', // 9:00 PM (30 minutes prior)
  wakeUpTarget: '05:00', // 5:00 AM (for Fajr prayer & morning study)
  remindersEnabled: true,
  soundEnabled: true,
  checklist: [
    { id: 'sleep-1', text: 'Brush teeth thoroughly and perform oral hygiene', completed: false },
    { id: 'sleep-2', text: 'Prepare university clothes, bag, and laptop for tomorrow', completed: false },
    { id: 'sleep-3', text: 'Complete necessary preparations for rest and perform Wudu', completed: false },
    { id: 'sleep-4', text: 'Put mobile phone away across the room and avoid screens', completed: false },
    { id: 'sleep-5', text: 'Relax with evening Dhikr, Ayatul Kursi, and prepare to sleep by 9:30 PM', completed: false },
  ],
  history: {},
};

export const INITIAL_CALENDAR_EVENTS: CalendarEvent[] = [
  {
    id: 'evt-1',
    title: 'Public Health Law Lecture: Quarantine Regulations',
    type: 'lecture',
    date: '2026-10-19',
    startTime: '08:30',
    endTime: '10:30',
    subjectId: 'subject-1',
    notes: 'Room 204. Bring statutory acts handbook.',
  },
  {
    id: 'evt-2',
    title: 'Meat Hygiene Abattoir Inspection Practicum',
    type: 'lecture',
    date: '2026-10-20',
    startTime: '10:00',
    endTime: '12:30',
    subjectId: 'subject-2',
    notes: 'White lab coat and rubber boots required.',
  },
  {
    id: 'evt-3',
    title: 'Biostatistics & Research Methodology Tutorial',
    type: 'study',
    date: '2026-10-21',
    startTime: '14:00',
    endTime: '16:00',
    subjectId: 'subject-8',
    notes: 'Focus on Odds Ratio and Chi-square calculations.',
  },
  {
    id: 'evt-4',
    title: 'M&E Project Assignment Submission Deadline',
    type: 'assignment',
    date: '2026-10-30',
    startTime: '23:59',
    endTime: '23:59',
    subjectId: 'subject-7',
    notes: 'Upload PDF to university student portal.',
  },
  {
    id: 'evt-5',
    title: 'Daily Evening Quran Reading: Surah Al-Mulk',
    type: 'quran',
    date: '2026-10-19',
    startTime: '20:15',
    endTime: '20:45',
    notes: 'Read with Somali and English reflections.',
  },
  {
    id: 'evt-6',
    title: 'Evening Wind-Down & Bedtime Preparation',
    type: 'bedtime',
    date: '2026-10-19',
    startTime: '21:00',
    endTime: '21:30',
    notes: 'Follow the 5-step checklist. Sleep by 21:30.',
  },
];

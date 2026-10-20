import { Language } from '../types';

export interface Translations {
  appTitle: string;
  appSubtitle: string;
  welcomeBack: string;
  studentTag: string;
  nav: {
    home: string;
    profile: string;
    subjects: string;
    timetable: string;
    notes: string;
    calendar: string;
    tasks: string;
    prayer: string;
    quran: string;
    morningExercise: string;
    eveningExercise: string;
    aiMentor: string;
    motivation: string;
    sleep: string;
    progress: string;
    settings: string;
  };
  common: {
    save: string;
    cancel: string;
    edit: string;
    delete: string;
    add: string;
    close: string;
    confirm: string;
    reset: string;
    export: string;
    import: string;
    download: string;
    completed: string;
    pending: string;
    search: string;
    filter: string;
    viewDetails: string;
    progress: string;
    status: string;
    dueDate: string;
    priority: string;
    notes: string;
    high: string;
    medium: string;
    low: string;
    today: string;
    week: string;
    month: string;
    start: string;
    pause: string;
    resume: string;
    stop: string;
    minutes: string;
    seconds: string;
    hours: string;
    target: string;
    reminderOn: string;
    reminderOff: string;
    enabled: string;
    disabled: string;
    darkMode: string;
    lightMode: string;
    language: string;
  };
  prayer: {
    title: string;
    subtitle: string;
    fajr: string;
    sunrise: string;
    dhuhr: string;
    asr: string;
    maghrib: string;
    isha: string;
    nextPrayer: string;
    currentPrayer: string;
    qiblaCompass: string;
    selectCity: string;
    calculationMethod: string;
    remindersToggle: string;
    prayerTrackerToday: string;
    weeklyCompletion: string;
  };
  quran: {
    title: string;
    subtitle: string;
    dailyGoal: string;
    lastRead: string;
    selectSurah: string;
    searchSurah: string;
    ayahNumber: string;
    translations: string;
    arabicOnly: string;
    withSomali: string;
    withEnglish: string;
    allTranslations: string;
    fontSize: string;
    bookmark: string;
    bookmarked: string;
    reminders: string;
  };
  sleep: {
    title: string;
    subtitle: string;
    targetBedtime: string;
    reminderAt: string;
    wakeTarget: string;
    routineSteps: string;
    step1: string;
    step2: string;
    step3: string;
    step4: string;
    step5: string;
    sleepTracker: string;
    goodNightMessage: string;
  };
  study: {
    title: string;
    subtitle: string;
    pomodoro: string;
    deepWork: string;
    customTimer: string;
    selectSubject: string;
    startSession: string;
    takeBreak: string;
    todayStudyTime: string;
    targetStudyHours: string;
    studyHistory: string;
  };
  aiMentor: {
    title: string;
    subtitle: string;
    badge: string;
    placeholder: string;
    send: string;
    quickPromptsTitle: string;
    prompt1: string;
    prompt2: string;
    prompt3: string;
    prompt4: string;
    prompt5: string;
    disclaimer: string;
  };
}

export const TRANSLATIONS: Record<Language, Translations> = {
  en: {
    appTitle: 'Asad Aweys — Personal Student Dashboard',
    appSubtitle: 'Public Health Scholar & Academic Management Portal',
    welcomeBack: 'Welcome Back, Asad Aweys!',
    studentTag: 'BSc Public Health • Dedicated to Health Systems & Saving Lives',
    nav: {
      home: 'Home Dashboard',
      profile: 'My Profile',
      subjects: 'My Subjects',
      timetable: 'Study Timetable',
      notes: 'Notes & Resources',
      calendar: 'Calendar',
      tasks: 'Tasks & Coursework',
      prayer: 'Prayer Reminders',
      quran: 'Holy Quran',
      morningExercise: 'Morning Exercise',
      eveningExercise: 'Evening Exercise',
      aiMentor: 'AI Academic Mentor',
      motivation: 'Daily Motivation',
      sleep: 'Sleep Routine',
      progress: 'Progress & Analytics',
      settings: 'Settings',
    },
    common: {
      save: 'Save Changes',
      cancel: 'Cancel',
      edit: 'Edit',
      delete: 'Delete',
      add: 'Add New',
      close: 'Close',
      confirm: 'Confirm',
      reset: 'Reset to Defaults',
      export: 'Export Backup JSON',
      import: 'Restore from Backup',
      download: 'Download',
      completed: 'Completed',
      pending: 'Pending',
      search: 'Search...',
      filter: 'Filter',
      viewDetails: 'View Details',
      progress: 'Progress',
      status: 'Status',
      dueDate: 'Due Date',
      priority: 'Priority',
      notes: 'Notes',
      high: 'High',
      medium: 'Medium',
      low: 'Low',
      today: 'Today',
      week: 'This Week',
      month: 'This Month',
      start: 'Start',
      pause: 'Pause',
      resume: 'Resume',
      stop: 'Stop',
      minutes: 'min',
      seconds: 'sec',
      hours: 'hrs',
      target: 'Target',
      reminderOn: 'Reminders ON',
      reminderOff: 'Reminders OFF',
      enabled: 'Enabled',
      disabled: 'Disabled',
      darkMode: 'Dark Mode',
      lightMode: 'Light Mode',
      language: 'Language',
    },
    prayer: {
      title: 'Islamic Worship & Daily Prayers',
      subtitle: 'Astronomically calculated local prayer times, Qibla direction, and daily checklist',
      fajr: 'Fajr',
      sunrise: 'Sunrise',
      dhuhr: 'Dhuhr',
      asr: 'Asr',
      maghrib: 'Maghrib',
      isha: 'Isha',
      nextPrayer: 'Next Prayer',
      currentPrayer: 'Current Prayer',
      qiblaCompass: 'Qibla Direction',
      selectCity: 'Select City or Region',
      calculationMethod: 'Calculation Method',
      remindersToggle: 'Prayer Notifications',
      prayerTrackerToday: 'Today’s Prayer Checklist',
      weeklyCompletion: 'Weekly Prayer Consistency',
    },
    quran: {
      title: 'Holy Quran Reader & Tracker',
      subtitle: 'Authentic Arabic text with Somali and English translations, daily goals, and bookmarks',
      dailyGoal: 'Daily Reading Goal',
      lastRead: 'Last Read Position',
      selectSurah: 'Select Surah',
      searchSurah: 'Search Surah by name or number...',
      ayahNumber: 'Ayah',
      translations: 'Translations',
      arabicOnly: 'Arabic Text Only',
      withSomali: 'Arabic + Somali (Af-Soomaali)',
      withEnglish: 'Arabic + English',
      allTranslations: 'Arabic + Somali + English',
      fontSize: 'Arabic Script Size',
      bookmark: 'Bookmark Ayah',
      bookmarked: 'Bookmarked',
      reminders: 'Quran Daily Reminder',
    },
    sleep: {
      title: 'Sleep Routine & 9:30 PM Bedtime',
      subtitle: 'Evening wind-down reminder at 9:00 PM (30 min before bed) to ensure 7.5+ hours of restorative sleep',
      targetBedtime: 'Target Bedtime (21:30)',
      reminderAt: 'Wind-Down Alert (21:00)',
      wakeTarget: 'Target Wake-Up (05:00 for Fajr)',
      routineSteps: '5-Step Evening Wind-Down Checklist',
      step1: 'Brush teeth thoroughly and complete oral hygiene',
      step2: 'Prepare university clothes, bag, and laptop for tomorrow',
      step3: 'Finish necessary preparations for sleep & perform Wudu',
      step4: 'Put mobile phone away across the room and avoid screens',
      step5: 'Relax with evening Dhikr, Ayat al-Kursi, and sleep by 9:30 PM',
      sleepTracker: 'Sleep Routine Completed Today',
      goodNightMessage: 'Rest well Asad! A disciplined night creates a productive tomorrow.',
    },
    study: {
      title: 'Study Focus & Pomodoro Timer',
      subtitle: 'Structured revision sessions linked directly to your Public Health subjects',
      pomodoro: 'Pomodoro (25m / 5m)',
      deepWork: 'Deep Focus (50m / 10m)',
      customTimer: 'Custom Session',
      selectSubject: 'Select Subject',
      startSession: 'Start Focus Session',
      takeBreak: 'Rest / Take a Break',
      todayStudyTime: 'Study Time Today',
      targetStudyHours: 'Target Daily Study',
      studyHistory: 'Completed Focus Sessions',
    },
    aiMentor: {
      title: 'Asad’s AI Academic Mentor',
      subtitle: 'Your dedicated Public Health university assistant powered by Gemini AI',
      badge: 'Public Health Specialist AI',
      placeholder: 'Ask about epidemiology, biostatistics, health economics, M&E, exam revision...',
      send: 'Ask Mentor',
      quickPromptsTitle: 'Quick Academic Inquiries',
      prompt1: 'Explain the difference between Odds Ratio (OR) and Relative Risk (RR) with public health examples.',
      prompt2: 'Summarize the 3 Delays Model in maternal mortality and policy interventions.',
      prompt3: 'Generate 5 practice multiple-choice questions on Meat Hygiene and Zoonoses.',
      prompt4: 'In Somali: Sharax tallaabooyinka Environmental Health Impact Assessment (EHIA).',
      prompt5: 'In Arabic: لخص معايير الطوارئ الصحية الدولية (PHEIC) وفق لوائح منظمة الصحة العالمية.',
      disclaimer: 'Asad’s AI Mentor is grounded in university public health curricula. Use for study, concept clarification, and revision.',
    },
  },

  so: {
    appTitle: 'Asad Aweys — Dashboard-ka Ardayga',
    appSubtitle: 'Baraha Maamulka Waxbarashada & Caafimaadka Dadweynaha',
    welcomeBack: 'Kusoo Dhawoow, Asad Aweys!',
    studentTag: 'BSc Caafimaadka Dadweynaha • U Heellanaanta Badbaadinta Bulshada',
    nav: {
      home: 'Bogga Hore',
      profile: 'Xogtayda Gaarka ah',
      subjects: 'Maadooyinkayga',
      timetable: 'Jadwalka Toddobaadka',
      notes: 'Qoraallada & Buugaagta',
      calendar: 'Kalandarka',
      tasks: 'Hawlaha & Shaqo-guryoodka',
      prayer: 'Xusuusiyaha Salaadda',
      quran: 'Qur’aanka Kariimka',
      morningExercise: 'Jimicsiga Subaxdii',
      eveningExercise: 'Jimicsiga Fiidkii',
      aiMentor: 'Kaaliyaha Waxbarashada AI',
      motivation: 'Dhiirrigelinta Maalinlaha',
      sleep: 'Jadwalka Hurdada (21:30)',
      progress: 'Warbixinta & Horumarka',
      settings: 'Hagaajinta & Beddelka',
    },
    common: {
      save: 'Keydi Isbeddelka',
      cancel: 'Jooji',
      edit: 'Wax ka beddel',
      delete: 'Tirtir',
      add: 'Ku dar cusub',
      close: 'Xidh',
      confirm: 'Xaqiiji',
      reset: 'Dib ugu celi sidii hore',
      export: 'Dhoofi Xogta (JSON)',
      import: 'Soo celi Xogta Kaydsan',
      download: 'Degso',
      completed: 'Waa la dhammaystiray',
      pending: 'Wuu hadhsan yahay',
      search: 'Raadi...',
      filter: 'Kala saar',
      viewDetails: 'Faahfaahin',
      progress: 'Horumarka',
      status: 'Xaaladda',
      dueDate: 'Taariikhda ugu dambaysa',
      priority: 'Ahmiyadda',
      notes: 'Qoraallo',
      high: 'Sare',
      medium: 'Dhexdhexaad',
      low: 'Hoose',
      today: 'Maanta',
      week: 'Toddobaadkan',
      month: 'Bishan',
      start: 'Bilow',
      pause: 'Hakad geli',
      resume: 'Sii wad',
      stop: 'Jooji',
      minutes: 'daqiiqo',
      seconds: 'ilbiriqsi',
      hours: 'saacadood',
      target: 'Hadafka',
      reminderOn: 'Xusuusiyuhu Wuu Furan Yahay',
      reminderOff: 'Xusuusiyuhu Wuu Xidhan Yahay',
      enabled: 'Wuu shaqaynayaa',
      disabled: 'Waa la damiyey',
      darkMode: 'Habka Mugdiga (Dark)',
      lightMode: 'Habka Iftiinka (Light)',
      language: 'Luqadda',
    },
    prayer: {
      title: 'Cibaadada & Salaadaha Maalinlaha ah',
      subtitle: 'Xisaabinta saxda ah ee xilliyada salaadda, jiheeyaha Qiblada, iyo dabagalka salaadda',
      fajr: 'Subax (Fajr)',
      sunrise: 'Qorrax Soo-bax',
      dhuhr: 'Duhur (Dhuhr)',
      asr: 'Casar (Asr)',
      maghrib: 'Qorrax-u-dhac (Maghrib)',
      isha: 'Cishe (Isha)',
      nextPrayer: 'Salaadda Xigta',
      currentPrayer: 'Salaadda Hadda Socota',
      qiblaCompass: 'Jihada Qiblada',
      selectCity: 'Dooro Magaaladaada',
      calculationMethod: 'Habka Xisaabinta',
      remindersToggle: 'Ogeysiisyada Salaadda',
      prayerTrackerToday: 'Dabagalka Salaadaha Maanta',
      weeklyCompletion: 'Joogteynta Salaadaha Toddobaadka',
    },
    quran: {
      title: 'Akhriska Qur’aanka Kariimka ah',
      subtitle: 'Qoraalka saxda ah ee Carabiga oo ay la socdaan tarjumada Af-Soomaaliga iyo Ingiriiska',
      dailyGoal: 'Hadafka Akhriska Maalinlaha',
      lastRead: 'Halkii ugu Dambaysay',
      selectSurah: 'Dooro Suuradda',
      searchSurah: 'Raadi magaca ama lambarka suuradda...',
      ayahNumber: 'Aayadda',
      translations: 'Tarjumada',
      arabicOnly: 'Carabi Kaliya',
      withSomali: 'Carabi + Af-Soomaali',
      withEnglish: 'Carabi + Ingiriisi',
      allTranslations: 'Carabi + Soomaali + Ingiriisi',
      fontSize: 'Cabbirka Farta Carabiga',
      bookmark: 'Calaamadee Aayadda',
      bookmarked: 'Waa la calaamadeeyay',
      reminders: 'Xusuusiyaha Qur’aanka',
    },
    sleep: {
      title: 'Jadwalka Hurdada & 9:30 PM Jiifsiga',
      subtitle: 'Xusuusinta 9:00 PM (30 daqiiqo ka hor hurdada) si aad u hesho 7.5+ saacadood oo nasasho tayo leh',
      targetBedtime: 'Waqtiga Jiifsiga (21:30)',
      reminderAt: 'Ogeysiiska Is-diyaarinta (21:00)',
      wakeTarget: 'Waqtiga Toosidda (05:00 Salaadda Subax)',
      routineSteps: '5-ta Tallaabo ee Is-diyaarinta Hurdada',
      step1: 'Cadayo ilkahaaga oo nadiifi afkaaga',
      step2: 'Diyaari dharka jaamacadda, boorsada, iyo laptop-ka berri',
      step3: 'Dhammee diyaargarowga hurdada oo qaado weyso',
      step4: 'Telefoonka fogee oo iska ilaali shaashadaha iftiinka leh',
      step5: 'Akhriso ducada jiifsiga, Aayadda Kursiga, oo seexo 9:30 PM',
      sleepTracker: 'Is-diyaarinta Hurdada ee Maanta',
      goodNightMessage: 'Habeen wanaagsan Asad! Hurdada waqtigeeda la seexdaa waxay dhashaa barqo ifaysa.',
    },
    study: {
      title: 'Isku-Ururinta Waxbarashada & Saacadda Pomodoro',
      subtitle: 'Saacado qorshaysan oo toos ugu xidhan maadooyinkaaga Caafimaadka Dadweynaha',
      pomodoro: 'Pomodoro (25 daq / 5 daq)',
      deepWork: 'Darsid Dheer (50 daq / 10 daq)',
      customTimer: 'Saacad Gaar ah',
      selectSubject: 'Dooro Maaddada',
      startSession: 'Bilow Darsiga',
      takeBreak: 'Naso Hadda',
      todayStudyTime: 'Waqtiga Maanta la Bartay',
      targetStudyHours: 'Hadafka Waxbarasho ee Maalinlaha',
      studyHistory: 'Kulamadii Waxbarasho ee Dhammaaday',
    },
    aiMentor: {
      title: 'Kaaliyaha Waxbarashada ee Asad (AI Academic Mentor)',
      subtitle: 'Kaaliyahaaga jaamacadeed ee maaddooyinka Caafimaadka Dadweynaha',
      badge: 'Khubarada AI ee Caafimaadka Dadweynaha',
      placeholder: 'Weydii su’aal ku saabsan epidemiology, biostatistics, daryeelka caafimaadka...',
      send: 'Weydii Kaaliyaha',
      quickPromptsTitle: 'Su’aalo Degdeg ah oo Jaamacadeed',
      prompt1: 'I sharax farqiga u dhexeeya Odds Ratio (OR) iyo Relative Risk (RR) adoo tusaale bixinaya.',
      prompt2: 'Soo koob Qaab-dhismeedka 3-da Dib-u-dhac ee dhimashada hooyooyinka.',
      prompt3: 'Ii samee 5 su\'aalood oo doorasho ah (MCQs) oo ku saabsan Nadaafadda Hilibka.',
      prompt4: 'Sharax tallaabooyinka Environmental Health Impact Assessment (EHIA).',
      prompt5: 'Iiga jawaab Carabi: لخص مناهج البحث الصحي.',
      disclaimer: 'Kaaliyaha waxbarashada ee Asad wuxuu ku salaysan yahay manhajka rasmiga ah ee Caafimaadka Dadweynaha.',
    },
  },

  ar: {
    appTitle: 'أسد عويس — لوحة تحكم الطالب الجامعي',
    appSubtitle: 'طالب الصحة العامة وبوابة الإدارة الأكاديمية المتكاملة',
    welcomeBack: 'مرحباً بعودتك، أسد عويس!',
    studentTag: 'بكالوريوس الصحة العامة • مكرس لتعزيز النظم الصحية وحماية المجتمعات',
    nav: {
      home: 'لوحة التحكم الرئيسية',
      profile: 'الملف الشخصي',
      subjects: 'المواد الدراسية',
      timetable: 'الجدول الدراسي الأسبوعي',
      notes: 'الملاحظات والمراجع',
      calendar: 'التقويم الجامعي',
      tasks: 'الواجبات والتكليفات',
      prayer: 'مواقيت الصلاة',
      quran: 'القرآن الكريم',
      morningExercise: 'التمارين الصباحية',
      eveningExercise: 'التمارين المسائية',
      aiMentor: 'المساعد الأكاديمي الذكي',
      motivation: 'الإلهام والتحفيز',
      sleep: 'روتين النوم (٩:٣٠ م)',
      progress: 'التقارير والإحصائيات',
      settings: 'الإعدادات والتخصيص',
    },
    common: {
      save: 'حفظ التعديلات',
      cancel: 'إلغاء',
      edit: 'تعديل',
      delete: 'حذف',
      add: 'إضافة جديد',
      close: 'إغلاق',
      confirm: 'تأكيد',
      reset: 'استعادة الإعدادات الافتراضية',
      export: 'تصدير نسخة احتياطية (JSON)',
      import: 'استيراد نسخة احتياطية',
      download: 'تحميل',
      completed: 'مكتمل',
      pending: 'قيد الانتظار',
      search: 'بحث...',
      filter: 'تصفية',
      viewDetails: 'عرض التفاصيل',
      progress: 'نسبة الإنجاز',
      status: 'الحالة',
      dueDate: 'تاريخ التسليم',
      priority: 'الأولوية',
      notes: 'الملاحظات',
      high: 'عالية',
      medium: 'متوسطة',
      low: 'منخفضة',
      today: 'اليوم',
      week: 'هذا الأسبوع',
      month: 'هذا الشهر',
      start: 'بدء',
      pause: 'إيقاف مؤقت',
      resume: 'استئناف',
      stop: 'إنهاء',
      minutes: 'دقيقة',
      seconds: 'ثانية',
      hours: 'ساعة',
      target: 'الهدف',
      reminderOn: 'التنبيهات مفعلة',
      reminderOff: 'التنبيهات متوقفة',
      enabled: 'مفعل',
      disabled: 'معطل',
      darkMode: 'الوضع الليلي',
      lightMode: 'الوضع النهاري',
      language: 'اللغة',
    },
    prayer: {
      title: 'العبادة والصلوات الخمس المفروضة',
      subtitle: 'حساب فلكي دقيق لمواقيت الصلاة المحلية مع بوصلة القبلة والمتابعة اليومية',
      fajr: 'الفجر',
      sunrise: 'الشروق',
      dhuhr: 'الظهر',
      asr: 'العصر',
      maghrib: 'المغرب',
      isha: 'العشاء',
      nextPrayer: 'الصلاة القادمة',
      currentPrayer: 'الصلاة الحالية',
      qiblaCompass: 'اتجاه القبلة المشرفة',
      selectCity: 'اختر المدينة أو العاصمة',
      calculationMethod: 'طريقة الحساب الفلكي',
      remindersToggle: 'إشعارات الأذان',
      prayerTrackerToday: 'قائمة إتمام صلوات اليوم',
      weeklyCompletion: 'المواظبة الأسبوعية على الصلاة',
    },
    quran: {
      title: 'تلاوة القرآن الكريم ومتابعته',
      subtitle: 'المصحف الشريف بالرسم العثماني الموثوق مع ترجمات بالصومالية والإنجليزية وحفظ موضع القراءة',
      dailyGoal: 'الورد اليومي',
      lastRead: 'آخر موضع قراءة',
      selectSurah: 'اختر السورة',
      searchSurah: 'ابحث باسم السورة أو رقمها...',
      ayahNumber: 'آية',
      translations: 'خيارات الترجمة',
      arabicOnly: 'النص العربي فقط',
      withSomali: 'عربي + صومالي (Af-Soomaali)',
      withEnglish: 'عربي + إنجليزي',
      allTranslations: 'النص العربي مع اللغتين',
      fontSize: 'حجم الخط العربي',
      bookmark: 'حفظ علامة الآية',
      bookmarked: 'تم حفظ العلامة',
      reminders: 'تنبيه الورد اليومي',
    },
    sleep: {
      title: 'روتين النوم والالتزام بموعد ٩:٣٠ مساءً',
      subtitle: 'تنبيه الاستعداد للنوم في تمام ٩:٠٠ مساءً (قبل الموعد بـ ٣٠ دقيقة) لضمان نوم صحي ومثمر',
      targetBedtime: 'الموعد المحدد للنوم (٢١:٣٠)',
      reminderAt: 'تنبيه الاستعداد (٢١:٠٠)',
      wakeTarget: 'الاستيقاظ لصلاة الفجر (٠٥:٠٠)',
      routineSteps: 'خطوات الاستعداد الخمس قبل النوم',
      step1: 'تنظيف الأسنان بعناية والاهتمام بالنظافة الشخصية',
      step2: 'تجهيز ملابس الغد الجامعية والحقيبة والكمبيوتر المحمول',
      step3: 'إتمام التجهيزات الأخيرة والوضوء قبل النوم',
      step4: 'إبعاد الهاتف المحمول عن السرير وتجنب النظر للشاشات',
      step5: 'الاسترخاء بأذكار النوم وقراءة آية الكرسي والنوم بحلول ٩:٣٠ مساءً',
      sleepTracker: 'إتمام روتين نوم الليلة',
      goodNightMessage: 'نوماً هنيئاً يا أسد! الانضباط الليلي يصنع التميز الصباحي.',
    },
    study: {
      title: 'مؤقت التركيز والمذاكرة (بومودورو)',
      subtitle: 'جلسات استذكار منظمة ومرتبطة مباشرة بموادك في تخصص الصحة العامة',
      pomodoro: 'بومودورو (٢٥ د / ٥ د استراحة)',
      deepWork: 'تركيز عميق (٥٠ د / ١٠ د استراحة)',
      customTimer: 'جلسة مخصصة',
      selectSubject: 'حدد المادة الدراسية',
      startSession: 'بدء جلسة التركيز',
      takeBreak: 'أخذ استراحة',
      todayStudyTime: 'وقت المذاكرة اليوم',
      targetStudyHours: 'الهدف اليومي للمذاكرة',
      studyHistory: 'سجل الجلسات المكتملة',
    },
    aiMentor: {
      title: 'المساعد الأكاديمي لأسد (AI Academic Mentor)',
      subtitle: 'مرشدك الجامعي المخصص في علوم الصحة العامة المدعوم بالذكاء الاصطناعي',
      badge: 'المرشد التخصصي في الصحة العامة',
      placeholder: 'اسأل عن الوبائيات، الإحصاء الحيوي، اقتصاديات الصحة، منهجية البحث...',
      send: 'إرسال السؤال',
      quickPromptsTitle: 'استفسارات أكاديمية مقترحة',
      prompt1: 'اشرح الفرق بين نسبة الأرجحية (Odds Ratio) والمخاطر النسبية (Relative Risk) بأمثلة وبائية.',
      prompt2: 'لخص نموذج التأخيرات الثلاثة (3 Delays) في وفيات الأمهات والحلول المقترحة.',
      prompt3: 'أنشئ ٥ أسئلة اختبار متعدد الخيارات (MCQ) حول صحة اللحوم والأمراض المشتركة.',
      prompt4: 'باللغة الصومالية: Sharax tallaabooyinka Environmental Health Impact Assessment.',
      prompt5: 'لخص المعايير القانونية لإعلان طوارئ الصحة العامة الدولية (PHEIC).',
      disclaimer: 'المساعد الأكاديمي مصمم لخدمة طلاب بكالوريوس الصحة العامة للمراجعة الأكاديمية والفهم العلمي.',
    },
  },
};

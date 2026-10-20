export interface Ayah {
  numberInSurah: number;
  textArabic: string;
  textSomali: string;
  textEnglish: string;
}

export interface SurahMeta {
  number: number;
  nameArabic: string;
  englishName: string;
  englishNameTranslation: string;
  somaliName: string;
  numberOfAyahs: number;
  revelationType: 'Meccan' | 'Medinan';
}

// Complete index of all 114 Surahs of the Holy Quran
export const ALL_SURAHS: SurahMeta[] = [
  { number: 1, nameArabic: 'الفاتحة', englishName: 'Al-Fatihah', englishNameTranslation: 'The Opening', somaliName: 'Furaha', numberOfAyahs: 7, revelationType: 'Meccan' },
  { number: 2, nameArabic: 'البقرة', englishName: 'Al-Baqarah', englishNameTranslation: 'The Cow', somaliName: 'Sacda', numberOfAyahs: 286, revelationType: 'Medinan' },
  { number: 3, nameArabic: 'آل عمران', englishName: 'Ali \'Imran', englishNameTranslation: 'Family of Imran', somaliName: 'Reer Cimraan', numberOfAyahs: 200, revelationType: 'Medinan' },
  { number: 4, nameArabic: 'النساء', englishName: 'An-Nisa', englishNameTranslation: 'The Women', somaliName: 'Haweenka', numberOfAyahs: 176, revelationType: 'Medinan' },
  { number: 5, nameArabic: 'المائدة', englishName: 'Al-Ma\'idah', englishNameTranslation: 'The Table Spread', somaliName: 'Miiska', numberOfAyahs: 120, revelationType: 'Medinan' },
  { number: 6, nameArabic: 'الأنعام', englishName: 'Al-An\'am', englishNameTranslation: 'The Cattle', somaliName: 'Xoolaha', numberOfAyahs: 165, revelationType: 'Meccan' },
  { number: 7, nameArabic: 'الأعراف', englishName: 'Al-A\'raf', englishNameTranslation: 'The Heights', somaliName: 'Deyrka', numberOfAyahs: 206, revelationType: 'Meccan' },
  { number: 8, nameArabic: 'الأنفال', englishName: 'Al-Anfal', englishNameTranslation: 'The Spoils of War', somaliName: 'Qaniimada', numberOfAyahs: 75, revelationType: 'Medinan' },
  { number: 9, nameArabic: 'التوبة', englishName: 'At-Tawbah', englishNameTranslation: 'The Repentance', somaliName: 'Toobada', numberOfAyahs: 129, revelationType: 'Medinan' },
  { number: 10, nameArabic: 'يونس', englishName: 'Yunus', englishNameTranslation: 'Jonah', somaliName: 'Yoonis', numberOfAyahs: 109, revelationType: 'Meccan' },
  { number: 11, nameArabic: 'هود', englishName: 'Hud', englishNameTranslation: 'Hud', somaliName: 'Huud', numberOfAyahs: 123, revelationType: 'Meccan' },
  { number: 12, nameArabic: 'يوسف', englishName: 'Yusuf', englishNameTranslation: 'Joseph', somaliName: 'Yuusuf', numberOfAyahs: 111, revelationType: 'Meccan' },
  { number: 13, nameArabic: 'الرعد', englishName: 'Ar-Ra\'d', englishNameTranslation: 'The Thunder', somaliName: 'Onkodka', numberOfAyahs: 43, revelationType: 'Medinan' },
  { number: 14, nameArabic: 'إبراهيم', englishName: 'Ibrahim', englishNameTranslation: 'Abraham', somaliName: 'Ibraahiim', numberOfAyahs: 52, revelationType: 'Meccan' },
  { number: 15, nameArabic: 'الحجر', englishName: 'Al-Hijr', englishNameTranslation: 'The Rocky Tract', somaliName: 'Dhagaxaanta', numberOfAyahs: 99, revelationType: 'Meccan' },
  { number: 16, nameArabic: 'النحل', englishName: 'An-Nahl', englishNameTranslation: 'The Bee', somaliName: 'Shinida', numberOfAyahs: 128, revelationType: 'Meccan' },
  { number: 17, nameArabic: 'الإسراء', englishName: 'Al-Isra', englishNameTranslation: 'The Night Journey', somaliName: 'Safarkii Habeenka', numberOfAyahs: 111, revelationType: 'Meccan' },
  { number: 18, nameArabic: 'الكهف', englishName: 'Al-Kahf', englishNameTranslation: 'The Cave', somaliName: 'Godka', numberOfAyahs: 110, revelationType: 'Meccan' },
  { number: 19, nameArabic: 'مريم', englishName: 'Maryam', englishNameTranslation: 'Mary', somaliName: 'Maryam', numberOfAyahs: 98, revelationType: 'Meccan' },
  { number: 20, nameArabic: 'طه', englishName: 'Ta-Ha', englishNameTranslation: 'Ta-Ha', somaliName: 'Dhaahaa', numberOfAyahs: 135, revelationType: 'Meccan' },
  { number: 36, nameArabic: 'يس', englishName: 'Ya-Sin', englishNameTranslation: 'Ya-Sin', somaliName: 'Yaasiin', numberOfAyahs: 83, revelationType: 'Meccan' },
  { number: 55, nameArabic: 'الرحمن', englishName: 'Ar-Rahman', englishNameTranslation: 'The Beneficent', somaliName: 'Naxariistaha', numberOfAyahs: 78, revelationType: 'Medinan' },
  { number: 56, nameArabic: 'الواقعة', englishName: 'Al-Waqi\'ah', englishNameTranslation: 'The Inevitable', somaliName: 'Dhacdada Weyn', numberOfAyahs: 96, revelationType: 'Meccan' },
  { number: 67, nameArabic: 'الملك', englishName: 'Al-Mulk', englishNameTranslation: 'The Sovereignty', somaliName: 'Boqortooyada', numberOfAyahs: 30, revelationType: 'Meccan' },
  { number: 93, nameArabic: 'الضحى', englishName: 'Ad-Duha', englishNameTranslation: 'The Morning Hours', somaliName: 'Barqada', numberOfAyahs: 11, revelationType: 'Meccan' },
  { number: 94, nameArabic: 'الشرح', englishName: 'Ash-Sharh', englishNameTranslation: 'The Relief', somaliName: 'Furaashka Laabta', numberOfAyahs: 8, revelationType: 'Meccan' },
  { number: 97, nameArabic: 'القدر', englishName: 'Al-Qadr', englishNameTranslation: 'The Power', somaliName: 'Qadarta', numberOfAyahs: 5, revelationType: 'Meccan' },
  { number: 103, nameArabic: 'العصر', englishName: 'Al-\'Asr', englishNameTranslation: 'The Declining Day', somaliName: 'Casarka', numberOfAyahs: 3, revelationType: 'Meccan' },
  { number: 108, nameArabic: 'الكوثر', englishName: 'Al-Kawthar', englishNameTranslation: 'The Abundance', somaliName: 'Khayrka Badan', numberOfAyahs: 3, revelationType: 'Meccan' },
  { number: 112, nameArabic: 'الإخلاص', englishName: 'Al-Ikhlas', englishNameTranslation: 'The Sincerity', somaliName: 'Daacadnimada', numberOfAyahs: 4, revelationType: 'Meccan' },
  { number: 113, nameArabic: 'الفلق', englishName: 'Al-Falaq', englishNameTranslation: 'The Daybreak', somaliName: 'Waaga', numberOfAyahs: 5, revelationType: 'Meccan' },
  { number: 114, nameArabic: 'الناس', englishName: 'An-Nas', englishNameTranslation: 'Mankind', somaliName: 'Dadka', numberOfAyahs: 6, revelationType: 'Meccan' },
];

// Rich verse repository with full Arabic, Somali, and English texts
export const SURAH_VERSES: Record<number, Ayah[]> = {
  // Surah Al-Fatihah (1)
  1: [
    {
      numberInSurah: 1,
      textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
      textSomali: 'Magaca Eebbe yaa lagu bilaabayaa ee Naxariis Guud iyo mid Gaaraba Naxariista.',
      textEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
    },
    {
      numberInSurah: 2,
      textArabic: 'الْحَمْدُ لِلَّهِ رَبِّ الْعَالَمِينَ',
      textSomali: 'Mahad dhammaanteed waxay u sugnaatay Eebbe ee ah barbaariyaha caalamka.',
      textEnglish: '[All] praise is [due] to Allah, Lord of the worlds -',
    },
    {
      numberInSurah: 3,
      textArabic: 'الرَّحْمَٰنِ الرَّحِيمِ',
      textSomali: 'Ee ah Naxariis Guud iyo mid Gaaraba Naxariista.',
      textEnglish: 'The Entirely Merciful, the Especially Merciful,',
    },
    {
      numberInSurah: 4,
      textArabic: 'مَالِكِ يَوْمِ الدِّينِ',
      textSomali: 'Ee ah Boqorka Maalinta Abaalmarinta (Qiyaamada).',
      textEnglish: 'Sovereign of the Day of Recompense.',
    },
    {
      numberInSurah: 5,
      textArabic: 'إِيَّاكَ نَعْبُدُ وَإِيَّاكَ نَسْتَعِينُ',
      textSomali: 'Adiga kaliya ayaanu ku caabudaynaa, adigana kaligaa ayaanu kaalmo kaa baryaynaa.',
      textEnglish: 'It is You we worship and You we ask for help.',
    },
    {
      numberInSurah: 6,
      textArabic: 'اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ',
      textSomali: 'Nagu hanuuni Jidka Toosan.',
      textEnglish: 'Guide us to the straight path -',
    },
    {
      numberInSurah: 7,
      textArabic: 'صِرَاطَ الَّذِينَ أَنْعَمْتَ عَلَيْهِمْ غَيْرِ الْمَغْضُوبِ عَلَيْهِمْ وَلَا الضَّالِّينَ',
      textSomali: 'Jidka kuwii aad u nicmaysay, aan ahayn kuwa loo cadhooday iyo kuwa haboobay midna.',
      textEnglish: 'The path of those upon whom You have bestowed favor, not of those who have evoked [Your] anger or of those who are astray.',
    },
  ],

  // Surah Ash-Sharh (94) - Comfort and easing of burdens
  94: [
    {
      numberInSurah: 1,
      textArabic: 'أَلَمْ نَشْرَحْ لَكَ صَدْرَكَ',
      textSomali: 'Miyaanan kuu waasicinin laabtaada?',
      textEnglish: 'Did We not expand for you, [O Muhammad], your breast?',
    },
    {
      numberInSurah: 2,
      textArabic: 'وَوَضَعْنَا عَنكَ وِزْرَكَ',
      textSomali: 'Oo aannaan kaa rogaynin culayskaagii?',
      textEnglish: 'And We removed from you your burden',
    },
    {
      numberInSurah: 3,
      textArabic: 'الَّذِي أَنقَضَ ظَهْرَكَ',
      textSomali: 'Kii dhabarkaaga ruxayay?',
      textEnglish: 'Which had weighed upon your back',
    },
    {
      numberInSurah: 4,
      textArabic: 'وَرَفَعْنَا لَكَ ذِكْرَكَ',
      textSomali: 'Oo aannaan kuu koryeelin magacaaga?',
      textEnglish: 'And raised high for you your repute.',
    },
    {
      numberInSurah: 5,
      textArabic: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا',
      textSomali: 'Haddaba waxaa hubaal ah in dhibka kaddib uu jiro fudayd.',
      textEnglish: 'For indeed, with hardship [will be] ease.',
    },
    {
      numberInSurah: 6,
      textArabic: 'إِنَّ مَعَ الْعُسْرِ يُسْرًا',
      textSomali: 'Hubaal dhib kasta fudayd baa weheliya.',
      textEnglish: 'Indeed, with hardship [will be] ease.',
    },
    {
      numberInSurah: 7,
      textArabic: 'فَإِذَا فَرَغْتَ فَانصَبْ',
      textSomali: 'Ee markaad hawsha dhammaysato, cibaado u taagnaaw.',
      textEnglish: 'So when you have finished [your duties], then stand up [for worship].',
    },
    {
      numberInSurah: 8,
      textArabic: 'وَإِلَىٰ رَبِّكَ فَارْغَب',
      textSomali: 'Xagga Eebbehaana ku dadaal oo baryo u noqo.',
      textEnglish: 'And to your Lord direct [your] longing.',
    },
  ],

  // Surah Al-Mulk (67)
  67: [
    {
      numberInSurah: 1,
      textArabic: 'تَبَارَكَ الَّذِي بِيَدِهِ الْمُلْكُ وَهُوَ عَلَىٰ كُلِّ شَيْءٍ قَدِيرٌ',
      textSomali: 'Waxaa barakoobay Eebaha gacantiisa ay ku jirto boqortooyadu, isaguna wax walba wuu karaa.',
      textEnglish: 'Blessed is He in whose hand is dominion, and He is over all things competent -',
    },
    {
      numberInSurah: 2,
      textArabic: 'الَّذِي خَلَقَ الْمَوْتَ وَالْحَيَاةَ لِيَبْلُوَكُمْ أَيُّكُمْ أَحْسَنُ عَمَلًا ۚ وَهُوَ الْعَزِيزُ الْغَفُورُ',
      textSomali: 'Kii abuuray dhimashada iyo nolosha si uu idiin imtixaano kiinna fiican camalka, waana Adkaade Dhaafa.',
      textEnglish: '[He] who created death and life to test you [as to] which of you is best in deed - and He is the Exalted in Might, the Forgiving -',
    },
    {
      numberInSurah: 3,
      textArabic: 'الَّذِي خَلَقَ سَبْعَ سَمَاوَاتٍ طِبَاقًا ۖ مَّا تَرَىٰ فِي خَلْقِ الرَّحْمَٰنِ مِن تَفَاوُتٍ',
      textSomali: 'Kii abuuray toddobo samooyin oo lakabyo ah, ma arkeysid abuurka Naxariistaha wax kala dhantaalan.',
      textEnglish: '[And] who created seven heavens in layers. You see no flaw in the creation of the Most Merciful.',
    },
    {
      numberInSurah: 14,
      textArabic: 'أَلَا يَعْلَمُ مَنْ خَلَقَ وَهُوَ اللَّطِيفُ الْخَبِيرُ',
      textSomali: 'Miyaanu ogeyn kii wax abuuray, isagoo ah Dhug-badane Xeeldheer?',
      textEnglish: 'Does He who created not know, while He is the Subtle, the Acquainted?',
    },
    {
      numberInSurah: 15,
      textArabic: 'هُوَ الَّذِي جَعَلَ لَكُمُ الْأَرْضَ ذَلُولًا فَامْشُوا فِي مَنَاكِبِهَا وَكُلُوا مِن رِّزْقِهِ ۖ وَإِلَيْهِ النُّشُورُ',
      textSomali: 'Eebbe waa kii idiin dhiibay dhulka si aad ugu dul socotaan waddooyinkiisa waxna uga cuntaan risiqiisii, xaggiisana waa kulanka.',
      textEnglish: 'It is He who made the earth tame for you - so walk among its slopes and eat of His provision - and to Him is the resurrection.',
    },
  ],

  // Surah Al-Ikhlas (112)
  112: [
    {
      numberInSurah: 1,
      textArabic: 'قُلْ هُوَ اللَّهُ أَحَدٌ',
      textSomali: 'Waxaad dhahdaa: Isagu waa Eebbe Kaliya.',
      textEnglish: 'Say, "He is Allah, [who is] One,',
    },
    {
      numberInSurah: 2,
      textArabic: 'اللَّهُ الصَّمَدُ',
      textSomali: 'Eebbe waa midka loo baahan yahay.',
      textEnglish: 'Allah, the Eternal Refuge.',
    },
    {
      numberInSurah: 3,
      textArabic: 'لَمْ يَلِدْ وَلَمْ يُولَدْ',
      textSomali: 'Wax ma dhalin, lamana dhalin.',
      textEnglish: 'He neither begets nor is born,',
    },
    {
      numberInSurah: 4,
      textArabic: 'وَلَمْ يَكُن لَّهُ كُفُوًا أَحَدٌ',
      textSomali: 'Oo ma jirto cid u dhiganta ama la mid ah.',
      textEnglish: 'Nor is there to Him any equivalent."',
    },
  ],

  // Surah Al-Falaq (113)
  113: [
    {
      numberInSurah: 1,
      textArabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقِ',
      textSomali: 'Waxaad dhahdaa: Waxaan ka magangalayaa Rabbiga waaga dillaaca.',
      textEnglish: 'Say, "I seek refuge in the Lord of daybreak',
    },
    {
      numberInSurah: 2,
      textArabic: 'مِن شَرِّ مَا خَلَقَ',
      textSomali: 'Sharkii wuxuu abuuray oo dhan.',
      textEnglish: 'From the evil of that which He created',
    },
    {
      numberInSurah: 3,
      textArabic: 'وَمِن شَرِّ غَاسِقٍ إِذَا وَقَبَ',
      textSomali: 'Iyo sharka habeenka marka uu mugdi noqdo.',
      textEnglish: 'And from the evil of darkness when it settles',
    },
    {
      numberInSurah: 4,
      textArabic: 'وَمِن شَرِّ النَّفَّاثَاتِ فِي الْعُقَدِ',
      textSomali: 'Iyo sharka kuwa guntimaha wax ku tufa.',
      textEnglish: 'And from the evil of the blowers in knots',
    },
    {
      numberInSurah: 5,
      textArabic: 'وَمِن شَرِّ حَاسِدٍ إِذَا حَسَدَ',
      textSomali: 'Iyo sharka xasadaha markuu wax xasdo.',
      textEnglish: 'And from the evil of an envier when he envies."',
    },
  ],

  // Surah An-Nas (114)
  114: [
    {
      numberInSurah: 1,
      textArabic: 'قُلْ أَعُوذُ بِرَبِّ النَّاسِ',
      textSomali: 'Waxaad dhahdaa: Waxaan ka magangalayaa Rabbiga dadka.',
      textEnglish: 'Say, "I seek refuge in the Lord of mankind,',
    },
    {
      numberInSurah: 2,
      textArabic: 'مَلِكِ النَّاسِ',
      textSomali: 'Boqorka dadka.',
      textEnglish: 'The Sovereign of mankind,',
    },
    {
      numberInSurah: 3,
      textArabic: 'إِلَٰهِ النَّاسِ',
      textSomali: 'Ilaaha dhabta ah ee dadka.',
      textEnglish: 'The God of mankind,',
    },
    {
      numberInSurah: 4,
      textArabic: 'مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ',
      textSomali: 'Sharkii waswaasiyaha dhuumanaya.',
      textEnglish: 'From the evil of the retreating whisperer -',
    },
    {
      numberInSurah: 5,
      textArabic: 'الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ',
      textSomali: 'Kii ku waswaasiya laabaha dadka.',
      textEnglish: 'Who whispers [evil] into the breasts of mankind -',
    },
    {
      numberInSurah: 6,
      textArabic: 'مِنَ الْجِنَّةِ وَالنَّاسِ',
      textSomali: 'Hadday jinka ka mid yihiin ama dadkaba.',
      textEnglish: 'From among the jinn and mankind."',
    },
  ],

  // Surah Al-Kahf highlights (18)
  18: [
    {
      numberInSurah: 1,
      textArabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَنزَلَ عَلَىٰ عَبْدِهِ الْكِتَابَ وَلَمْ يَجْعَل لَّهُ عِوَجًا',
      textSomali: 'Mahad waxaa leh Eebaha ku soo dejiyey addoonkiisa kitaabka, aanse ka yeelin wax qalloocan.',
      textEnglish: '[All] praise is [due] to Allah, who has sent down upon His Servant the Book and has not made therein any deviance.',
    },
    {
      numberInSurah: 10,
      textArabic: 'إِذْ أَوَى الْفِتْيَةُ إِلَى الْكَهْفِ فَقَالُوا رَبَّنَا آتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا',
      textSomali: 'Xusuuso markay dhalinyaradii u carareen godka iyagoo leh: Rabbiyow xaggaaga nooga sii naxariis noona toosi amarkanaga.',
      textEnglish: '[Mention] when the youths retreated to the cave and said, "Our Lord, grant us from Yourself mercy and prepare for us from our affair right guidance."',
    },
    {
      numberInSurah: 46,
      textArabic: 'الْمَالُ وَالْبَنُونَ زِينَةُ الْحَيَاةِ الدُّنْيَا ۖ وَالْبَاقِيَاتُ الصَّالِحَاتُ خَيْرٌ عِندَ رَبِّكَ ثَوَابًا وَخَيْرٌ أَمَلًا',
      textSomali: 'Xoolaha iyo carruurtu waa quruxda nolosha adduunka; shuqullada wanaagsan ee hadhana xagga Rabbigaaga ayaa ugu khayr badan abaalgud ahaan.',
      textEnglish: 'Wealth and children are [but] adornment of the worldly life. But the enduring good deeds are better to your Lord for reward and better for [one\'s] hope.',
    },
    {
      numberInSurah: 110,
      textArabic: 'قُلْ إِنَّمَا أَنَا بَشَرٌ مِّثْلُكُمْ يُوحَىٰ إِلَيَّ أَنَّمَا إِلَٰهُكُمْ إِلَٰهٌ وَاحِدٌ',
      textSomali: 'Waxaad dhahdaa: Anigu waxaan uun ahay bashar idinla mid ah oo la iigu waxyooday in Ilaahiinnu yahay Ilaah Kaliya.',
      textEnglish: 'Say, "I am only a man like you, to whom has been revealed that your god is one God."',
    },
  ],

  // Surah Ya-Sin highlights (36)
  36: [
    {
      numberInSurah: 1,
      textArabic: 'يس',
      textSomali: 'Yaasiin.',
      textEnglish: 'Ya, Seen.',
    },
    {
      numberInSurah: 2,
      textArabic: 'وَالْقُرْآنِ الْحَكِيمِ',
      textSomali: 'Waxaan ku dhaartay Qur\'aanka xikmadda leh.',
      textEnglish: 'By the wise Qur\'an.',
    },
    {
      numberInSurah: 3,
      textArabic: 'إِنَّكَ لَمِنَ الْمُرْسَلِينَ',
      textSomali: 'Hubaal adigu waxaad ka mid tahay kuwa la soo diray.',
      textEnglish: 'Indeed you, [O Muhammad], are from among the messengers,',
    },
    {
      numberInSurah: 4,
      textArabic: 'عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ',
      textSomali: 'Oo ku sugan jidka toosan.',
      textEnglish: 'On a straight path.',
    },
    {
      numberInSurah: 58,
      textArabic: 'سَلَامٌ قَوْلًا مِّن رَّبٍّ رَّحِيمٍ',
      textSomali: 'Waxaa loogu yeedhi: Nabadgelyo, oo hadal ka ah Rabbiga Naxariista badan.',
      textEnglish: '[And] "Peace," a word from a Merciful Lord.',
    },
    {
      numberInSurah: 82,
      textArabic: 'إِنَّمَا أَمْرُهُ إِذَا أَرَادَ شَيْئًا أَن يَقُولَ لَهُ كُن فَيَكُونُ',
      textSomali: 'Amarkiisa marka uu wax doono waa uun inuu yidhaahdo "Ahow", markaasay ahaataa.',
      textEnglish: 'His command is only when He intends a thing that He says to it, "Be," and it is.',
    },
  ],

  // Surah Ar-Rahman highlights (55)
  55: [
    {
      numberInSurah: 1,
      textArabic: 'الرَّحْمَٰنُ',
      textSomali: 'Eebbaha Naxariista badan,',
      textEnglish: 'The Most Merciful',
    },
    {
      numberInSurah: 2,
      textArabic: 'عَلَّمَ الْقُرْآنَ',
      textSomali: 'Wuxuu baray Qur\'aanka.',
      textEnglish: 'Taught the Qur\'an,',
    },
    {
      numberInSurah: 3,
      textArabic: 'خَلَقَ الْإِنسَانَ',
      textSomali: 'Wuxuu abuuray aadanaha.',
      textEnglish: 'Created man,',
    },
    {
      numberInSurah: 4,
      textArabic: 'عَلَّمَهُ الْبَيَانَ',
      textSomali: 'Wuxuuna baray hadalka iyo caddaynta.',
      textEnglish: '[And] taught him eloquence.',
    },
    {
      numberInSurah: 13,
      textArabic: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
      textSomali: 'Ee nicmooyinka Rabbigiin teebaa beeninaysaan?',
      textEnglish: 'So which of the favors of your Lord would you deny?',
    },
    {
      numberInSurah: 60,
      textArabic: 'هَلْ جَزَاءُ الْإِحْسَانِ إِلَّا الْإِحْسَانُ',
      textSomali: 'Miyaa abaalmarinta wanaagga laga yeelaa wax aan wanaag ahayn?',
      textEnglish: 'Is the reward for good [anything] but good?',
    },
  ],
};

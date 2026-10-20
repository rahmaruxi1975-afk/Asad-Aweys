import React, { useState } from 'react';
import {
  BookMarked,
  Bookmark,
  BookmarkCheck,
  Search,
  Bell,
  BellOff,
  Clock,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Volume2,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { QuranState, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { ALL_SURAHS, SURAH_VERSES, Ayah } from '../utils/quranData';
import { playChimeSound } from '../utils/storage';

interface QuranSectionProps {
  quranState: QuranState;
  language: Language;
  onUpdateQuranState: (updated: QuranState) => void;
}

export const QuranSection: React.FC<QuranSectionProps> = ({
  quranState,
  language,
  onUpdateQuranState,
}) => {
  const t = TRANSLATIONS[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [fontSizeLevel, setFontSizeLevel] = useState<'normal' | 'large' | 'xlarge'>('large');

  const currentSurahMeta =
    ALL_SURAHS.find((s) => s.number === quranState.currentSurah) || ALL_SURAHS[0];

  const currentAyahs: Ayah[] =
    SURAH_VERSES[quranState.currentSurah] || [
      {
        numberInSurah: 1,
        textArabic: 'بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ',
        textSomali: 'Magaca Eebbe yaa lagu bilaabayaa ee Naxariis Guud iyo mid Gaaraba Naxariista.',
        textEnglish: 'In the name of Allah, the Entirely Merciful, the Especially Merciful.',
      },
      {
        numberInSurah: 2,
        textArabic: 'اقْرَأْ بِاسْمِ رَبِّكَ الَّذِي خَلَقَ',
        textSomali: 'Akhri adoo kaashanaya magaca Rabbigaaga abuuray.',
        textEnglish: 'Recite in the name of your Lord who created.',
      },
    ];

  const filteredSurahs = ALL_SURAHS.filter(
    (s) =>
      s.englishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.nameArabic.includes(searchQuery) ||
      s.somaliName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.number.toString() === searchQuery.trim()
  );

  const handleSelectSurah = (surahNumber: number) => {
    const meta = ALL_SURAHS.find((s) => s.number === surahNumber);
    onUpdateQuranState({
      ...quranState,
      currentSurah: surahNumber,
      currentAyah: 1,
      lastReadSurahName: meta ? meta.englishName : `Surah ${surahNumber}`,
      lastReadDate: new Date().toISOString().split('T')[0],
    });
  };

  const handleToggleBookmark = (ayahNumber: number) => {
    const isBookmarked = quranState.bookmarks.some(
      (b) => b.surahNumber === quranState.currentSurah && b.ayahNumber === ayahNumber
    );

    let updatedBookmarks;
    if (isBookmarked) {
      updatedBookmarks = quranState.bookmarks.filter(
        (b) => !(b.surahNumber === quranState.currentSurah && b.ayahNumber === ayahNumber)
      );
    } else {
      updatedBookmarks = [
        ...quranState.bookmarks,
        {
          id: `bm-${Date.now()}`,
          surahNumber: quranState.currentSurah,
          surahName: currentSurahMeta.englishName,
          ayahNumber,
          savedAt: new Date().toISOString().split('T')[0],
        },
      ];
      playChimeSound('complete');
    }

    onUpdateQuranState({
      ...quranState,
      bookmarks: updatedBookmarks,
      currentAyah: ayahNumber,
      lastReadSurahName: currentSurahMeta.englishName,
    });
  };

  const handleIncrementRead = () => {
    const newCount = Math.min(
      quranState.dailyGoalVerses + 50,
      quranState.completedVersesToday + 1
    );
    onUpdateQuranState({
      ...quranState,
      completedVersesToday: newCount,
    });
    playChimeSound('complete');
  };

  const getArabicFontSizeClass = () => {
    switch (fontSizeLevel) {
      case 'normal': return 'text-xl sm:text-2xl';
      case 'xlarge': return 'text-3xl sm:text-4xl';
      default: return 'text-2xl sm:text-3xl';
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <BookMarked className="w-3.5 h-3.5" />
            <span>Holy Quran • Al-Mushaf Al-Sharif</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.quran.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.quran.subtitle}
          </p>
        </div>

        {/* Daily Goal Progress Widget */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[240px] space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-amber-300">
            <span>{t.quran.dailyGoal}</span>
            <span className="font-mono bg-amber-500/30 px-2 py-0.5 rounded text-white">
              {quranState.completedVersesToday} / {quranState.dailyGoalVerses} Verses
            </span>
          </div>

          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-amber-400 h-full rounded-full transition-all"
              style={{
                width: `${Math.min(100, (quranState.completedVersesToday / quranState.dailyGoalVerses) * 100)}%`,
              }}
            ></div>
          </div>

          <div className="flex justify-between items-center text-xs">
            <button
              onClick={handleIncrementRead}
              className="px-2.5 py-1 rounded-lg bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-[11px] transition-colors"
            >
              + Log 1 Ayah Read
            </button>
            <span className="text-[11px] text-slate-300">
              {Math.max(0, quranState.dailyGoalVerses - quranState.completedVersesToday)} verses left today
            </span>
          </div>
        </div>
      </div>

      {/* Control Strip: Translation Options, Font Size, Reminders */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Translation Switcher */}
        <div className="space-y-1">
          <label className="text-[10px] font-bold uppercase text-slate-400 block">
            {t.quran.translations}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {[
              { id: 'both', label: t.quran.allTranslations },
              { id: 'so', label: t.quran.withSomali },
              { id: 'en', label: t.quran.withEnglish },
              { id: 'none', label: t.quran.arabicOnly },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() =>
                  onUpdateQuranState({
                    ...quranState,
                    translationPreference: opt.id as any,
                  })
                }
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  quranState.translationPreference === opt.id
                    ? 'bg-amber-600 text-white font-bold shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Font Size & Reminders */}
        <div className="flex items-center gap-3">
          {/* Font Size Controls */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFontSizeLevel('normal')}
              className={`p-1.5 rounded-lg text-xs ${fontSizeLevel === 'normal' ? 'bg-white dark:bg-slate-700 shadow-xs font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}
              title="Normal font size"
            >
              A
            </button>
            <button
              onClick={() => setFontSizeLevel('large')}
              className={`p-1.5 rounded-lg text-sm ${fontSizeLevel === 'large' ? 'bg-white dark:bg-slate-700 shadow-xs font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}
              title="Large font size"
            >
              A+
            </button>
            <button
              onClick={() => setFontSizeLevel('xlarge')}
              className={`p-1.5 rounded-lg text-base ${fontSizeLevel === 'xlarge' ? 'bg-white dark:bg-slate-700 shadow-xs font-bold text-slate-900 dark:text-white' : 'text-slate-500'}`}
              title="Extra large font size"
            >
              A++
            </button>
          </div>

          {/* Reminder Toggle */}
          <button
            onClick={() =>
              onUpdateQuranState({
                ...quranState,
                remindersEnabled: !quranState.remindersEnabled,
              })
            }
            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
              quranState.remindersEnabled
                ? 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-800'
                : 'bg-slate-100 text-slate-500 border-slate-300 dark:bg-slate-800 dark:border-slate-700'
            }`}
          >
            {quranState.remindersEnabled ? <Bell className="w-3.5 h-3.5" /> : <BellOff className="w-3.5 h-3.5" />}
            {quranState.remindersEnabled ? `Reminder: ${quranState.reminderScheduleTime}` : 'Reminder OFF'}
          </button>
        </div>
      </div>

      {/* Main Reading View Layout: Surah Selector List on Left, Ayahs on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Col: Surah Catalog (114 Surahs) */}
        <div className="lg:col-span-1 bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs space-y-3 h-[700px] flex flex-col">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={t.quran.searchSurah}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-amber-500"
            />
          </div>

          <div className="flex-1 overflow-y-auto space-y-1 pr-1">
            {filteredSurahs.map((surah) => {
              const isSelected = surah.number === quranState.currentSurah;
              return (
                <button
                  key={surah.number}
                  onClick={() => handleSelectSurah(surah.number)}
                  className={`w-full text-left p-2.5 rounded-xl text-xs transition-all flex items-center justify-between ${
                    isSelected
                      ? 'bg-amber-600 text-white font-bold shadow-sm'
                      : 'hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-mono font-bold ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                      }`}
                    >
                      {surah.number}
                    </span>
                    <div>
                      <p className="font-bold truncate">{surah.englishName}</p>
                      <p className={`text-[10px] ${isSelected ? 'text-amber-100' : 'text-slate-400'}`}>
                        {surah.somaliName} • {surah.numberOfAyahs} v.
                      </p>
                    </div>
                  </div>
                  <span className={`font-arabic text-sm ${isSelected ? 'text-white' : 'text-amber-600 dark:text-amber-400'}`}>
                    {surah.nameArabic}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right 3 Cols: Quran Surah Reader */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between h-[700px]">
          {/* Surah Header Card */}
          <div className="text-center pb-5 border-b border-slate-100 dark:border-slate-800 space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 text-xs font-semibold">
              <span>Surah #{currentSurahMeta.number}</span>
              <span>•</span>
              <span>{currentSurahMeta.revelationType}</span>
              <span>•</span>
              <span>{currentSurahMeta.numberOfAyahs} Verses</span>
            </div>
            <h3 className="font-arabic text-3xl sm:text-4xl text-slate-900 dark:text-amber-100 font-bold py-1">
              سُورَةُ {currentSurahMeta.nameArabic}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {currentSurahMeta.englishName} ({currentSurahMeta.englishNameTranslation}) — Af-Soomaali: {currentSurahMeta.somaliName}
            </p>
          </div>

          {/* Verses Scroll Container */}
          <div className="flex-1 overflow-y-auto py-6 space-y-6 pr-2">
            {/* Bismillah (except for Surah 9) */}
            {currentSurahMeta.number !== 9 && (
              <div className="text-center py-3">
                <p className="font-arabic text-2xl sm:text-3xl text-slate-800 dark:text-amber-200">
                  بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ
                </p>
              </div>
            )}

            {currentAyahs.map((ayah) => {
              const isBookmarked = quranState.bookmarks.some(
                (b) => b.surahNumber === currentSurahMeta.number && b.ayahNumber === ayah.numberInSurah
              );

              return (
                <div
                  key={ayah.numberInSurah}
                  className={`p-5 rounded-2xl border transition-all space-y-3 ${
                    isBookmarked
                      ? 'bg-amber-50/70 dark:bg-amber-950/20 border-amber-300 dark:border-amber-900/60'
                      : 'bg-slate-50/60 dark:bg-slate-800/40 border-slate-200/70 dark:border-slate-800 hover:border-amber-300/60'
                  }`}
                >
                  {/* Top Ayah Number & Bookmark Action */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <span className="font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                      Ayah {ayah.numberInSurah}
                    </span>

                    <button
                      onClick={() => handleToggleBookmark(ayah.numberInSurah)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold transition-colors ${
                        isBookmarked
                          ? 'bg-amber-600 text-white'
                          : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-amber-600 border border-slate-200 dark:border-slate-700'
                      }`}
                    >
                      {isBookmarked ? (
                        <>
                          <BookmarkCheck className="w-3.5 h-3.5" />
                          Bookmarked
                        </>
                      ) : (
                        <>
                          <Bookmark className="w-3.5 h-3.5" />
                          Bookmark
                        </>
                      )}
                    </button>
                  </div>

                  {/* Authentic Arabic Quran Text */}
                  <div dir="rtl" className="text-right py-2">
                    <p
                      className={`font-arabic text-slate-950 dark:text-amber-50 font-medium ${getArabicFontSizeClass()}`}
                    >
                      {ayah.textArabic}
                      <span className="inline-block mx-2 text-amber-600 font-mono text-sm">
                        ﴿{ayah.numberInSurah}﴾
                      </span>
                    </p>
                  </div>

                  {/* Somali Translation (if enabled) */}
                  {(quranState.translationPreference === 'both' ||
                    quranState.translationPreference === 'so') && (
                    <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60">
                      <p className="text-xs sm:text-sm text-teal-800 dark:text-teal-300 font-medium leading-relaxed">
                        <span className="font-bold text-[10px] uppercase tracking-wider text-teal-600 dark:text-teal-400 mr-2">
                          Af-Soomaali:
                        </span>
                        {ayah.textSomali}
                      </p>
                    </div>
                  )}

                  {/* English Translation (if enabled) */}
                  {(quranState.translationPreference === 'both' ||
                    quranState.translationPreference === 'en') && (
                    <div className="pt-1.5">
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        <span className="font-bold text-[10px] uppercase tracking-wider text-slate-500 mr-2">
                          English:
                        </span>
                        {ayah.textEnglish}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Bottom Navigator: Prev Surah / Next Surah */}
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
            <button
              disabled={currentSurahMeta.number <= 1}
              onClick={() => handleSelectSurah(currentSurahMeta.number - 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 disabled:opacity-40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Previous Surah
            </button>

            <span className="text-xs font-mono font-bold text-slate-400">
              Surah {currentSurahMeta.number} of 114
            </span>

            <button
              disabled={currentSurahMeta.number >= 114}
              onClick={() => handleSelectSurah(currentSurahMeta.number + 1)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 disabled:opacity-40 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
            >
              Next Surah
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

import React, { useState } from 'react';
import {
  Quote,
  Heart,
  Plus,
  Sparkles,
  Share2,
  Copy,
  Globe,
  Award,
  BookOpen,
} from 'lucide-react';
import { MotivationQuote, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { playChimeSound } from '../utils/storage';

interface MotivationSectionProps {
  quotes: MotivationQuote[];
  language: Language;
  onUpdateQuotes: (quotes: MotivationQuote[]) => void;
}

export const MotivationSection: React.FC<MotivationSectionProps> = ({
  quotes,
  language,
  onUpdateQuotes,
}) => {
  const [selectedQuoteLang, setSelectedQuoteLang] = useState<'en' | 'so' | 'ar'>('en');
  const [themeFilter, setThemeFilter] = useState<string>('all');
  const [onlyFavorites, setOnlyFavorites] = useState(false);

  // New quote form
  const [isAdding, setIsAdding] = useState(false);
  const [newTextEn, setNewTextEn] = useState('');
  const [newTextSo, setNewTextSo] = useState('');
  const [newTextAr, setNewTextAr] = useState('');
  const [newAuthor, setNewAuthor] = useState('Asad Aweys');
  const [newTheme, setNewTheme] = useState<MotivationQuote['theme']>('public_health');

  const handleToggleFavorite = (id: string) => {
    const updated = quotes.map((q) =>
      q.id === id ? { ...q, isFavorite: !q.isFavorite } : q
    );
    onUpdateQuotes(updated);
    playChimeSound('complete');
  };

  const handleAddQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTextEn.trim()) return;

    const newQuote: MotivationQuote = {
      id: `quote-${Date.now()}`,
      textEn: newTextEn,
      textSo: newTextSo || newTextEn,
      textAr: newTextAr || newTextEn,
      author: newAuthor || 'Asad Aweys',
      theme: newTheme,
      isFavorite: true,
      isCustom: true,
    };

    onUpdateQuotes([newQuote, ...quotes]);
    setNewTextEn('');
    setNewTextSo('');
    setNewTextAr('');
    setIsAdding(false);
  };

  const filteredQuotes = quotes.filter((q) => {
    const matchesTheme = themeFilter === 'all' || q.theme === themeFilter;
    const matchesFav = !onlyFavorites || q.isFavorite;
    return matchesTheme && matchesFav;
  });

  const getQuoteText = (q: MotivationQuote) => {
    if (selectedQuoteLang === 'so') return q.textSo;
    if (selectedQuoteLang === 'ar') return q.textAr;
    return q.textEn;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white border border-amber-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-400/30 text-amber-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Wisdom, Sabr & Academic Resilience</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Daily Motivation & Personal Growth
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Inspiring aphorisms in English, Somali (Af-Soomaali), and Arabic (العربية) to nurture discipline, patience, knowledge, and a commitment to Public Health.
          </p>
        </div>

        {/* Language & Action Controls */}
        <div className="flex flex-col sm:flex-row items-center gap-3">
          {/* Quote language switcher */}
          <div className="flex bg-white/10 backdrop-blur-md p-1 rounded-xl border border-white/20 text-xs font-semibold">
            {(['en', 'so', 'ar'] as const).map((lng) => (
              <button
                key={lng}
                onClick={() => setSelectedQuoteLang(lng)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  selectedQuoteLang === lng
                    ? 'bg-amber-500 text-slate-950 font-bold shadow-xs'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {lng === 'en' ? 'English' : lng === 'so' ? 'Af-Soomaali' : 'العربية'}
              </button>
            ))}
          </div>

          <button
            onClick={() => setIsAdding(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 text-xs font-bold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Motivation
          </button>
        </div>
      </div>

      {/* Theme Filter Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase text-slate-400 mr-1">
            Theme:
          </span>
          {[
            { id: 'all', label: 'All Themes' },
            { id: 'public_health', label: 'Public Health' },
            { id: 'discipline', label: 'Discipline' },
            { id: 'patience', label: 'Patience (Sabr)' },
            { id: 'knowledge', label: 'Knowledge' },
            { id: 'time', label: 'Time Management' },
            { id: 'faith', label: 'Faith & Gratitude' },
          ].map((th) => (
            <button
              key={th.id}
              onClick={() => setThemeFilter(th.id)}
              className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
                themeFilter === th.id
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {th.label}
            </button>
          ))}
        </div>

        <button
          onClick={() => setOnlyFavorites(!onlyFavorites)}
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${
            onlyFavorites
              ? 'bg-red-50 text-red-700 border-red-300 dark:bg-red-950/40 dark:text-red-300 dark:border-red-800'
              : 'bg-slate-50 text-slate-600 border-slate-200 dark:bg-slate-800 dark:border-slate-700'
          }`}
        >
          <Heart className={`w-3.5 h-3.5 ${onlyFavorites ? 'fill-red-500 text-red-500' : ''}`} />
          Favorites Only
        </button>
      </div>

      {/* Quotes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredQuotes.map((q) => (
          <div
            key={q.id}
            className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 hover:border-amber-400/60 shadow-xs flex flex-col justify-between space-y-4 transition-all group"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-amber-50 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 font-mono">
                  {q.theme.replace('_', ' ')}
                </span>
                <button
                  onClick={() => handleToggleFavorite(q.id)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 transition-colors"
                  title="Toggle favorite"
                >
                  <Heart className={`w-4 h-4 ${q.isFavorite ? 'fill-red-500 text-red-500' : ''}`} />
                </button>
              </div>

              <p
                dir={selectedQuoteLang === 'ar' ? 'rtl' : 'ltr'}
                className={`text-sm sm:text-base text-slate-900 dark:text-slate-100 font-medium leading-relaxed ${
                  selectedQuoteLang === 'ar' ? 'font-arabic text-lg' : 'font-serif italic'
                }`}
              >
                "{getQuoteText(q)}"
              </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500">
              <span className="font-bold text-slate-700 dark:text-slate-300">
                — {q.author}
              </span>

              <button
                onClick={() => {
                  navigator.clipboard.writeText(`"${getQuoteText(q)}" — ${q.author}`);
                  alert('Quote copied to clipboard!');
                }}
                className="opacity-0 group-hover:opacity-100 text-amber-600 hover:underline flex items-center gap-1 transition-opacity"
              >
                <Copy className="w-3 h-3" />
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Custom Quote Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 w-full max-w-lg shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Add Personal Motivational Message
            </h3>

            <form onSubmit={handleAddQuote} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">English Text</label>
                <textarea
                  rows={2}
                  placeholder="e.g. Every disease outbreak prevented is a generation preserved..."
                  value={newTextEn}
                  onChange={(e) => setNewTextEn(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Somali Translation (Af-Soomaali)</label>
                <textarea
                  rows={2}
                  placeholder="Tarjumada Af-Soomaaliga..."
                  value={newTextSo}
                  onChange={(e) => setNewTextSo(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Arabic Translation (العربية)</label>
                <textarea
                  rows={2}
                  dir="rtl"
                  placeholder="الترجمة باللغة العربية..."
                  value={newTextAr}
                  onChange={(e) => setNewTextAr(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 font-arabic"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Author</label>
                  <input
                    type="text"
                    value={newAuthor}
                    onChange={(e) => setNewAuthor(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Theme</label>
                  <select
                    value={newTheme}
                    onChange={(e) => setNewTheme(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  >
                    <option value="public_health">Public Health</option>
                    <option value="discipline">Discipline</option>
                    <option value="patience">Patience</option>
                    <option value="knowledge">Knowledge</option>
                    <option value="time">Time Management</option>
                    <option value="faith">Faith</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold"
                >
                  Save Quote
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

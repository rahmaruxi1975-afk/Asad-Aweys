import React, { useState, useEffect } from 'react';
import {
  Moon,
  Sun,
  Globe,
  Bell,
  Clock,
  Menu,
  Sparkles,
  BookOpen,
  CheckCircle2,
} from 'lucide-react';
import { Language, PrayerTimesData, SleepRoutineData, UserProfile } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { calculatePrayerTimes, getPrayerStatus } from '../utils/prayerCalculator';
import { sendNotification } from '../utils/storage';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
  profile: UserProfile;
  prayerData: PrayerTimesData;
  sleepRoutine: SleepRoutineData;
  onOpenMobileNav: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  darkMode,
  onToggleDarkMode,
  profile,
  prayerData,
  sleepRoutine,
  onOpenMobileNav,
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const t = TRANSLATIONS[language];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTimes = calculatePrayerTimes(
    currentTime,
    prayerData.latitude,
    prayerData.longitude,
    prayerData.calculationMethod
  );
  const prayerStatus = getPrayerStatus(prayerTimes, currentTime);

  // Calculate hours/mins until 9:30 PM bedtime
  const now = currentTime;
  const bedtimeDate = new Date(now);
  bedtimeDate.setHours(21, 30, 0, 0);
  if (now > bedtimeDate) {
    bedtimeDate.setDate(bedtimeDate.getDate() + 1);
  }
  const diffBedtimeMs = bedtimeDate.getTime() - now.getTime();
  const bedtimeHrs = Math.floor(diffBedtimeMs / (1000 * 60 * 60));
  const bedtimeMins = Math.floor((diffBedtimeMs % (1000 * 60 * 60)) / (1000 * 60));

  const handleTestNotification = async () => {
    const granted = await sendNotification(
      'Asad Aweys Dashboard',
      'Notifications are enabled! You will receive prayer, study, and 9:00 PM bedtime wind-down reminders.'
    );
    if (!granted) {
      alert('Notification permissions are not enabled in your browser. Please allow notifications in site settings.');
    }
  };

  const formattedDate = currentTime.toLocaleDateString(
    language === 'ar' ? 'ar-EG' : language === 'so' ? 'so-SO' : 'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }
  );

  return (
    <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 lg:px-8 py-3 transition-colors dark:bg-slate-900/90 dark:border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left: Mobile menu toggle + Date & Clock */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenMobileNav}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-2">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-teal-500"></span>
              </span>
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-700 dark:text-teal-400">
                {profile.degree}
              </p>
            </div>
            <div className="flex items-center gap-2 text-slate-800 dark:text-slate-100 font-semibold text-sm sm:text-base">
              <span>{formattedDate}</span>
              <span className="text-slate-300 dark:text-slate-700">•</span>
              <span className="font-mono text-teal-600 dark:text-teal-400 font-bold">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </span>
            </div>
          </div>
        </div>

        {/* Center: Live Widgets (Next Prayer & Bedtime Countdown) */}
        <div className="hidden md:flex items-center gap-2.5">
          {/* Next Prayer Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200/80 text-xs text-slate-700 dark:bg-slate-800/80 dark:border-slate-700 dark:text-slate-200 shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium text-slate-500 dark:text-slate-400">{t.prayer.nextPrayer}:</span>
            <span className="font-bold text-slate-900 dark:text-white">
              {prayerStatus.nextPrayer} ({prayerStatus.nextPrayerTime})
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono">
              in {prayerStatus.countdown}
            </span>
          </div>

          {/* Bedtime 9:30 PM Target Pill */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50/80 border border-indigo-100 text-xs text-indigo-900 dark:bg-indigo-950/40 dark:border-indigo-900/60 dark:text-indigo-200 shadow-xs">
            <Moon className="w-3.5 h-3.5 text-indigo-500" />
            <span className="font-medium text-indigo-700 dark:text-indigo-300">Bedtime:</span>
            <span className="font-bold font-mono">21:30</span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-indigo-200/70 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-200 font-mono">
              {bedtimeHrs}h {bedtimeMins}m
            </span>
          </div>
        </div>

        {/* Right: Controls (Language, Theme, Notification, Profile Avatar) */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Language Selector */}
          <div className="relative flex items-center">
            <Globe className="w-4 h-4 text-slate-400 absolute left-2 pointer-events-none" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as Language)}
              className="pl-7 pr-3 py-1.5 text-xs font-semibold bg-slate-100 hover:bg-slate-200/80 border border-slate-200 rounded-lg text-slate-700 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500 transition-colors"
              aria-label="Language selector"
            >
              <option value="en">English (EN)</option>
              <option value="so">Af-Soomaali (SO)</option>
              <option value="ar">العربية (AR)</option>
            </select>
          </div>

          {/* Dark / Light Toggle */}
          <button
            onClick={onToggleDarkMode}
            className="p-2 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700 transition-colors"
            title={darkMode ? t.common.lightMode : t.common.darkMode}
            aria-label="Toggle dark mode"
          >
            {darkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          {/* Test Notification Bell */}
          <button
            onClick={handleTestNotification}
            className="p-2 rounded-lg text-slate-600 hover:text-teal-600 hover:bg-teal-50 dark:text-slate-300 dark:hover:text-teal-400 dark:hover:bg-teal-950/40 border border-slate-200 dark:border-slate-700 transition-colors relative"
            title="Enable and test notifications"
            aria-label="Notifications"
          >
            <Bell className="w-4 h-4" />
            {prayerData.remindersEnabled && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-teal-500"></span>
            )}
          </button>

          {/* User Profile Mini Badge */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
            <img
              src={profile.avatarUrl}
              alt={profile.name}
              className="w-8 h-8 rounded-full object-cover ring-2 ring-teal-500/30"
              onError={(e) => {
                // fallback avatar
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div className="hidden sm:block text-left">
              <p className="text-xs font-bold text-slate-800 dark:text-slate-100 leading-tight">
                {profile.name}
              </p>
              <p className="text-[11px] text-teal-600 dark:text-teal-400 font-medium">
                Public Health
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

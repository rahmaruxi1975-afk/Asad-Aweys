import React, { useState, useEffect } from 'react';
import {
  Clock,
  Compass,
  Bell,
  BellOff,
  Volume2,
  VolumeX,
  MapPin,
  CheckCircle2,
  ChevronRight,
  Shield,
  Sparkles,
  Info,
} from 'lucide-react';
import { PrayerTimesData, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import {
  calculatePrayerTimes,
  calculateQiblaDirection,
  getPrayerStatus,
  PRESET_CITIES,
  CALCULATION_METHODS,
} from '../utils/prayerCalculator';
import { playChimeSound, sendNotification } from '../utils/storage';

interface PrayerSectionProps {
  prayerData: PrayerTimesData;
  language: Language;
  onUpdatePrayerData: (updated: PrayerTimesData) => void;
  onTogglePrayerToday: (prayerKey: keyof PrayerTimesData['todayChecklist']) => void;
}

export const PrayerSection: React.FC<PrayerSectionProps> = ({
  prayerData,
  language,
  onUpdatePrayerData,
  onTogglePrayerToday,
}) => {
  const t = TRANSLATIONS[language];
  const [now, setNow] = useState(new Date());
  const [notificationStatus, setNotificationStatus] = useState<string>(
    typeof Notification !== 'undefined' ? Notification.permission : 'unsupported'
  );

  useEffect(() => {
    const timer = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const prayerTimes = calculatePrayerTimes(
    now,
    prayerData.latitude,
    prayerData.longitude,
    prayerData.calculationMethod
  );

  const status = getPrayerStatus(prayerTimes, now);
  const qiblaAngle = calculateQiblaDirection(prayerData.latitude, prayerData.longitude);

  const handleCityChange = (cityName: string) => {
    const found = PRESET_CITIES.find((c) => c.name === cityName);
    if (found) {
      onUpdatePrayerData({
        ...prayerData,
        city: found.name,
        country: found.country,
        latitude: found.latitude,
        longitude: found.longitude,
      });
    }
  };

  const handleToggleReminders = async () => {
    const nextState = !prayerData.remindersEnabled;
    if (nextState && typeof Notification !== 'undefined') {
      const permission = await Notification.requestPermission();
      setNotificationStatus(permission);
      if (permission === 'granted') {
        sendNotification(
          'Prayer Reminders Active',
          `You will receive alerts for Fajr, Dhuhr, Asr, Maghrib, and Isha in ${prayerData.city}.`
        );
      }
    }
    onUpdatePrayerData({ ...prayerData, remindersEnabled: nextState });
  };

  const handleToggleSound = () => {
    const next = !prayerData.soundAlertEnabled;
    if (next) playChimeSound('prayer');
    onUpdatePrayerData({ ...prayerData, soundAlertEnabled: next });
  };

  const prayerCards = [
    { key: 'fajr' as const, name: t.prayer.fajr, time: prayerTimes.fajr, rawTime: prayerTimes.rawDates.fajr },
    { key: 'sunrise' as const, name: t.prayer.sunrise, time: prayerTimes.sunrise, rawTime: prayerTimes.rawDates.sunrise, isSun: true },
    { key: 'dhuhr' as const, name: t.prayer.dhuhr, time: prayerTimes.dhuhr, rawTime: prayerTimes.rawDates.dhuhr },
    { key: 'asr' as const, name: t.prayer.asr, time: prayerTimes.asr, rawTime: prayerTimes.rawDates.asr },
    { key: 'maghrib' as const, name: t.prayer.maghrib, time: prayerTimes.maghrib, rawTime: prayerTimes.rawDates.maghrib },
    { key: 'isha' as const, name: t.prayer.isha, time: prayerTimes.isha, rawTime: prayerTimes.rawDates.isha },
  ];

  const todayCompletedCount = Object.values(prayerData.todayChecklist).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-950 to-slate-900 rounded-2xl p-6 sm:p-8 text-white border border-emerald-800/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Islamic Routine & Worship</span>
            <span className="text-emerald-400/60">•</span>
            <span>{prayerData.city}, {prayerData.country}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.prayer.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.prayer.subtitle}
          </p>
        </div>

        {/* Live Next Prayer Big Countdown Widget */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[240px] text-center space-y-2 shadow-lg">
          <span className="text-xs uppercase font-bold text-emerald-300 tracking-wider">
            {t.prayer.nextPrayer}
          </span>
          <h3 className="text-3xl font-black font-mono text-white">
            {status.nextPrayer}
          </h3>
          <p className="text-lg font-bold font-mono text-emerald-400">
            {status.nextPrayerTime}
          </p>
          <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/30 text-emerald-200 text-xs font-mono font-bold">
            in {status.countdown}
          </div>
        </div>
      </div>

      {/* Settings Bar: City Selection, Calculation Method, Notification Toggles */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* City Select */}
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
          <div className="space-y-0.5">
            <label className="text-[10px] font-bold uppercase text-slate-400">
              {t.prayer.selectCity}
            </label>
            <select
              value={prayerData.city}
              onChange={(e) => handleCityChange(e.target.value)}
              className="block text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-emerald-500"
            >
              {PRESET_CITIES.map((c) => (
                <option key={c.name} value={c.name}>
                  {c.name}, {c.country} ({c.latitude > 0 ? `${c.latitude}°N` : `${-c.latitude}°S`})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Calculation Method */}
        <div className="space-y-0.5">
          <label className="text-[10px] font-bold uppercase text-slate-400">
            {t.prayer.calculationMethod}
          </label>
          <select
            value={prayerData.calculationMethod}
            onChange={(e) =>
              onUpdatePrayerData({ ...prayerData, calculationMethod: e.target.value })
            }
            className="block text-xs font-semibold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200"
          >
            {Object.entries(CALCULATION_METHODS).map(([key, m]) => (
              <option key={key} value={key}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Notification Switches */}
        <div className="flex items-center gap-3">
          {/* Reminders Toggle */}
          <button
            onClick={handleToggleReminders}
            className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all border ${
              prayerData.remindersEnabled
                ? 'bg-emerald-600 text-white border-emerald-600 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}
          >
            {prayerData.remindersEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            {prayerData.remindersEnabled ? t.common.reminderOn : t.common.reminderOff}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl text-xs font-bold transition-all border ${
              prayerData.soundAlertEnabled
                ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                : 'bg-slate-100 text-slate-400 border-slate-300 dark:bg-slate-800 dark:border-slate-700'
            }`}
            title="Toggle Adhan audio chime alert"
          >
            {prayerData.soundAlertEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Prayers Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {prayerCards.map((p) => {
          const isCheckable = p.key !== 'sunrise';
          const isDone = isCheckable && prayerData.todayChecklist[p.key as keyof PrayerTimesData['todayChecklist']];
          const isCurrent = status.currentPrayer.toLowerCase() === p.key.toLowerCase();
          const isNext = status.nextPrayer.toLowerCase() === p.key.toLowerCase();

          return (
            <div
              key={p.key}
              className={`rounded-2xl p-4 border transition-all flex flex-col justify-between ${
                isNext
                  ? 'bg-gradient-to-b from-emerald-500/10 to-transparent border-emerald-500 ring-2 ring-emerald-500/30 dark:border-emerald-500 shadow-md'
                  : isDone
                  ? 'bg-emerald-50/60 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900/50'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800'
              }`}
            >
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                    {p.name}
                  </span>
                  {isNext && (
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                  )}
                </div>
                <h4 className="text-lg sm:text-xl font-black font-mono text-slate-900 dark:text-white">
                  {p.time}
                </h4>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
                {isCheckable ? (
                  <button
                    onClick={() => {
                      onTogglePrayerToday(p.key as keyof PrayerTimesData['todayChecklist']);
                      playChimeSound('complete');
                    }}
                    className={`w-full py-1.5 rounded-lg text-xs font-bold flex items-center justify-center gap-1.5 transition-colors ${
                      isDone
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 hover:bg-emerald-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {isDone ? 'Completed' : 'Mark Done'}
                  </button>
                ) : (
                  <div className="text-[11px] text-center text-slate-400 py-1 font-medium">
                    Shuruk (Sunrise)
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom Row: Qibla Direction Compass & Daily Tracker Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Qibla Direction Compass */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col items-center text-center space-y-4">
          <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
            <Compass className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
            <span>{t.prayer.qiblaCompass}</span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm">
            Bearing towards the Holy Kaaba (21.42° N, 39.82° E) from {prayerData.city}.
          </p>

          {/* Compass Visual Ring */}
          <div className="relative w-40 h-40 rounded-full border-4 border-slate-200 dark:border-slate-800 flex items-center justify-center bg-slate-50 dark:bg-slate-950 shadow-inner">
            <span className="absolute top-2 text-[10px] font-bold font-mono text-slate-400">N</span>
            <span className="absolute bottom-2 text-[10px] font-bold font-mono text-slate-400">S</span>
            <span className="absolute left-2 text-[10px] font-bold font-mono text-slate-400">W</span>
            <span className="absolute right-2 text-[10px] font-bold font-mono text-slate-400">E</span>

            {/* Rotating Qibla Arrow */}
            <div
              className="w-full h-full flex items-center justify-center transition-transform duration-700 ease-out"
              style={{ transform: `rotate(${qiblaAngle}deg)` }}
            >
              <div className="w-1.5 h-20 bg-gradient-to-t from-transparent via-emerald-500 to-emerald-600 rounded-full relative">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-emerald-600 rotate-45 rounded-xs"></div>
              </div>
            </div>

            <div className="absolute w-4 h-4 rounded-full bg-slate-800 dark:bg-white border-2 border-white dark:border-slate-800 shadow-xs"></div>
          </div>

          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-emerald-900 dark:text-emerald-200">
            <span className="text-xs font-semibold">Qibla Bearing:</span>
            <span className="text-sm font-extrabold font-mono">{qiblaAngle}°</span>
            <span className="text-xs text-slate-400 font-medium">from North</span>
          </div>
        </div>

        {/* Daily & Weekly Consistency */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                {t.prayer.weeklyCompletion}
              </h3>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-1 rounded-full font-mono">
              {todayCompletedCount}/5 Today
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400">
            Consistency in the five daily prayers brings peace of heart, structured time management, and focus in your Public Health studies.
          </p>

          <div className="space-y-3">
            {[
              { day: 'Monday (Today)', count: todayCompletedCount, total: 5 },
              { day: 'Sunday', count: 5, total: 5 },
              { day: 'Saturday', count: 5, total: 5 },
              { day: 'Friday (Jumu\'ah)', count: 5, total: 5 },
              { day: 'Thursday', count: 4, total: 5 },
            ].map((row, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <span>{row.day}</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">{row.count}/{row.total} ({Math.round((row.count / row.total) * 100)}%)</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-emerald-500 h-full rounded-full transition-all"
                    style={{ width: `${(row.count / row.total) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/80 dark:border-slate-700/60">
            <Info className="w-4 h-4 text-emerald-500 shrink-0" />
            <span>
              Prayer times are calculated locally using astronomical solar geometry and high precision algorithms.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

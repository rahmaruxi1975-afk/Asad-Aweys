import React from 'react';
import {
  Moon,
  Clock,
  Bell,
  BellOff,
  CheckCircle2,
  Sparkles,
  Volume2,
  VolumeX,
  ShieldAlert,
  Sun,
  Bed,
} from 'lucide-react';
import { SleepRoutineData, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { playChimeSound, sendNotification } from '../utils/storage';

interface SleepSectionProps {
  sleepRoutine: SleepRoutineData;
  language: Language;
  onUpdateSleepRoutine: (updated: SleepRoutineData) => void;
  onToggleSleepStep: (stepId: string) => void;
}

export const SleepSection: React.FC<SleepSectionProps> = ({
  sleepRoutine,
  language,
  onUpdateSleepRoutine,
  onToggleSleepStep,
}) => {
  const t = TRANSLATIONS[language];
  const completedCount = sleepRoutine.checklist.filter((s) => s.completed).length;

  const handleToggleReminder = async () => {
    const nextState = !sleepRoutine.remindersEnabled;
    if (nextState && typeof Notification !== 'undefined') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        sendNotification(
          'Bedtime Wind-Down Scheduled for 21:00',
          'At 9:00 PM, you will receive your 30-minute reminder to start your evening wind-down routine for a 9:30 PM bedtime.'
        );
      }
    }
    onUpdateSleepRoutine({ ...sleepRoutine, remindersEnabled: nextState });
  };

  const handleToggleSound = () => {
    const next = !sleepRoutine.soundEnabled;
    if (next) playChimeSound('bedtime');
    onUpdateSleepRoutine({ ...sleepRoutine, soundEnabled: next });
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-indigo-950 via-slate-900 to-sky-950 rounded-2xl p-6 sm:p-8 text-white border border-indigo-900/50 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 border border-indigo-400/30 text-indigo-300 text-xs font-semibold">
            <Moon className="w-3.5 h-3.5" />
            <span>Target Bedtime: 9:30 PM (21:30)</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.sleep.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.sleep.subtitle}
          </p>
        </div>

        {/* Big Wind-Down Alert Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[240px] text-center space-y-2">
          <span className="text-xs uppercase font-bold text-indigo-300 tracking-wider">
            Evening Wind-Down Alert
          </span>
          <h3 className="text-3xl font-black font-mono text-white">
            21:00 PM
          </h3>
          <p className="text-xs text-indigo-200">
            30 Minutes Before 21:30 Bedtime
          </p>
          <div className="pt-1">
            <span className="inline-block px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 text-xs font-mono font-bold">
              {completedCount}/5 Steps Done
            </span>
          </div>
        </div>
      </div>

      {/* Routine Controls & Settings */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Bed className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                Bedtime: {sleepRoutine.targetBedtime}
              </p>
              <p className="text-[11px] text-slate-500">
                Wake-up: {sleepRoutine.wakeUpTarget} for Fajr (7.5 hrs sleep)
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleToggleReminder}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border transition-all ${
              sleepRoutine.remindersEnabled
                ? 'bg-indigo-600 text-white border-indigo-600 shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border-slate-300 dark:border-slate-700'
            }`}
          >
            {sleepRoutine.remindersEnabled ? <Bell className="w-4 h-4" /> : <BellOff className="w-4 h-4" />}
            {sleepRoutine.remindersEnabled ? '21:00 Alert Active' : 'Alerts Disabled'}
          </button>

          <button
            onClick={handleToggleSound}
            className={`p-2 rounded-xl text-xs font-bold border transition-all ${
              sleepRoutine.soundEnabled
                ? 'bg-indigo-50 text-indigo-700 border-indigo-200 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800'
                : 'bg-slate-100 text-slate-400 border-slate-300 dark:bg-slate-800 dark:border-slate-700'
            }`}
            title="Toggle soothing bedtime chime"
          >
            {sleepRoutine.soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* The 5-Step Bedtime Routine Checklist */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
              {t.sleep.routineSteps}
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Follow these disciplined 5 habits every evening at 9:00 PM to maximize cognitive retention and wake up refreshed.
            </p>
          </div>
          <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300">
            {completedCount} of 5 Completed
          </span>
        </div>

        <div className="space-y-3">
          {sleepRoutine.checklist.map((step, idx) => (
            <div
              key={step.id}
              onClick={() => {
                onToggleSleepStep(step.id);
                playChimeSound('bedtime');
              }}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                step.completed
                  ? 'bg-indigo-50/70 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-900/60 text-indigo-950 dark:text-indigo-200'
                  : 'bg-slate-50 border-slate-200/90 dark:bg-slate-800/40 dark:border-slate-800 text-slate-800 dark:text-slate-200 hover:border-indigo-400'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center border font-mono text-xs font-bold ${
                    step.completed
                      ? 'bg-indigo-600 border-indigo-600 text-white'
                      : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 text-slate-600'
                  }`}
                >
                  {step.completed ? <CheckCircle2 className="w-4 h-4" /> : idx + 1}
                </div>
                <div>
                  <p className={`text-sm font-bold ${step.completed ? 'line-through opacity-80' : ''}`}>
                    {step.text}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    {idx === 0 && 'Maintains oral health and prepares body for sleep.'}
                    {idx === 1 && 'Ensures a calm, organized morning with zero stress.'}
                    {idx === 2 && 'Wudu and spiritual cleanliness bring peaceful rest.'}
                    {idx === 3 && 'Blocks blue light from disrupting melatonin release.'}
                    {idx === 4 && 'Sunnah adhkar and Surah Al-Mulk/Ayat al-Kursi.'}
                  </p>
                </div>
              </div>

              <span
                className={`text-xs px-2.5 py-1 rounded-full font-semibold ${
                  step.completed
                    ? 'bg-indigo-200/60 text-indigo-900 dark:bg-indigo-900 dark:text-indigo-200'
                    : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                }`}
              >
                {step.completed ? 'Done' : 'Pending'}
              </span>
            </div>
          ))}
        </div>

        {/* Good night encouragement card */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-50 to-sky-50 dark:from-indigo-950/30 dark:to-slate-800/40 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-indigo-500 shrink-0" />
          <p className="text-xs text-indigo-950 dark:text-indigo-200 font-medium">
            {t.sleep.goodNightMessage}
          </p>
        </div>
      </div>
    </div>
  );
};

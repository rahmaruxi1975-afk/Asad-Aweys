import React, { useRef, useState } from 'react';
import {
  Settings,
  Moon,
  Sun,
  Globe,
  Bell,
  Download,
  Upload,
  RotateCcw,
  ShieldAlert,
  CheckCircle2,
  Clock,
  Sparkles,
  Bed,
} from 'lucide-react';
import { AppState } from '../utils/storage';
import { Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { playChimeSound } from '../utils/storage';

interface SettingsSectionProps {
  appState: AppState;
  onUpdateState: (newState: AppState) => void;
  onResetToDefaults: () => void;
}

export const SettingsSection: React.FC<SettingsSectionProps> = ({
  appState,
  onUpdateState,
  onResetToDefaults,
}) => {
  const t = TRANSLATIONS[appState.language];
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [resetConfirmOpen, setResetConfirmOpen] = useState(false);
  const [exportMessage, setExportMessage] = useState(false);

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `asad_aweys_student_dashboard_backup_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    playChimeSound('complete');
    setExportMessage(true);
    setTimeout(() => setExportMessage(false), 3000);
  };

  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        try {
          const parsed = JSON.parse(event.target?.result as string);
          if (parsed && parsed.profile && parsed.subjects) {
            onUpdateState({ ...appState, ...parsed });
            playChimeSound('complete');
            alert('Successfully restored your dashboard backup!');
          } else {
            alert('Invalid backup file format.');
          }
        } catch (err) {
          alert('Failed to parse backup JSON file.');
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
            <Settings className="w-3.5 h-3.5" />
            <span>Preferences & Customization</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mt-1">
            Dashboard Settings
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Configure appearance, language, reminder alarms, and data backup for Asad Aweys.
          </p>
        </div>
      </div>

      {/* 1. Theme and Interface Language */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          Appearance & Language
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Light / Dark Mode */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                {appState.darkMode ? <Moon className="w-5 h-5 text-amber-400" /> : <Sun className="w-5 h-5 text-slate-700" />}
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Theme Mode</p>
                <p className="text-[11px] text-slate-500">
                  {appState.darkMode ? 'Dark Mode active' : 'Light Mode active'}
                </p>
              </div>
            </div>

            <button
              onClick={() => onUpdateState({ ...appState, darkMode: !appState.darkMode })}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all ${
                appState.darkMode
                  ? 'bg-amber-500 text-slate-950 font-bold'
                  : 'bg-slate-900 text-white font-bold'
              }`}
            >
              {appState.darkMode ? 'Light Mode' : 'Dark Mode'}
            </button>
          </div>

          {/* Interface Language */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-teal-50 dark:bg-teal-950/60 text-teal-600 dark:text-teal-400">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Language</p>
                <p className="text-[11px] text-slate-500">
                  English, Somali, Arabic
                </p>
              </div>
            </div>

            <select
              value={appState.language}
              onChange={(e) => onUpdateState({ ...appState, language: e.target.value as Language })}
              className="text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-1.5"
            >
              <option value="en">English (EN)</option>
              <option value="so">Af-Soomaali (SO)</option>
              <option value="ar">العربية (AR)</option>
            </select>
          </div>
        </div>
      </div>

      {/* 2. Notification & Reminder Controls */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          Reminders & Scheduling
        </h3>

        <div className="space-y-3">
          {/* Prayer Reminders */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Prayer Reminders</p>
                <p className="text-[11px] text-slate-500">
                  Local astronomical alert before Fajr, Dhuhr, Asr, Maghrib, Isha
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                onUpdateState({
                  ...appState,
                  prayerData: {
                    ...appState.prayerData,
                    remindersEnabled: !appState.prayerData.remindersEnabled,
                  },
                })
              }
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                appState.prayerData.remindersEnabled
                  ? 'bg-emerald-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {appState.prayerData.remindersEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Bedtime 9:00 PM Wind-Down Alert */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Bed className="w-5 h-5 text-indigo-600" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">
                  Bedtime 21:00 Wind-Down Reminder
                </p>
                <p className="text-[11px] text-slate-500">
                  Alert 30 minutes before 21:30 PM target bedtime
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                onUpdateState({
                  ...appState,
                  sleepRoutine: {
                    ...appState.sleepRoutine,
                    remindersEnabled: !appState.sleepRoutine.remindersEnabled,
                  },
                })
              }
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                appState.sleepRoutine.remindersEnabled
                  ? 'bg-indigo-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {appState.sleepRoutine.remindersEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>

          {/* Quran Reading Daily Reminder */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <div>
                <p className="text-xs font-bold text-slate-900 dark:text-white">Quran Daily Goal Alert</p>
                <p className="text-[11px] text-slate-500">
                  Scheduled for {appState.quranState.reminderScheduleTime} daily
                </p>
              </div>
            </div>

            <button
              onClick={() =>
                onUpdateState({
                  ...appState,
                  quranState: {
                    ...appState.quranState,
                    remindersEnabled: !appState.quranState.remindersEnabled,
                  },
                })
              }
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold ${
                appState.quranState.remindersEnabled
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
              }`}
            >
              {appState.quranState.remindersEnabled ? 'Enabled' : 'Disabled'}
            </button>
          </div>
        </div>
      </div>

      {/* 3. Data Backup, Restore & Reset */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
          Data Management & Backup
        </h3>

        <p className="text-xs text-slate-500">
          Export your complete dashboard data (subjects, lecture notes, tasks, Quran bookmarks, study logs) to a local JSON file, or restore anytime.
        </p>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleExportJSON}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all"
          >
            <Download className="w-4 h-4" />
            Export Backup JSON
          </button>

          <button
            onClick={() => fileInputRef.current?.click()}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold border border-slate-300 dark:border-slate-700 transition-all"
          >
            <Upload className="w-4 h-4" />
            Restore from Backup File
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            onChange={handleImportJSON}
            className="hidden"
          />

          <button
            onClick={() => setResetConfirmOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/40 hover:bg-red-100 text-red-600 dark:text-red-400 text-xs font-bold border border-red-200 dark:border-red-900 transition-all ml-auto"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to Defaults
          </button>
        </div>

        {exportMessage && (
          <p className="text-xs text-emerald-600 font-bold flex items-center gap-1">
            <CheckCircle2 className="w-4 h-4" />
            Backup JSON downloaded to your computer!
          </p>
        )}
      </div>

      {/* Reset Confirmation Modal */}
      {resetConfirmOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex items-center gap-3 text-red-600">
              <ShieldAlert className="w-6 h-6 shrink-0" />
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                Reset All Settings & Subjects?
              </h3>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              This will reset all subjects, notes, Quran tracking, and preferences back to default values for Asad Aweys. We recommend exporting a JSON backup first.
            </p>

            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setResetConfirmOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onResetToDefaults();
                  setResetConfirmOpen(false);
                }}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold"
              >
                Confirm Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

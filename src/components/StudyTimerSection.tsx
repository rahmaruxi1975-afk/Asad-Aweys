import React, { useState, useEffect } from 'react';
import {
  Clock,
  Play,
  Pause,
  RotateCcw,
  Coffee,
  BookOpen,
  CheckCircle2,
  Calendar,
  Flame,
  Award,
} from 'lucide-react';
import { Subject, StudySessionLog, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { playChimeSound, sendNotification } from '../utils/storage';

interface StudyTimerSectionProps {
  subjects: Subject[];
  studyLogs: StudySessionLog[];
  language: Language;
  onAddStudyLog: (log: StudySessionLog) => void;
  targetDailyMinutes?: number;
}

export const StudyTimerSection: React.FC<StudyTimerSectionProps> = ({
  subjects,
  studyLogs,
  language,
  onAddStudyLog,
  targetDailyMinutes = 240,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedSubjectId, setSelectedSubjectId] = useState<string>(
    subjects[0]?.id || ''
  );
  const [mode, setMode] = useState<'pomodoro' | 'deep' | 'break' | 'custom'>('pomodoro');
  const [sessionNotes, setSessionNotes] = useState('');

  // Timer in seconds
  const [secondsLeft, setSecondsLeft] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [initialDurationSeconds, setInitialDurationSeconds] = useState(25 * 60);

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || subjects[0];

  useEffect(() => {
    let interval: any = null;
    if (isRunning && secondsLeft > 0) {
      interval = setInterval(() => {
        setSecondsLeft((prev) => prev - 1);
      }, 1000);
    } else if (secondsLeft === 0 && isRunning) {
      setIsRunning(false);
      playChimeSound('timer');

      // Log session if it was a study session
      if (mode !== 'break') {
        const durationMins = Math.round(initialDurationSeconds / 60);
        const newLog: StudySessionLog = {
          id: `log-${Date.now()}`,
          subjectId: selectedSubject.id,
          subjectName: selectedSubject.name,
          durationMinutes: durationMins,
          date: new Date().toISOString().split('T')[0],
          notes: sessionNotes || `${mode === 'pomodoro' ? 'Pomodoro' : 'Deep focus'} session completed.`,
        };
        onAddStudyLog(newLog);
        sendNotification(
          'Focus Session Completed!',
          `Well done Asad! Completed ${durationMins} minutes on ${selectedSubject.name}. Take a 5-minute break.`
        );
      } else {
        sendNotification('Break Finished', 'Time to return to your Public Health studies!');
      }
    }
    return () => clearInterval(interval);
  }, [isRunning, secondsLeft, initialDurationSeconds, mode, selectedSubject, sessionNotes, onAddStudyLog]);

  const handleSetMode = (newMode: 'pomodoro' | 'deep' | 'break' | 'custom', customMins = 30) => {
    setIsRunning(false);
    setMode(newMode);
    let totalSecs = 25 * 60;
    if (newMode === 'pomodoro') totalSecs = 25 * 60;
    else if (newMode === 'deep') totalSecs = 50 * 60;
    else if (newMode === 'break') totalSecs = 5 * 60;
    else if (newMode === 'custom') totalSecs = customMins * 60;

    setInitialDurationSeconds(totalSecs);
    setSecondsLeft(totalSecs);
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const todayMinutes = studyLogs
    .filter((l) => l.date === todayStr)
    .reduce((sum, l) => sum + l.durationMinutes, 0);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const progressFraction = Math.max(0, 1 - secondsLeft / (initialDurationSeconds || 1));

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-sky-950 rounded-2xl p-6 sm:p-8 text-white border border-teal-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
            <Clock className="w-3.5 h-3.5" />
            <span>Academic Productivity & Deep Work</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {t.study.title}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            {t.study.subtitle}
          </p>
        </div>

        {/* Daily Target Ring & Stats */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[240px] space-y-2">
          <div className="flex justify-between items-center text-xs font-bold text-teal-300">
            <span>{t.study.todayStudyTime}</span>
            <span className="font-mono bg-teal-500/30 px-2 py-0.5 rounded text-white">
              {Math.floor(todayMinutes / 60)}h {todayMinutes % 60}m / {Math.floor(targetDailyMinutes / 60)}h
            </span>
          </div>

          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-400 h-full rounded-full transition-all"
              style={{ width: `${Math.min(100, (todayMinutes / targetDailyMinutes) * 100)}%` }}
            ></div>
          </div>

          <p className="text-[11px] text-slate-300 flex justify-between">
            <span>Daily Goal ({targetDailyMinutes} min):</span>
            <span className="font-bold text-teal-300 font-mono">
              {Math.round((todayMinutes / targetDailyMinutes) * 100)}% Completed
            </span>
          </p>
        </div>
      </div>

      {/* Main Study Timer Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Timer & Subject Selector */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleSetMode('pomodoro')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'pomodoro'
                    ? 'bg-teal-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Pomodoro (25m)
              </button>
              <button
                onClick={() => handleSetMode('deep')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'deep'
                    ? 'bg-sky-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Deep Focus (50m)
              </button>
              <button
                onClick={() => handleSetMode('break')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                  mode === 'break'
                    ? 'bg-amber-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                }`}
              >
                Short Break (5m)
              </button>
            </div>

            {/* Subject Selector Dropdown */}
            <div className="w-full sm:w-auto">
              <select
                value={selectedSubjectId}
                onChange={(e) => setSelectedSubjectId(e.target.value)}
                className="w-full text-xs font-bold px-3 py-2 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-1 focus:ring-teal-500"
              >
                {subjects.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code}: {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Big Time Display */}
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-64 h-64 rounded-full border-12 border-slate-100 dark:border-slate-800 flex flex-col items-center justify-center shadow-inner">
              <div
                className="absolute inset-0 rounded-full border-12 border-teal-500 transition-all duration-1000"
                style={{
                  clipPath: `polygon(50% 50%, 50% 0%, ${progressFraction > 0.25 ? '100% 0%,' : ''} ${progressFraction > 0.5 ? '100% 100%,' : ''} ${progressFraction > 0.75 ? '0% 100%,' : ''} 0% 0%)`,
                }}
              ></div>

              <span className="text-6xl font-black font-mono tracking-tight text-slate-900 dark:text-white">
                {formatTime(secondsLeft)}
              </span>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 mt-2 text-center px-4 truncate max-w-[200px]">
                {selectedSubject?.name}
              </span>
              <span className="text-[10px] uppercase font-bold text-teal-600 dark:text-teal-400 mt-1">
                {isRunning ? 'Active Focus Session' : 'Ready to begin'}
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setIsRunning(!isRunning)}
              className={`w-full sm:w-auto px-8 py-3.5 rounded-2xl text-sm font-bold flex items-center justify-center gap-2 shadow-lg transition-all ${
                isRunning
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
              {isRunning ? 'Pause Session' : 'Start Focus Session'}
            </button>

            <button
              onClick={() => {
                setIsRunning(false);
                setSecondsLeft(initialDurationSeconds);
              }}
              className="p-3.5 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 transition-colors"
              title="Reset timer"
            >
              <RotateCcw className="w-5 h-5" />
            </button>
          </div>

          {/* Session Notes input */}
          <div>
            <label className="text-[10px] font-bold uppercase text-slate-400 block mb-1">
              Session Objective / Lecture Goal (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. Read Chapter 4 on Meat Inspection and Zoonotic Cysts"
              value={sessionNotes}
              onChange={(e) => setSessionNotes(e.target.value)}
              className="w-full px-4 py-2 text-xs rounded-xl border bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-1 focus:ring-teal-500 text-slate-800 dark:text-slate-200"
            />
          </div>
        </div>

        {/* Right Col: Study Session History Log */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="w-4 h-4 text-teal-600" />
              {t.study.studyHistory}
            </h3>
            <span className="text-xs font-mono font-bold text-teal-600">
              {studyLogs.length} Sessions
            </span>
          </div>

          <div className="flex-1 overflow-y-auto space-y-3 max-h-[420px] pr-1">
            {studyLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 space-y-1"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                    {log.subjectName}
                  </span>
                  <span className="text-[10px] font-bold font-mono px-2 py-0.5 rounded bg-teal-100 dark:bg-teal-950/60 text-teal-800 dark:text-teal-300">
                    {log.durationMinutes} min
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {log.notes}
                </p>
                <p className="text-[9px] text-slate-400 font-mono">
                  📅 {log.date}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
            <p className="text-xs text-slate-500">
              Every Pomodoro block contributes to your overall Public Health degree mastery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

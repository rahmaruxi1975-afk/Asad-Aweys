import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  BookOpen,
  CheckCircle2,
  BookMarked,
  Flame,
  Moon,
  Award,
  Calendar,
} from 'lucide-react';
import {
  Subject,
  StudySessionLog,
  PrayerTimesData,
  QuranState,
  SleepRoutineData,
  ExerciseItem,
  Language,
} from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface ProgressSectionProps {
  subjects: Subject[];
  studyLogs: StudySessionLog[];
  prayerData: PrayerTimesData;
  quranState: QuranState;
  sleepRoutine: SleepRoutineData;
  morningExercises: ExerciseItem[];
  eveningExercises: ExerciseItem[];
  language: Language;
}

export const ProgressSection: React.FC<ProgressSectionProps> = ({
  subjects,
  studyLogs,
  prayerData,
  quranState,
  sleepRoutine,
  morningExercises,
  eveningExercises,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const now = new Date();
  const todayStr = now.toISOString().split('T')[0];

  // Actual total study time
  const totalStudyMinutes = studyLogs.reduce((sum, l) => sum + l.durationMinutes, 0);
  const todayStudyMinutes = studyLogs
    .filter((l) => l.date === todayStr)
    .reduce((sum, l) => sum + l.durationMinutes, 0);

  // Group study logs by last 7 days
  const last7Days: { dateStr: string; label: string; minutes: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(d.getDate() - i);
    const dStr = d.toISOString().split('T')[0];
    const dayLabel = d.toLocaleDateString(undefined, { weekday: 'short' });
    const mins = studyLogs
      .filter((l) => l.date === dStr)
      .reduce((sum, l) => sum + l.durationMinutes, 0);
    last7Days.push({ dateStr: dStr, label: dayLabel, minutes: mins });
  }

  const maxDayMinutes = Math.max(120, ...last7Days.map((d) => d.minutes));

  // Assignment completion
  const allAssignments = subjects.flatMap((s) => s.assignments);
  const completedAssignments = allAssignments.filter(
    (a) => a.status === 'submitted' || a.status === 'graded'
  ).length;

  // Prayer streak / today completion
  const todayPrayers = Object.values(prayerData.todayChecklist).filter(Boolean).length;

  // Exercises
  const allExercises = [...morningExercises, ...eveningExercises];
  const completedExercises = allExercises.filter((e) => e.completed).length;

  // Sleep routine steps
  const completedSleep = sleepRoutine.checklist.filter((s) => s.completed).length;

  // Overall curriculum progress average
  const avgSubjectProgress = Math.round(
    subjects.reduce((sum, s) => sum + s.progress, 0) / (subjects.length || 1)
  );

  // Daily holistic balance score (out of 100)
  // Combines: Study target (25%), Prayers (25%), Quran (20%), Exercise (15%), Sleep (15%)
  const studyScore = Math.min(25, (todayStudyMinutes / 240) * 25);
  const prayerScore = (todayPrayers / 5) * 25;
  const quranScore = Math.min(20, (quranState.completedVersesToday / quranState.dailyGoalVerses) * 20);
  const exerciseScore = (completedExercises / (allExercises.length || 1)) * 15;
  const sleepScore = (completedSleep / 5) * 15;
  const overallBalanceScore = Math.round(studyScore + prayerScore + quranScore + exerciseScore + sleepScore);

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Verified Activity & Performance Reports</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Progress Reports & Student Analytics
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Data-driven tracking of study hours, subject revision milestones, prayer consistency, physical movement, and sleep discipline.
          </p>
        </div>

        {/* Daily Holistic Balance Gauge */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[240px] text-center space-y-2">
          <span className="text-xs uppercase font-bold text-teal-300 tracking-wider">
            Daily Routine Balance
          </span>
          <h3 className="text-4xl font-black font-mono text-white">
            {overallBalanceScore}%
          </h3>
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div
              className="bg-teal-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${overallBalanceScore}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-300">
            Based on Study, Prayer, Quran, Exercise & Sleep
          </p>
        </div>
      </div>

      {/* 4 Key Real KPI Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Study Hours */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Total Study Time
              </p>
              <h3 className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                {(totalStudyMinutes / 60).toFixed(1)} hrs
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {studyLogs.length} verified sessions logged
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
            <span>Today:</span>
            <span className="font-bold text-teal-600 font-mono">
              {Math.floor(todayStudyMinutes / 60)}h {todayStudyMinutes % 60}m
            </span>
          </div>
        </div>

        {/* Public Health Curriculum Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Subject Mastery
              </p>
              <h3 className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                {avgSubjectProgress}%
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Across 10 official subjects
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 dark:bg-sky-950/60 dark:text-sky-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
            <span>Coursework:</span>
            <span className="font-bold text-sky-600 font-mono">
              {completedAssignments}/{allAssignments.length} submitted
            </span>
          </div>
        </div>

        {/* Daily Prayers & Quran */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Islamic Worship
              </p>
              <h3 className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                {todayPrayers} / 5 Prayers
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                {quranState.completedVersesToday} / {quranState.dailyGoalVerses} Quran verses
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400 flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
            <span>Quran Goal:</span>
            <span className="font-bold text-emerald-600 font-mono">
              {Math.round((quranState.completedVersesToday / quranState.dailyGoalVerses) * 100)}%
            </span>
          </div>
        </div>

        {/* Wellness & Bedtime */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Wellness & Sleep
              </p>
              <h3 className="text-2xl font-black font-mono text-slate-900 dark:text-white mt-1">
                {completedExercises} Movements
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Bedtime wind-down: {completedSleep}/5 steps
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400 flex items-center justify-center">
              <Moon className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between text-xs text-slate-500">
            <span>Target Bedtime:</span>
            <span className="font-bold text-indigo-600 font-mono">21:30 PM</span>
          </div>
        </div>
      </div>

      {/* Visual Chart: 7-Day Study Hours Distribution */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-teal-600" />
              7-Day Study Time History (Minutes Logged)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Reflects actual Pomodoro and Deep Work sessions recorded by Asad Aweys.
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-teal-600">
            Target: 240m / day
          </span>
        </div>

        {/* Bar chart columns */}
        <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-44 pt-4 px-2">
          {last7Days.map((d, idx) => {
            const barHeightPct = Math.min(100, Math.max(8, (d.minutes / maxDayMinutes) * 100));
            const isToday = d.dateStr === todayStr;

            return (
              <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                <span className="text-[10px] font-mono font-bold text-slate-600 dark:text-slate-300 opacity-80">
                  {d.minutes}m
                </span>
                <div className="w-full max-w-[48px] bg-slate-100 dark:bg-slate-800 rounded-t-xl overflow-hidden h-32 flex items-end">
                  <div
                    className={`w-full rounded-t-xl transition-all duration-700 ${
                      isToday ? 'bg-teal-500' : 'bg-slate-300 dark:bg-slate-600 group-hover:bg-teal-400'
                    }`}
                    style={{ height: `${barHeightPct}%` }}
                  ></div>
                </div>
                <span className={`text-xs font-bold ${isToday ? 'text-teal-600 font-extrabold' : 'text-slate-500'}`}>
                  {d.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Subject by Subject Mastery Progress Bars */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Individual Subject Progress & Revision Coverage
        </h3>

        <div className="space-y-3">
          {subjects.map((sub) => (
            <div key={sub.id} className="space-y-1">
              <div className="flex justify-between items-center text-xs">
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {sub.code}: {sub.name}
                </span>
                <span className="font-mono font-bold text-teal-600 dark:text-teal-400">
                  {sub.progress}%
                </span>
              </div>
              <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${sub.progress}%`, backgroundColor: sub.color || '#0d9488' }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

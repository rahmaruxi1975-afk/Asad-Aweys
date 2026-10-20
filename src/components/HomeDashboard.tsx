import React from 'react';
import {
  BookOpen,
  Clock,
  BookMarked,
  Moon,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  AlertCircle,
  GraduationCap,
  Calendar,
  Flame,
  Bot,
  Play,
  TrendingUp,
} from 'lucide-react';
import {
  UserProfile,
  Subject,
  PrayerTimesData,
  QuranState,
  SleepRoutineData,
  ExerciseItem,
  MotivationQuote,
  Language,
  NavSection,
  CalendarEvent,
} from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { calculatePrayerTimes, getPrayerStatus } from '../utils/prayerCalculator';
import { playChimeSound } from '../utils/storage';

interface HomeDashboardProps {
  language: Language;
  profile: UserProfile;
  subjects: Subject[];
  prayerData: PrayerTimesData;
  quranState: QuranState;
  sleepRoutine: SleepRoutineData;
  morningExercises: ExerciseItem[];
  eveningExercises: ExerciseItem[];
  motivationQuote: MotivationQuote;
  calendarEvents: CalendarEvent[];
  onNavigate: (section: NavSection) => void;
  onTogglePrayerToday: (prayerKey: keyof PrayerTimesData['todayChecklist']) => void;
  onToggleSleepStep: (stepId: string) => void;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  language,
  profile,
  subjects,
  prayerData,
  quranState,
  sleepRoutine,
  morningExercises,
  eveningExercises,
  motivationQuote,
  calendarEvents,
  onNavigate,
  onTogglePrayerToday,
  onToggleSleepStep,
}) => {
  const t = TRANSLATIONS[language];
  const now = new Date();

  // Prayer Calculation
  const prayerTimes = calculatePrayerTimes(
    now,
    prayerData.latitude,
    prayerData.longitude,
    prayerData.calculationMethod
  );
  const prayerStatus = getPrayerStatus(prayerTimes, now);

  // Overall study progress
  const avgProgress = Math.round(
    subjects.reduce((sum, s) => sum + s.progress, 0) / (subjects.length || 1)
  );

  // Completed prayers today
  const completedPrayersCount = Object.values(prayerData.todayChecklist).filter(Boolean).length;

  // Completed sleep steps
  const completedSleepSteps = sleepRoutine.checklist.filter((s) => s.completed).length;

  // Upcoming deadlines (assignments & exams in next 14 days)
  const todayStr = now.toISOString().split('T')[0];
  const upcomingAssignments = subjects
    .flatMap((s) => s.assignments.map((a) => ({ ...a, subjectName: s.name, subjectColor: s.color })))
    .filter((a) => a.status !== 'graded' && a.status !== 'submitted')
    .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
    .slice(0, 3);

  const upcomingExams = subjects
    .flatMap((s) => s.exams.map((e) => ({ ...e, subjectName: s.name, subjectColor: s.color })))
    .filter((e) => !e.completed)
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 2);

  // Today's classes from calendar
  const todayEvents = calendarEvents.filter((e) => e.date === todayStr);

  return (
    <div className="space-y-6">
      {/* 1. Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-sky-950 to-teal-900 p-6 sm:p-8 text-white shadow-xl ring-1 ring-white/10">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold tracking-wide">
              <GraduationCap className="w-3.5 h-3.5" />
              <span>{profile.degree}</span>
              <span className="text-teal-400/60">•</span>
              <span>{profile.studentId}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
              {t.welcomeBack}
            </h2>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              {t.studentTag}
            </p>

            {/* Quick action chips */}
            <div className="flex flex-wrap items-center gap-2 pt-3">
              <button
                onClick={() => onNavigate('timetable')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/15 hover:bg-white/25 text-xs font-semibold text-white transition-all backdrop-blur-xs"
              >
                <Play className="w-3 h-3 text-teal-300" />
                Start Study Session
              </button>
              <button
                onClick={() => onNavigate('ai_mentor')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-teal-500/25 hover:bg-teal-500/35 border border-teal-400/30 text-xs font-semibold text-teal-200 transition-all"
              >
                <Bot className="w-3.5 h-3.5" />
                Ask AI Mentor
              </button>
              <button
                onClick={() => onNavigate('quran')}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/30 text-xs font-semibold text-amber-200 transition-all"
              >
                <BookMarked className="w-3.5 h-3.5" />
                Read Quran ({quranState.completedVersesToday}/{quranState.dailyGoalVerses})
              </button>
            </div>
          </div>

          {/* Quick Right Card: Target Bedtime Countdown */}
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/15 min-w-[220px] space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-300">
              <span className="flex items-center gap-1.5 text-indigo-300">
                <Moon className="w-4 h-4 text-indigo-400" />
                Target Bedtime
              </span>
              <span className="px-2 py-0.5 rounded bg-indigo-500/30 font-mono text-white text-xs">
                21:30
              </span>
            </div>
            <p className="text-xl font-extrabold text-white font-mono">
              Wind-down: 21:00
            </p>
            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-400 h-full rounded-full transition-all"
                style={{ width: `${(completedSleepSteps / 5) * 100}%` }}
              ></div>
            </div>
            <p className="text-[11px] text-slate-300 flex items-center justify-between">
              <span>Evening Checklist:</span>
              <span className="font-bold text-teal-300">{completedSleepSteps}/5 steps</span>
            </p>
          </div>
        </div>
      </div>

      {/* 2. Four Key Indicator Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Next Prayer */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t.prayer.nextPrayer}
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {prayerStatus.nextPrayer}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {prayerStatus.nextPrayerTime} ({prayerData.city})
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-600 dark:bg-emerald-950/50 dark:text-emerald-400 flex items-center justify-center">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="font-mono text-emerald-600 dark:text-emerald-400 font-bold">
              in {prayerStatus.countdown}
            </span>
            <button
              onClick={() => onNavigate('prayer')}
              className="text-teal-600 dark:text-teal-400 hover:underline font-semibold"
            >
              Checklist ({completedPrayersCount}/5) →
            </button>
          </div>
        </div>

        {/* Public Health Curriculum Progress */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Public Health Studies
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {avgProgress}% Mastery
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Across 10 active subjects
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/50 dark:text-teal-400 flex items-center justify-center">
              <BookOpen className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-teal-500 h-full rounded-full transition-all"
                style={{ width: `${avgProgress}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs mt-1.5">
              <span className="text-slate-500 dark:text-slate-400">10 Modules</span>
              <button
                onClick={() => onNavigate('subjects')}
                className="text-teal-600 dark:text-teal-400 hover:underline font-semibold"
              >
                View Subjects →
              </button>
            </div>
          </div>
        </div>

        {/* Holy Quran Daily Reading */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {t.quran.dailyGoal}
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {quranState.completedVersesToday} / {quranState.dailyGoalVerses}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Last: {quranState.lastReadSurahName} (Ayah {quranState.currentAyah})
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-amber-50 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400 flex items-center justify-center">
              <BookMarked className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
              <div
                className="bg-amber-500 h-full rounded-full transition-all"
                style={{ width: `${Math.min(100, (quranState.completedVersesToday / quranState.dailyGoalVerses) * 100)}%` }}
              ></div>
            </div>
            <div className="flex justify-between items-center text-xs mt-1.5">
              <span className="text-slate-500 dark:text-slate-400 font-mono">
                {Math.round((quranState.completedVersesToday / quranState.dailyGoalVerses) * 100)}% Done
              </span>
              <button
                onClick={() => onNavigate('quran')}
                className="text-amber-600 dark:text-amber-400 hover:underline font-semibold"
              >
                Continue Quran →
              </button>
            </div>
          </div>
        </div>

        {/* Physical Exercise & Mobility */}
        <div className="bg-white dark:bg-slate-900 rounded-xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                Daily Physical Activity
              </p>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mt-1">
                {morningExercises.filter((e) => e.completed).length +
                  eveningExercises.filter((e) => e.completed).length}{' '}
                / {morningExercises.length + eveningExercises.length} Done
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Morning mobility & evening stretch
              </p>
            </div>
            <div className="w-9 h-9 rounded-lg bg-orange-50 text-orange-600 dark:bg-orange-950/50 dark:text-orange-400 flex items-center justify-center">
              <Flame className="w-5 h-5" />
            </div>
          </div>
          <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
            <span className="text-orange-600 dark:text-orange-400 font-semibold">
              Posture & Spine
            </span>
            <button
              onClick={() => onNavigate('morning_exercise')}
              className="text-orange-600 dark:text-orange-400 hover:underline font-semibold"
            >
              Start Workout →
            </button>
          </div>
        </div>
      </div>

      {/* 3. Middle Grid: Academic Deadlines & Today's Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Academic Priorities & Deadlines */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming Exams & Assignments Widget */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <AlertCircle className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Upcoming Academic Deadlines & Examinations
                </h3>
              </div>
              <button
                onClick={() => onNavigate('tasks')}
                className="text-xs text-teal-600 dark:text-teal-400 hover:underline font-semibold"
              >
                All Tasks ({subjects.flatMap((s) => s.assignments).length}) →
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {/* Upcoming Exams */}
              {upcomingExams.map((exam) => (
                <div
                  key={exam.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-red-100 bg-red-50/50 dark:bg-red-950/20 dark:border-red-900/40"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 uppercase">
                        Exam ({exam.weight}%)
                      </span>
                      <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                        {exam.subjectName}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">
                      {exam.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      📅 {exam.date} at {exam.time} • {exam.location}
                    </p>
                  </div>
                  <button
                    onClick={() => onNavigate('subjects')}
                    className="text-xs px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-xs"
                  >
                    Review Topics
                  </button>
                </div>
              ))}

              {/* Upcoming Assignments */}
              {upcomingAssignments.map((asg) => (
                <div
                  key={asg.id}
                  className="flex items-center justify-between p-3 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-teal-500/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                        {asg.subjectName}
                      </span>
                      <span className="text-xs text-slate-400">• Weight: {asg.weight}%</span>
                    </div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">
                      {asg.title}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      Due: <span className="font-semibold text-slate-700 dark:text-slate-300">{asg.dueDate}</span>
                    </p>
                  </div>
                  <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300 dark:border-amber-900">
                    {asg.status.replace('_', ' ')}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Today's Classes & Timetable */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-teal-600 dark:text-teal-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-base">
                  Today's University Classes & Study Timetable
                </h3>
              </div>
              <button
                onClick={() => onNavigate('timetable')}
                className="text-xs text-teal-600 dark:text-teal-400 hover:underline font-semibold"
              >
                Weekly Timetable →
              </button>
            </div>

            <div className="mt-4 space-y-2.5">
              {todayEvents.length > 0 ? (
                todayEvents.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/80 dark:border-slate-700/60"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-2.5 h-10 rounded-full bg-teal-500"></div>
                      <div>
                        <p className="text-sm font-bold text-slate-900 dark:text-white">
                          {evt.title}
                        </p>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {evt.startTime} – {evt.endTime} {evt.notes && `• ${evt.notes}`}
                        </p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-1 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-200 font-mono">
                      {evt.type}
                    </span>
                  </div>
                ))
              ) : (
                <div className="text-center py-6 text-slate-400 text-xs">
                  No classes scheduled for today. Great time for independent Public Health research!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right 1 Col: Islamic Prayer Check & Bedtime 5-Step Routine */}
        <div className="space-y-6">
          {/* Daily 5 Prayers Checklist Card */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  {t.prayer.prayerTrackerToday}
                </h3>
              </div>
              <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                {completedPrayersCount}/5
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {[
                { key: 'fajr' as const, label: t.prayer.fajr, time: prayerTimes.fajr },
                { key: 'dhuhr' as const, label: t.prayer.dhuhr, time: prayerTimes.dhuhr },
                { key: 'asr' as const, label: t.prayer.asr, time: prayerTimes.asr },
                { key: 'maghrib' as const, label: t.prayer.maghrib, time: prayerTimes.maghrib },
                { key: 'isha' as const, label: t.prayer.isha, time: prayerTimes.isha },
              ].map((p) => {
                const isDone = prayerData.todayChecklist[p.key];
                return (
                  <button
                    key={p.key}
                    onClick={() => {
                      onTogglePrayerToday(p.key);
                      playChimeSound('complete');
                    }}
                    className={`w-full flex items-center justify-between p-2.5 rounded-lg border text-xs transition-all ${
                      isDone
                        ? 'bg-emerald-50/80 border-emerald-200 dark:bg-emerald-950/30 dark:border-emerald-800/60 text-emerald-900 dark:text-emerald-200'
                        : 'bg-slate-50 border-slate-200/80 dark:bg-slate-800/40 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                          isDone
                            ? 'bg-emerald-600 border-emerald-600 text-white'
                            : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                        }`}
                      >
                        {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-semibold">{p.label}</span>
                    </div>
                    <span className="font-mono text-slate-500 dark:text-slate-400">
                      {p.time}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Bedtime Wind-Down 5-Step Checklist */}
          <div className="bg-white dark:bg-slate-900 rounded-xl p-5 border border-indigo-100 dark:border-indigo-950/60 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-indigo-50 dark:border-indigo-950/60">
              <div className="flex items-center gap-2 text-indigo-950 dark:text-indigo-200">
                <Moon className="w-4 h-4 text-indigo-500" />
                <h3 className="font-bold text-sm">
                  Bedtime 21:30 Wind-Down
                </h3>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-300">
                Alert: 21:00
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {sleepRoutine.checklist.map((step, idx) => (
                <button
                  key={step.id}
                  onClick={() => {
                    onToggleSleepStep(step.id);
                    playChimeSound('bedtime');
                  }}
                  className={`w-full text-left flex items-start gap-2.5 p-2 rounded-lg border text-xs transition-all ${
                    step.completed
                      ? 'bg-indigo-50/70 border-indigo-200 dark:bg-indigo-950/30 dark:border-indigo-800/50 text-indigo-900 dark:text-indigo-200'
                      : 'bg-slate-50 border-slate-200/80 dark:bg-slate-800/40 dark:border-slate-700/60 text-slate-700 dark:text-slate-300 hover:border-indigo-300'
                  }`}
                >
                  <div
                    className={`mt-0.5 w-4 h-4 rounded flex items-center justify-center shrink-0 border ${
                      step.completed
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700'
                    }`}
                  >
                    {step.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                  </div>
                  <span className={`${step.completed ? 'line-through opacity-80' : 'font-medium'}`}>
                    {idx + 1}. {step.text}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-indigo-50 dark:border-indigo-950/60 text-[11px] text-indigo-600 dark:text-indigo-400 flex justify-between items-center">
              <span>Goal: 7.5 hrs sleep before Fajr</span>
              <button
                onClick={() => onNavigate('sleep')}
                className="font-bold hover:underline"
              >
                Routine Details →
              </button>
            </div>
          </div>

          {/* Daily Motivation Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-slate-900 dark:to-amber-950/20 rounded-xl p-5 border border-amber-200/80 dark:border-amber-900/40 space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-amber-800 dark:text-amber-300">
              <span className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-500" />
                Daily Motivation & Wisdom
              </span>
              <span className="text-[10px] uppercase tracking-wider font-semibold">
                {motivationQuote.theme.replace('_', ' ')}
              </span>
            </div>

            <p className="text-sm italic text-slate-800 dark:text-slate-200 font-serif leading-relaxed">
              "{language === 'so' ? motivationQuote.textSo : language === 'ar' ? motivationQuote.textAr : motivationQuote.textEn}"
            </p>

            <div className="flex items-center justify-between pt-2 border-t border-amber-200/60 dark:border-amber-900/40 text-xs">
              <span className="font-semibold text-slate-600 dark:text-slate-400">
                — {motivationQuote.author}
              </span>
              <button
                onClick={() => onNavigate('motivation')}
                className="text-amber-700 dark:text-amber-400 font-bold hover:underline"
              >
                More Quotes →
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

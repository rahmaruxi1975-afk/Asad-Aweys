import React, { useState, useEffect } from 'react';
import {
  NavSection,
  Language,
  Subject,
  PrayerTimesData,
  QuranState,
  ExerciseItem,
  SleepRoutineData,
  StudySessionLog,
  MotivationQuote,
  CalendarEvent,
  UserProfile,
} from './types';
import {
  loadAppState,
  saveAppState,
  DEFAULT_STATE,
  AppState,
  playChimeSound,
  sendNotification,
} from './utils/storage';
import { calculatePrayerTimes } from './utils/prayerCalculator';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { HomeDashboard } from './components/HomeDashboard';
import { ProfileSection } from './components/ProfileSection';
import { SubjectsSection } from './components/SubjectsSection';
import { TimetableSection } from './components/TimetableSection';
import { NotesSection } from './components/NotesSection';
import { CalendarSection } from './components/CalendarSection';
import { TasksSection } from './components/TasksSection';
import { PrayerSection } from './components/PrayerSection';
import { QuranSection } from './components/QuranSection';
import { ExerciseSection } from './components/ExerciseSection';
import { AiMentorSection } from './components/AiMentorSection';
import { MotivationSection } from './components/MotivationSection';
import { SleepSection } from './components/SleepSection';
import { ProgressSection } from './components/ProgressSection';
import { SettingsSection } from './components/SettingsSection';
import { StudyTimerSection } from './components/StudyTimerSection';

export default function App() {
  const [appState, setAppState] = useState<AppState>(() => loadAppState());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [studySubjectTargetId, setStudySubjectTargetId] = useState<string | null>(null);

  // Sync state to LocalStorage
  useEffect(() => {
    saveAppState(appState);
  }, [appState]);

  // Dark Mode effect
  useEffect(() => {
    if (appState.darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appState.darkMode]);

  // RTL support effect for Arabic
  useEffect(() => {
    if (appState.language === 'ar') {
      document.documentElement.setAttribute('dir', 'rtl');
      document.documentElement.setAttribute('lang', 'ar');
    } else {
      document.documentElement.setAttribute('dir', 'ltr');
      document.documentElement.setAttribute('lang', appState.language);
    }
  }, [appState.language]);

  // Background reminder scheduler (Bedtime 21:00 wind-down & Prayer times)
  useEffect(() => {
    const checkSchedule = () => {
      const now = new Date();
      const currentHours = now.getHours();
      const currentMinutes = now.getMinutes();
      const timeStr = `${currentHours.toString().padStart(2, '0')}:${currentMinutes.toString().padStart(2, '0')}`;

      // Check 21:00 Bedtime Wind-Down Reminder (30 min before 21:30)
      if (
        appState.sleepRoutine.remindersEnabled &&
        timeStr === appState.sleepRoutine.reminderTime &&
        now.getSeconds() < 10
      ) {
        if (appState.sleepRoutine.soundEnabled) playChimeSound('bedtime');
        sendNotification(
          'Evening Wind-Down Reminder (21:00 PM)',
          'Asad, it is 9:00 PM! Time for your 5-step evening wind-down routine to ensure restful sleep by 9:30 PM.'
        );
      }

      // Check Quran Reminder
      if (
        appState.quranState.remindersEnabled &&
        timeStr === appState.quranState.reminderScheduleTime &&
        now.getSeconds() < 10
      ) {
        playChimeSound('complete');
        sendNotification(
          'Holy Quran Reading Reminder',
          `Time for your daily Quran reading goal (${appState.quranState.completedVersesToday}/${appState.quranState.dailyGoalVerses} verses).`
        );
      }
    };

    const interval = setInterval(checkSchedule, 20000);
    return () => clearInterval(interval);
  }, [appState.sleepRoutine, appState.quranState]);

  // Actions
  const handleSelectSection = (section: NavSection) => {
    setAppState((prev) => ({ ...prev, activeSection: section }));
  };

  const handleLanguageChange = (lang: Language) => {
    setAppState((prev) => ({ ...prev, language: lang }));
  };

  const handleToggleDarkMode = () => {
    setAppState((prev) => ({ ...prev, darkMode: !prev.darkMode }));
  };

  const handleUpdateProfile = (profile: UserProfile) => {
    setAppState((prev) => ({ ...prev, profile }));
  };

  const handleUpdateSubjects = (subjects: Subject[]) => {
    setAppState((prev) => ({ ...prev, subjects }));
  };

  const handleUpdatePrayerData = (prayerData: PrayerTimesData) => {
    setAppState((prev) => ({ ...prev, prayerData }));
  };

  const handleTogglePrayerToday = (prayerKey: keyof PrayerTimesData['todayChecklist']) => {
    setAppState((prev) => {
      const currentVal = prev.prayerData.todayChecklist[prayerKey];
      const todayStr = new Date().toISOString().split('T')[0];
      const updatedChecklist = {
        ...prev.prayerData.todayChecklist,
        [prayerKey]: !currentVal,
      };
      return {
        ...prev,
        prayerData: {
          ...prev.prayerData,
          todayChecklist: updatedChecklist,
          weeklyHistory: {
            ...prev.prayerData.weeklyHistory,
            [todayStr]: updatedChecklist,
          },
        },
      };
    });
  };

  const handleUpdateQuranState = (quranState: QuranState) => {
    setAppState((prev) => ({ ...prev, quranState }));
  };

  const handleUpdateExercises = (type: 'morning' | 'evening', items: ExerciseItem[]) => {
    if (type === 'morning') {
      setAppState((prev) => ({ ...prev, morningExercises: items }));
    } else {
      setAppState((prev) => ({ ...prev, eveningExercises: items }));
    }
  };

  const handleUpdateSleepRoutine = (sleepRoutine: SleepRoutineData) => {
    setAppState((prev) => ({ ...prev, sleepRoutine }));
  };

  const handleToggleSleepStep = (stepId: string) => {
    setAppState((prev) => ({
      ...prev,
      sleepRoutine: {
        ...prev.sleepRoutine,
        checklist: prev.sleepRoutine.checklist.map((s) =>
          s.id === stepId ? { ...s, completed: !s.completed } : s
        ),
      },
    }));
  };

  const handleAddStudyLog = (log: StudySessionLog) => {
    setAppState((prev) => ({
      ...prev,
      studyLogs: [log, ...prev.studyLogs],
    }));
  };

  const handleUpdateQuotes = (quotes: MotivationQuote[]) => {
    setAppState((prev) => ({ ...prev, motivationQuotes: quotes }));
  };

  const handleUpdateEvents = (calendarEvents: CalendarEvent[]) => {
    setAppState((prev) => ({ ...prev, calendarEvents }));
  };

  const handleResetToDefaults = () => {
    setAppState(DEFAULT_STATE);
    playChimeSound('complete');
  };

  const handleOpenStudyTimerForSubject = (subjectId: string) => {
    setStudySubjectTargetId(subjectId);
    setAppState((prev) => ({ ...prev, activeSection: 'timetable' }));
  };

  // Active Motivation quote for dashboard
  const activeMotivationQuote =
    appState.motivationQuotes.find((q) => q.isFavorite) || appState.motivationQuotes[0];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex transition-colors font-sans">
      {/* Sidebar Navigation */}
      <Sidebar
        activeSection={appState.activeSection as NavSection}
        onSelectSection={handleSelectSection}
        language={appState.language}
        profile={appState.profile}
        isOpenMobile={mobileNavOpen}
        onCloseMobile={() => setMobileNavOpen(false)}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">
        {/* Top Navbar Header */}
        <Header
          language={appState.language}
          onLanguageChange={handleLanguageChange}
          darkMode={appState.darkMode}
          onToggleDarkMode={handleToggleDarkMode}
          profile={appState.profile}
          prayerData={appState.prayerData}
          sleepRoutine={appState.sleepRoutine}
          onOpenMobileNav={() => setMobileNavOpen(true)}
        />

        {/* Dynamic Section Container */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {appState.activeSection === 'home' && (
            <HomeDashboard
              language={appState.language}
              profile={appState.profile}
              subjects={appState.subjects}
              prayerData={appState.prayerData}
              quranState={appState.quranState}
              sleepRoutine={appState.sleepRoutine}
              morningExercises={appState.morningExercises}
              eveningExercises={appState.eveningExercises}
              motivationQuote={activeMotivationQuote}
              calendarEvents={appState.calendarEvents}
              onNavigate={handleSelectSection}
              onTogglePrayerToday={handleTogglePrayerToday}
              onToggleSleepStep={handleToggleSleepStep}
            />
          )}

          {appState.activeSection === 'profile' && (
            <ProfileSection
              profile={appState.profile}
              language={appState.language}
              onUpdateProfile={handleUpdateProfile}
            />
          )}

          {appState.activeSection === 'subjects' && (
            <SubjectsSection
              subjects={appState.subjects}
              language={appState.language}
              onUpdateSubjects={handleUpdateSubjects}
              onOpenStudyTimerForSubject={handleOpenStudyTimerForSubject}
            />
          )}

          {appState.activeSection === 'timetable' && (
            <div className="space-y-8">
              <StudyTimerSection
                subjects={appState.subjects}
                studyLogs={appState.studyLogs}
                language={appState.language}
                onAddStudyLog={handleAddStudyLog}
                targetDailyMinutes={appState.profile.targetDailyStudyMinutes}
              />
              <TimetableSection
                subjects={appState.subjects}
                language={appState.language}
              />
            </div>
          )}

          {appState.activeSection === 'notes' && (
            <NotesSection
              subjects={appState.subjects}
              language={appState.language}
              onUpdateSubjects={handleUpdateSubjects}
            />
          )}

          {appState.activeSection === 'calendar' && (
            <CalendarSection
              events={appState.calendarEvents}
              subjects={appState.subjects}
              language={appState.language}
              onUpdateEvents={handleUpdateEvents}
            />
          )}

          {appState.activeSection === 'tasks' && (
            <TasksSection
              subjects={appState.subjects}
              language={appState.language}
            />
          )}

          {appState.activeSection === 'prayer' && (
            <PrayerSection
              prayerData={appState.prayerData}
              language={appState.language}
              onUpdatePrayerData={handleUpdatePrayerData}
              onTogglePrayerToday={handleTogglePrayerToday}
            />
          )}

          {appState.activeSection === 'quran' && (
            <QuranSection
              quranState={appState.quranState}
              language={appState.language}
              onUpdateQuranState={handleUpdateQuranState}
            />
          )}

          {appState.activeSection === 'morning_exercise' && (
            <ExerciseSection
              morningExercises={appState.morningExercises}
              eveningExercises={appState.eveningExercises}
              language={appState.language}
              onUpdateExercises={handleUpdateExercises}
            />
          )}

          {appState.activeSection === 'evening_exercise' && (
            <ExerciseSection
              morningExercises={appState.morningExercises}
              eveningExercises={appState.eveningExercises}
              language={appState.language}
              onUpdateExercises={handleUpdateExercises}
            />
          )}

          {appState.activeSection === 'ai_mentor' && (
            <AiMentorSection
              subjects={appState.subjects}
              language={appState.language}
              profile={appState.profile}
            />
          )}

          {appState.activeSection === 'motivation' && (
            <MotivationSection
              quotes={appState.motivationQuotes}
              language={appState.language}
              onUpdateQuotes={handleUpdateQuotes}
            />
          )}

          {appState.activeSection === 'sleep' && (
            <SleepSection
              sleepRoutine={appState.sleepRoutine}
              language={appState.language}
              onUpdateSleepRoutine={handleUpdateSleepRoutine}
              onToggleSleepStep={handleToggleSleepStep}
            />
          )}

          {appState.activeSection === 'progress' && (
            <ProgressSection
              subjects={appState.subjects}
              studyLogs={appState.studyLogs}
              prayerData={appState.prayerData}
              quranState={appState.quranState}
              sleepRoutine={appState.sleepRoutine}
              morningExercises={appState.morningExercises}
              eveningExercises={appState.eveningExercises}
              language={appState.language}
            />
          )}

          {appState.activeSection === 'settings' && (
            <SettingsSection
              appState={appState}
              onUpdateState={setAppState}
              onResetToDefaults={handleResetToDefaults}
            />
          )}
        </main>
      </div>
    </div>
  );
}

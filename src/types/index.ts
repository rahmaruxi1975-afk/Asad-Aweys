export type Language = 'en' | 'so' | 'ar';

export type NavSection =
  | 'home'
  | 'profile'
  | 'subjects'
  | 'timetable'
  | 'notes'
  | 'calendar'
  | 'tasks'
  | 'prayer'
  | 'quran'
  | 'morning_exercise'
  | 'evening_exercise'
  | 'ai_mentor'
  | 'motivation'
  | 'sleep'
  | 'progress'
  | 'settings';

export interface Subject {
  id: string;
  name: string;
  nameSo?: string;
  nameAr?: string;
  code: string;
  icon: string;
  color: string;
  progress: number;
  description: string;
  notes: SubjectNote[];
  assignments: Assignment[];
  exams: Exam[];
  learningGoals: LearningGoal[];
  reviewSchedule: ReviewScheduleItem[];
  resourceLinks: ResourceLink[];
}

export interface SubjectNote {
  id: string;
  title: string;
  lectureNumber?: string;
  date: string;
  summary: string;
  content: string;
  tags: string[];
}

export interface Assignment {
  id: string;
  subjectId: string;
  title: string;
  dueDate: string;
  status: 'not_started' | 'in_progress' | 'submitted' | 'graded';
  grade?: string;
  weight: number; // e.g. 20%
  instructions?: string;
}

export interface Exam {
  id: string;
  subjectId: string;
  title: string;
  date: string;
  time: string;
  location?: string;
  weight: number; // e.g. 40%
  topics: string[];
  completed: boolean;
}

export interface LearningGoal {
  id: string;
  text: string;
  completed: boolean;
  targetDate?: string;
}

export interface ReviewScheduleItem {
  id: string;
  topic: string;
  nextReviewDate: string;
  status: 'pending' | 'completed';
  intervalDays: number;
}

export interface ResourceLink {
  id: string;
  title: string;
  url: string;
  type: 'slides' | 'textbook' | 'paper' | 'guideline' | 'other';
}

export interface PrayerTimesData {
  city: string;
  country: string;
  latitude: number;
  longitude: number;
  calculationMethod: string;
  remindersEnabled: boolean;
  soundAlertEnabled: boolean;
  alertMinutesBefore: number;
  todayChecklist: {
    fajr: boolean;
    dhuhr: boolean;
    asr: boolean;
    maghrib: boolean;
    isha: boolean;
  };
  weeklyHistory: Record<string, { [prayer: string]: boolean }>;
}

export interface QuranState {
  currentSurah: number;
  currentAyah: number;
  lastReadSurahName: string;
  lastReadDate: string;
  dailyGoalVerses: number;
  completedVersesToday: number;
  remindersEnabled: boolean;
  reminderScheduleTime: string; // e.g. "05:30" or "18:45"
  translationPreference: 'both' | 'so' | 'en' | 'none';
  bookmarks: {
    id: string;
    surahNumber: number;
    surahName: string;
    ayahNumber: number;
    note?: string;
    savedAt: string;
  }[];
}

export interface ExerciseItem {
  id: string;
  title: string;
  category: 'morning' | 'evening';
  durationMinutes: number;
  description: string;
  icon: string;
  completed: boolean;
}

export interface SleepRoutineData {
  targetBedtime: string; // "21:30"
  reminderTime: string; // "21:00"
  wakeUpTarget: string; // "05:00"
  remindersEnabled: boolean;
  soundEnabled: boolean;
  checklist: {
    id: string;
    text: string;
    completed: boolean;
  }[];
  history: Record<string, boolean>; // 'YYYY-MM-DD': boolean
}

export interface StudySessionLog {
  id: string;
  subjectId: string;
  subjectName: string;
  durationMinutes: number;
  date: string; // ISO date YYYY-MM-DD
  notes?: string;
}

export interface MotivationQuote {
  id: string;
  textEn: string;
  textAr: string;
  textSo: string;
  author: string;
  theme: 'discipline' | 'patience' | 'knowledge' | 'time' | 'faith' | 'public_health';
  isFavorite: boolean;
  isCustom?: boolean;
}

export interface CalendarEvent {
  id: string;
  title: string;
  type: 'lecture' | 'exam' | 'assignment' | 'quran' | 'prayer' | 'exercise' | 'study' | 'personal' | 'bedtime';
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  subjectId?: string;
  notes?: string;
}

export interface UserProfile {
  name: string;
  title: string;
  degree: string;
  university: string;
  studentId: string;
  email: string;
  bio: string;
  avatarUrl: string;
  targetDailyStudyMinutes: number;
}

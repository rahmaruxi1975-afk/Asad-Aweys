import {
  UserProfile,
  Subject,
  PrayerTimesData,
  QuranState,
  ExerciseItem,
  SleepRoutineData,
  StudySessionLog,
  MotivationQuote,
  CalendarEvent,
  Language,
} from '../types';
import {
  INITIAL_USER_PROFILE,
  INITIAL_SUBJECTS,
  INITIAL_MORNING_EXERCISES,
  INITIAL_EVENING_EXERCISES,
  INITIAL_SLEEP_ROUTINE,
  INITIAL_CALENDAR_EVENTS,
} from './initialData';
import { INITIAL_MOTIVATION_QUOTES } from './motivationData';

const STORAGE_KEY = 'asad_aweys_dashboard_v1';

export interface AppState {
  profile: UserProfile;
  subjects: Subject[];
  prayerData: PrayerTimesData;
  quranState: QuranState;
  morningExercises: ExerciseItem[];
  eveningExercises: ExerciseItem[];
  sleepRoutine: SleepRoutineData;
  studyLogs: StudySessionLog[];
  motivationQuotes: MotivationQuote[];
  calendarEvents: CalendarEvent[];
  language: Language;
  darkMode: boolean;
  activeSection: string;
}

export const DEFAULT_STATE: AppState = {
  profile: INITIAL_USER_PROFILE,
  subjects: INITIAL_SUBJECTS,
  prayerData: {
    city: 'Mogadishu',
    country: 'Somalia',
    latitude: 2.0469,
    longitude: 45.3182,
    calculationMethod: 'MWL',
    remindersEnabled: true,
    soundAlertEnabled: true,
    alertMinutesBefore: 10,
    todayChecklist: {
      fajr: true,
      dhuhr: true,
      asr: false,
      maghrib: false,
      isha: false,
    },
    weeklyHistory: {
      [new Date().toISOString().split('T')[0]]: {
        fajr: true,
        dhuhr: true,
        asr: false,
        maghrib: false,
        isha: false,
      },
    },
  },
  quranState: {
    currentSurah: 1,
    currentAyah: 1,
    lastReadSurahName: 'Al-Fatihah',
    lastReadDate: new Date().toISOString().split('T')[0],
    dailyGoalVerses: 20,
    completedVersesToday: 14,
    remindersEnabled: true,
    reminderScheduleTime: '05:30',
    translationPreference: 'both',
    bookmarks: [
      {
        id: 'bm-1',
        surahNumber: 94,
        surahName: 'Ash-Sharh',
        ayahNumber: 5,
        note: 'With hardship comes ease - reflection for exam preparation',
        savedAt: '2026-10-18',
      },
    ],
  },
  morningExercises: INITIAL_MORNING_EXERCISES,
  eveningExercises: INITIAL_EVENING_EXERCISES,
  sleepRoutine: INITIAL_SLEEP_ROUTINE,
  studyLogs: [
    {
      id: 'log-1',
      subjectId: 'subject-8',
      subjectName: 'Health Research Methodology',
      durationMinutes: 60,
      date: new Date().toISOString().split('T')[0],
      notes: 'Reviewed Cohort vs Case-Control calculations and Odds Ratios.',
    },
    {
      id: 'log-2',
      subjectId: 'subject-2',
      subjectName: 'Meat Hygiene and Safety',
      durationMinutes: 45,
      date: new Date().toISOString().split('T')[0],
      notes: 'Study of ante-mortem inspection criteria and zoonoses.',
    },
  ],
  motivationQuotes: INITIAL_MOTIVATION_QUOTES,
  calendarEvents: INITIAL_CALENDAR_EVENTS,
  language: 'en',
  darkMode: false,
  activeSection: 'home',
};

export function loadAppState(): AppState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_STATE;
    const parsed = JSON.parse(raw);
    return {
      ...DEFAULT_STATE,
      ...parsed,
      profile: { ...DEFAULT_STATE.profile, ...parsed.profile },
      prayerData: { ...DEFAULT_STATE.prayerData, ...parsed.prayerData },
      quranState: { ...DEFAULT_STATE.quranState, ...parsed.quranState },
      sleepRoutine: { ...DEFAULT_STATE.sleepRoutine, ...parsed.sleepRoutine },
    };
  } catch (e) {
    console.error('Failed to load state from localStorage', e);
    return DEFAULT_STATE;
  }
}

export function saveAppState(state: AppState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error('Failed to save state to localStorage', e);
  }
}

// Gentle audio chime using HTML5 Web Audio API synthesize
export function playChimeSound(type: 'prayer' | 'timer' | 'bedtime' | 'complete' = 'complete'): void {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;
    const ctx = new AudioContextClass();
    const now = ctx.currentTime;

    if (type === 'bedtime') {
      // Soft soothing twin notes (F4 -> C4)
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(349.23, now);
      osc.frequency.exponentialRampToValueAtTime(261.63, now + 0.6);
      gain.gain.setValueAtTime(0.2, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 1.2);
    } else if (type === 'prayer') {
      // Resonant harmonic chime (E5 -> A4)
      [659.25, 440].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.2);
        gain.gain.setValueAtTime(0.25, now + i * 0.2);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.2 + 1.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.2);
        osc.stop(now + i * 0.2 + 1.5);
      });
    } else if (type === 'timer') {
      // Upbeat double beep
      [880, 1174.66].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + i * 0.15);
        gain.gain.setValueAtTime(0.2, now + i * 0.15);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.15 + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.15);
        osc.stop(now + i * 0.15 + 0.3);
      });
    } else {
      // Success chime (C5 -> E5 -> G5)
      [523.25, 659.25, 783.99].forEach((freq, i) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.12);
        gain.gain.setValueAtTime(0.18, now + i * 0.12);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.12 + 0.5);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.12);
        osc.stop(now + i * 0.12 + 0.5);
      });
    }
  } catch (err) {
    console.warn('Audio playback not supported or user has not interacted with document yet.', err);
  }
}

// Browser Notification request and dispatch
export async function sendNotification(title: string, body: string, icon = '/favicon.ico'): Promise<boolean> {
  if (!('Notification' in window)) {
    return false;
  }
  if (Notification.permission === 'granted') {
    new Notification(title, { body, icon });
    return true;
  }
  if (Notification.permission !== 'denied') {
    const permission = await Notification.requestPermission();
    if (permission === 'granted') {
      new Notification(title, { body, icon });
      return true;
    }
  }
  return false;
}

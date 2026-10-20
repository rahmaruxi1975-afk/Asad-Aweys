import React, { useState } from 'react';
import {
  CalendarDays,
  Clock,
  BookOpen,
  MapPin,
  Plus,
  Trash2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Subject, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface TimetableBlock {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  time: string; // e.g. "08:30 - 10:30"
  subjectCode: string;
  subjectName: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Study Group' | 'Practicum';
  color: string;
}

const DEFAULT_TIMETABLE: TimetableBlock[] = [
  {
    id: 'tt-1',
    day: 'Monday',
    time: '08:30 - 10:30',
    subjectCode: 'PHL-301',
    subjectName: 'Public Health Law & Legislation',
    room: 'Hall B3',
    type: 'Lecture',
    color: '#0284c7',
  },
  {
    id: 'tt-2',
    day: 'Monday',
    time: '14:00 - 16:00',
    subjectCode: 'HRM-308',
    subjectName: 'Health Research Methodology',
    room: 'Lab 2',
    type: 'Lab',
    color: '#0284c7',
  },
  {
    id: 'tt-3',
    day: 'Tuesday',
    time: '09:00 - 11:30',
    subjectCode: 'MHS-304',
    subjectName: 'Meat Hygiene and Safety',
    room: 'Abattoir Facility Practicum',
    type: 'Practicum',
    color: '#0d9488',
  },
  {
    id: 'tt-4',
    day: 'Tuesday',
    time: '13:00 - 15:00',
    subjectCode: 'HEC-302',
    subjectName: 'Health Economics',
    room: 'Hall 101',
    type: 'Lecture',
    color: '#d97706',
  },
  {
    id: 'tt-5',
    day: 'Wednesday',
    time: '08:30 - 10:30',
    subjectCode: 'EHI-305',
    subjectName: 'Environmental Health Impact Assessment',
    room: 'Complex C4',
    type: 'Lecture',
    color: '#059669',
  },
  {
    id: 'tt-6',
    day: 'Wednesday',
    time: '11:00 - 13:00',
    subjectCode: 'INH-303',
    subjectName: 'International Health',
    room: 'Auditorium A',
    type: 'Lecture',
    color: '#6366f1',
  },
  {
    id: 'tt-7',
    day: 'Thursday',
    time: '09:00 - 11:00',
    subjectCode: 'MNH-306',
    subjectName: 'Mental Health & Psychiatric Epidemiology',
    room: 'Hall B1',
    type: 'Lecture',
    color: '#ec4899',
  },
  {
    id: 'tt-8',
    day: 'Thursday',
    time: '14:00 - 16:00',
    subjectCode: 'MNE-307',
    subjectName: 'Monitoring and Evaluation',
    room: 'Informatics Lab',
    type: 'Lab',
    color: '#8b5cf6',
  },
  {
    id: 'tt-9',
    day: 'Friday',
    time: '09:00 - 11:00',
    subjectCode: 'PDR-309',
    subjectName: 'Population Demography & Reproductive Health',
    room: 'Lecture Hall 3',
    type: 'Lecture',
    color: '#14b8a6',
  },
  {
    id: 'tt-10',
    day: 'Saturday',
    time: '10:00 - 12:30',
    subjectCode: 'MGT-310',
    subjectName: 'Management and Administration',
    room: 'Governance Center',
    type: 'Study Group',
    color: '#f59e0b',
  },
];

interface TimetableSectionProps {
  subjects: Subject[];
  language: Language;
}

export const TimetableSection: React.FC<TimetableSectionProps> = ({
  subjects,
  language,
}) => {
  const [timetable, setTimetable] = useState<TimetableBlock[]>(DEFAULT_TIMETABLE);
  const [selectedDay, setSelectedDay] = useState<string>('Monday');

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'] as const;

  const currentDayClasses = timetable.filter((b) => b.day === selectedDay);

  const handleDelete = (id: string) => {
    setTimetable(timetable.filter((b) => b.id !== id));
  };

  return (
    <div className="space-y-6">
      {/* Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
            <CalendarDays className="w-3.5 h-3.5" />
            <span>Academic Schedule • BSc Public Health</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Weekly Study & Lecture Timetable
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Organized weekly schedule of all 10 Public Health lecture halls, laboratory practicums, and study blocks.
          </p>
        </div>

        {/* Day Selector Tabs */}
        <div className="flex flex-wrap bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20 gap-1">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedDay === day
                  ? 'bg-teal-500 text-slate-950 shadow-md'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              {day.slice(0, 3)}
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day View */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
            <Clock className="w-5 h-5 text-teal-600" />
            <span>Classes & Sessions for {selectedDay}</span>
          </h3>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
            {currentDayClasses.length} Scheduled
          </span>
        </div>

        {currentDayClasses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentDayClasses.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-slate-200/90 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:border-teal-500/50 transition-all space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></span>
                    <span className="text-xs font-mono font-bold text-slate-600 dark:text-slate-400">
                      {item.subjectCode}
                    </span>
                  </div>
                  <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300">
                    {item.type}
                  </span>
                </div>

                <div>
                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {item.subjectName}
                  </h4>
                  <div className="flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400 mt-2">
                    <span className="flex items-center gap-1 font-mono font-semibold text-teal-600 dark:text-teal-400">
                      <Clock className="w-3.5 h-3.5" />
                      {item.time}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400" />
                      {item.room}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(item.id)}
                  className="opacity-0 group-hover:opacity-100 absolute top-4 right-4 p-1.5 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                  title="Remove block"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 text-slate-400 text-xs">
            No classes scheduled on {selectedDay}. Ideal for independent research, reviewing lecture notes, and Quran reading.
          </div>
        )}
      </div>

      {/* Full Week Grid View */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <h3 className="font-bold text-base text-slate-900 dark:text-white">
          Full Weekly Overview at a Glance
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {days.slice(0, 5).map((d) => {
            const dayItems = timetable.filter((b) => b.day === d);
            return (
              <div
                key={d}
                className="p-3.5 rounded-xl border border-slate-200/80 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 space-y-2.5"
              >
                <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-300 pb-1.5 border-b border-slate-200 dark:border-slate-700">
                  <span>{d}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{dayItems.length} cl.</span>
                </div>

                <div className="space-y-1.5">
                  {dayItems.map((item) => (
                    <div
                      key={item.id}
                      className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 text-xs space-y-0.5 shadow-2xs"
                    >
                      <p className="font-bold text-slate-800 dark:text-slate-200 truncate">
                        {item.subjectCode}
                      </p>
                      <p className="text-[10px] text-teal-600 dark:text-teal-400 font-mono">
                        {item.time}
                      </p>
                    </div>
                  ))}
                  {dayItems.length === 0 && (
                    <p className="text-[10px] text-slate-400 italic py-2 text-center">Free Study</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

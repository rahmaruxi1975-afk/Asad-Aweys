import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Plus,
  Trash2,
  Clock,
  Tag,
  Filter,
  CheckCircle2,
  X,
} from 'lucide-react';
import { CalendarEvent, Language, Subject } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface CalendarSectionProps {
  events: CalendarEvent[];
  subjects: Subject[];
  language: Language;
  onUpdateEvents: (events: CalendarEvent[]) => void;
}

export const CalendarSection: React.FC<CalendarSectionProps> = ({
  events,
  subjects,
  language,
  onUpdateEvents,
}) => {
  const t = TRANSLATIONS[language];
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day'>('month');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [currentDate, setCurrentDate] = useState(new Date());

  // Modal for new event
  const [isAddingEvent, setIsAddingEvent] = useState(false);
  const [eventTitle, setEventTitle] = useState('');
  const [eventType, setEventType] = useState<CalendarEvent['type']>('lecture');
  const [eventDate, setEventDate] = useState(new Date().toISOString().split('T')[0]);
  const [eventStartTime, setEventStartTime] = useState('09:00');
  const [eventEndTime, setEventEndTime] = useState('11:00');
  const [eventSubjectId, setEventSubjectId] = useState('');
  const [eventNotes, setEventNotes] = useState('');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const handleAddEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!eventTitle.trim()) return;

    const newEvent: CalendarEvent = {
      id: `evt-${Date.now()}`,
      title: eventTitle,
      type: eventType,
      date: eventDate,
      startTime: eventStartTime,
      endTime: eventEndTime,
      subjectId: eventSubjectId || undefined,
      notes: eventNotes || undefined,
    };

    onUpdateEvents([...events, newEvent]);
    setEventTitle('');
    setEventNotes('');
    setIsAddingEvent(false);
  };

  const handleDeleteEvent = (id: string) => {
    onUpdateEvents(events.filter((e) => e.id !== id));
  };

  // Generate days for Month View
  const firstDayOfMonth = new Date(year, month, 1).getDay(); // 0 is Sunday
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const monthDays = [];
  // Pad blank days before 1st of month
  for (let i = 0; i < firstDayOfMonth; i++) {
    monthDays.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    monthDays.push(d);
  }

  const filteredEvents = events.filter((e) => {
    if (selectedFilter === 'all') return true;
    return e.type === selectedFilter;
  });

  const getEventBadgeClass = (type: CalendarEvent['type']) => {
    switch (type) {
      case 'lecture': return 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-200';
      case 'exam': return 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300 border-red-200';
      case 'assignment': return 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-200';
      case 'quran': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200';
      case 'prayer': return 'bg-teal-100 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300 border-teal-200';
      case 'exercise': return 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200';
      case 'bedtime': return 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-300 border-slate-200';
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  return (
    <div className="space-y-6">
      {/* Top Header & View Modes */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
            <CalendarIcon className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              University Calendar & Task Planner
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {monthNames[month]} {year} • Track lectures, exams, Islamic routine, and study deadlines
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2">
          {/* View Modes */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {(['month', 'week', 'day'] as const).map((m) => (
              <button
                key={m}
                onClick={() => setViewMode(m)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  viewMode === m
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {m}
              </button>
            ))}
          </div>

          {/* Month Steppers */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 p-1 rounded-xl">
            <button
              onClick={handlePrevMonth}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleToday}
              className="px-2.5 py-1 text-xs font-bold text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700 rounded-lg"
            >
              Today
            </button>
            <button
              onClick={handleNextMonth}
              className="p-1 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-white dark:hover:bg-slate-700"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Add Event Button */}
          <button
            onClick={() => setIsAddingEvent(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Event
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex flex-wrap items-center gap-2 bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs text-xs">
        <span className="text-slate-400 font-bold uppercase text-[10px] mr-1">
          Filter:
        </span>
        {[
          { id: 'all', label: 'All Events' },
          { id: 'lecture', label: 'Lectures' },
          { id: 'exam', label: 'Exams' },
          { id: 'assignment', label: 'Assignments' },
          { id: 'quran', label: 'Quran' },
          { id: 'prayer', label: 'Prayer' },
          { id: 'exercise', label: 'Exercise' },
          { id: 'study', label: 'Study Sessions' },
          { id: 'bedtime', label: 'Bedtime' },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setSelectedFilter(f.id)}
            className={`px-3 py-1 rounded-lg font-semibold transition-colors ${
              selectedFilter === f.id
                ? 'bg-teal-600 text-white'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Month View Grid */}
      {viewMode === 'month' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
          {/* Day Headers */}
          <div className="grid grid-cols-7 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 text-center py-2 text-xs font-bold text-slate-500">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 divide-x divide-y divide-slate-100 dark:divide-slate-800/80">
            {monthDays.map((day, idx) => {
              if (day === null) {
                return (
                  <div
                    key={`empty-${idx}`}
                    className="min-h-[110px] bg-slate-50/40 dark:bg-slate-950/20 p-2"
                  />
                );
              }

              const dateString = `${year}-${(month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
              const dayEvents = filteredEvents.filter((e) => e.date === dateString);
              const isToday =
                new Date().toISOString().split('T')[0] === dateString;

              return (
                <div
                  key={`day-${day}`}
                  className={`min-h-[110px] p-2 transition-colors ${
                    isToday
                      ? 'bg-teal-50/40 dark:bg-teal-950/20'
                      : 'hover:bg-slate-50/80 dark:hover:bg-slate-800/30'
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span
                      className={`text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center font-mono ${
                        isToday
                          ? 'bg-teal-600 text-white shadow-xs'
                          : 'text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {day}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {dayEvents.length} ev
                      </span>
                    )}
                  </div>

                  {/* Day Events Stack */}
                  <div className="space-y-1">
                    {dayEvents.slice(0, 3).map((evt) => (
                      <div
                        key={evt.id}
                        className={`text-[10px] px-1.5 py-0.5 rounded border truncate font-medium flex items-center justify-between group ${getEventBadgeClass(evt.type)}`}
                        title={`${evt.title} (${evt.startTime} - ${evt.endTime})`}
                      >
                        <span className="truncate">{evt.title}</span>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteEvent(evt.id);
                          }}
                          className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 ml-1 shrink-0"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="text-[9px] text-slate-400 font-bold block pl-1">
                        +{dayEvents.length - 3} more
                      </span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Week & Day Views */}
      {viewMode !== 'month' && (
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Upcoming Chronological Events
          </h3>
          <div className="space-y-3">
            {filteredEvents.map((evt) => (
              <div
                key={evt.id}
                className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-teal-400 transition-colors"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${getEventBadgeClass(evt.type)}`}>
                      {evt.type}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      📅 {evt.date} • {evt.startTime} - {evt.endTime}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                    {evt.title}
                  </h4>
                  {evt.notes && (
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {evt.notes}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteEvent(evt.id)}
                  className="p-2 text-slate-400 hover:text-red-500 rounded-lg hover:bg-red-50"
                  title="Delete event"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Add Event Modal */}
      {isAddingEvent && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Add Calendar Event
              </h3>
              <button onClick={() => setIsAddingEvent(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddEvent} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Epidemiology Final Review"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Category</label>
                  <select
                    value={eventType}
                    onChange={(e) => setEventType(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  >
                    <option value="lecture">Lecture</option>
                    <option value="exam">Exam</option>
                    <option value="assignment">Assignment</option>
                    <option value="quran">Quran</option>
                    <option value="prayer">Prayer</option>
                    <option value="exercise">Exercise</option>
                    <option value="study">Study</option>
                    <option value="bedtime">Bedtime</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Date</label>
                  <input
                    type="date"
                    value={eventDate}
                    onChange={(e) => setEventDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Start Time</label>
                  <input
                    type="time"
                    value={eventStartTime}
                    onChange={(e) => setEventStartTime(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">End Time</label>
                  <input
                    type="time"
                    value={eventEndTime}
                    onChange={(e) => setEventEndTime(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Link to Subject (Optional)</label>
                <select
                  value={eventSubjectId}
                  onChange={(e) => setEventSubjectId(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  <option value="">None (General Event)</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.code}: {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Notes / Location</label>
                <input
                  type="text"
                  placeholder="e.g. Hall 2B or Bring STROBE checklist"
                  value={eventNotes}
                  onChange={(e) => setEventNotes(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddingEvent(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
                >
                  Save Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

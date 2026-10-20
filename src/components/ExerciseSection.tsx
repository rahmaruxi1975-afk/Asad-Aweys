import React, { useState, useEffect } from 'react';
import {
  Sunrise,
  Sunset,
  Play,
  Pause,
  RotateCcw,
  CheckCircle2,
  Plus,
  Flame,
  Clock,
  Heart,
  Sparkles,
  Activity,
  Shield,
  Smile,
} from 'lucide-react';
import { ExerciseItem, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { playChimeSound } from '../utils/storage';

interface ExerciseSectionProps {
  morningExercises: ExerciseItem[];
  eveningExercises: ExerciseItem[];
  language: Language;
  onUpdateExercises: (type: 'morning' | 'evening', items: ExerciseItem[]) => void;
}

export const ExerciseSection: React.FC<ExerciseSectionProps> = ({
  morningExercises,
  eveningExercises,
  language,
  onUpdateExercises,
}) => {
  const t = TRANSLATIONS[language];
  const [activeTab, setActiveTab] = useState<'morning' | 'evening'>('morning');

  // Interactive Workout Timer
  const [timerSeconds, setTimerSeconds] = useState(60); // 1 min default
  const [timerRunning, setTimerRunning] = useState(false);
  const [selectedExerciseTitle, setSelectedExerciseTitle] = useState('Gentle Mobility Warm-Up');

  // Form for adding exercise
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDuration, setNewDuration] = useState(5);
  const [newDesc, setNewDesc] = useState('');

  const currentList = activeTab === 'morning' ? morningExercises : eveningExercises;

  useEffect(() => {
    let interval: any = null;
    if (timerRunning && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => prev - 1);
      }, 1000);
    } else if (timerSeconds === 0 && timerRunning) {
      setTimerRunning(false);
      playChimeSound('complete');
      alert(`Exercise session for "${selectedExerciseTitle}" completed! Great discipline, Asad.`);
    }
    return () => clearInterval(interval);
  }, [timerRunning, timerSeconds, selectedExerciseTitle]);

  const handleStartTimerForExercise = (title: string, minutes: number) => {
    setSelectedExerciseTitle(title);
    setTimerSeconds(minutes * 60);
    setTimerRunning(true);
  };

  const handleToggleExerciseDone = (id: string) => {
    const updated = currentList.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    );
    onUpdateExercises(activeTab, updated);
    playChimeSound('complete');
  };

  const handleAddExercise = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newItem: ExerciseItem = {
      id: `ex-${Date.now()}`,
      title: newTitle,
      category: activeTab,
      durationMinutes: newDuration,
      description: newDesc || 'Gentle mobility exercise for student health.',
      icon: 'Activity',
      completed: false,
    };

    onUpdateExercises(activeTab, [...currentList, newItem]);
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  const totalCompleted = currentList.filter((e) => e.completed).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-950 via-slate-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white border border-orange-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/20 border border-orange-400/30 text-orange-300 text-xs font-semibold">
            <Flame className="w-3.5 h-3.5" />
            <span>Physical Well-being & Spine Mobility</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Daily Fitness & Mobility Routine
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Essential movement to relieve study fatigue, preserve posture, promote cardiovascular health, and prepare for restful sleep.
          </p>
        </div>

        {/* Tab switch between Morning and Evening */}
        <div className="flex bg-white/10 backdrop-blur-md p-1.5 rounded-2xl border border-white/20">
          <button
            onClick={() => setActiveTab('morning')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'morning'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Sunrise className="w-4 h-4" />
            Morning Mobility
          </button>
          <button
            onClick={() => setActiveTab('evening')}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'evening'
                ? 'bg-indigo-500 text-white shadow-md'
                : 'text-white hover:bg-white/10'
            }`}
          >
            <Sunset className="w-4 h-4" />
            Evening Wind-Down
          </button>
        </div>
      </div>

      {/* Main Grid: Exercises Checklist & Interactive Timer */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Checklist */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                  {activeTab === 'morning' ? <Sunrise className="w-5 h-5 text-amber-500" /> : <Sunset className="w-5 h-5 text-indigo-500" />}
                  {activeTab === 'morning' ? 'Morning Movement Checklist' : 'Evening Recovery Checklist'}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  {activeTab === 'morning'
                    ? 'Gentle stretching, spinal awakening, and oxygen-boosting light cardio.'
                    : 'Posture decompression, hamstring lengthening, and parasympathetic relaxation.'}
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                  {totalCompleted}/{currentList.length} Completed
                </span>
                <button
                  onClick={() => setIsAdding(true)}
                  className="p-1.5 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400 hover:bg-teal-100"
                  title="Add custom exercise"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Add Exercise Inline Form */}
            {isAdding && (
              <form onSubmit={handleAddExercise} className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 dark:bg-slate-800/80 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="Exercise Title (e.g. Cat-Cow Spine Stretch)"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                    required
                  />
                  <input
                    type="number"
                    min="1"
                    max="60"
                    placeholder="Duration in minutes"
                    value={newDuration}
                    onChange={(e) => setNewDuration(parseInt(e.target.value) || 5)}
                    className="px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                    required
                  />
                </div>
                <input
                  type="text"
                  placeholder="Instructions or key benefit"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                />
                <div className="flex justify-end gap-2">
                  <button type="button" onClick={() => setIsAdding(false)} className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs">
                    Cancel
                  </button>
                  <button type="submit" className="px-4 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold">
                    Add Movement
                  </button>
                </div>
              </form>
            )}

            {/* Exercise List */}
            <div className="space-y-3">
              {currentList.map((item) => (
                <div
                  key={item.id}
                  className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                    item.completed
                      ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-90'
                      : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-teal-400'
                  }`}
                >
                  <div
                    onClick={() => handleToggleExerciseDone(item.id)}
                    className="flex items-start gap-3 cursor-pointer flex-1"
                  >
                    <div
                      className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center border shrink-0 ${
                        item.completed
                          ? 'bg-emerald-600 border-emerald-600 text-white'
                          : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                      }`}
                    >
                      {item.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <p className={`text-sm font-bold text-slate-900 dark:text-white ${item.completed ? 'line-through text-slate-400' : ''}`}>
                        {item.title}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {item.description}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                    <span className="text-xs font-mono font-semibold px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      {item.durationMinutes} min
                    </span>
                    <button
                      onClick={() => handleStartTimerForExercise(item.title, item.durationMinutes)}
                      className="px-3 py-1.5 rounded-lg bg-teal-50 dark:bg-teal-950/60 hover:bg-teal-100 text-teal-700 dark:text-teal-300 text-xs font-bold transition-colors flex items-center gap-1"
                    >
                      <Play className="w-3 h-3" />
                      Timer
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Col: Exercise Countdown Timer */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between space-y-6">
          <div className="text-center space-y-1">
            <span className="text-[10px] font-bold uppercase tracking-wider text-teal-600 dark:text-teal-400">
              Active Movement Timer
            </span>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              {selectedExerciseTitle}
            </h4>
          </div>

          {/* Big Circular Display */}
          <div className="flex flex-col items-center justify-center">
            <div className="w-48 h-48 rounded-full border-8 border-teal-500/20 flex flex-col items-center justify-center relative bg-slate-50 dark:bg-slate-950 shadow-inner">
              <span className="text-4xl font-black font-mono text-slate-900 dark:text-white">
                {Math.floor(timerSeconds / 60)}:{(timerSeconds % 60).toString().padStart(2, '0')}
              </span>
              <span className="text-xs text-slate-400 font-semibold mt-1">
                {timerRunning ? 'Session in progress' : 'Ready to start'}
              </span>
            </div>
          </div>

          {/* Timer Controls */}
          <div className="flex items-center justify-center gap-3">
            <button
              onClick={() => setTimerRunning(!timerRunning)}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-md transition-all ${
                timerRunning
                  ? 'bg-amber-600 hover:bg-amber-700 text-white'
                  : 'bg-teal-600 hover:bg-teal-700 text-white'
              }`}
            >
              {timerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {timerRunning ? 'Pause' : 'Start Movement'}
            </button>

            <button
              onClick={() => {
                setTimerRunning(false);
                setTimerSeconds(60);
              }}
              className="p-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              title="Reset timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Quick presets */}
          <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-center gap-2">
            {[1, 3, 5, 10].map((mins) => (
              <button
                key={mins}
                onClick={() => {
                  setTimerRunning(false);
                  setTimerSeconds(mins * 60);
                }}
                className="px-2.5 py-1 text-xs font-mono font-bold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"
              >
                {mins}m
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

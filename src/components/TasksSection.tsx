import React, { useState } from 'react';
import {
  CheckSquare,
  Plus,
  Trash2,
  Calendar,
  AlertCircle,
  CheckCircle2,
  Filter,
  Tag,
  Clock,
} from 'lucide-react';
import { Subject, Language, Assignment } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { playChimeSound } from '../utils/storage';

interface CustomTask {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  dueDate: string;
  completed: boolean;
  subjectId?: string;
  subjectName?: string;
}

const INITIAL_TASKS: CustomTask[] = [
  {
    id: 'task-1',
    title: 'Review IHR (2005) criteria for Public Health Law tutorial',
    priority: 'high',
    dueDate: '2026-10-20',
    completed: true,
    subjectName: 'Public Health Law',
  },
  {
    id: 'task-2',
    title: 'Complete biostatistics calculations: Odds Ratio vs Relative Risk',
    priority: 'high',
    dueDate: '2026-10-21',
    completed: false,
    subjectName: 'Health Research Methodology',
  },
  {
    id: 'task-3',
    title: 'Prepare white lab coat & boots for Meat Hygiene abattoir visit',
    priority: 'medium',
    dueDate: '2026-10-20',
    completed: true,
    subjectName: 'Meat Hygiene and Safety',
  },
  {
    id: 'task-4',
    title: 'Read 2 research articles on Maternal Mortality 3-Delays Model',
    priority: 'medium',
    dueDate: '2026-10-22',
    completed: false,
    subjectName: 'Population Demography',
  },
  {
    id: 'task-5',
    title: 'Draft M&E logical framework indicator matrix',
    priority: 'high',
    dueDate: '2026-10-25',
    completed: false,
    subjectName: 'Monitoring & Evaluation',
  },
  {
    id: 'task-6',
    title: 'Set up 9:30 PM bedtime wind-down checklist on phone',
    priority: 'low',
    dueDate: '2026-10-19',
    completed: true,
    subjectName: 'Personal Routine',
  },
];

interface TasksSectionProps {
  subjects: Subject[];
  language: Language;
}

export const TasksSection: React.FC<TasksSectionProps> = ({
  subjects,
  language,
}) => {
  const t = TRANSLATIONS[language];
  const [tasks, setTasks] = useState<CustomTask[]>(INITIAL_TASKS);
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'completed'>('all');

  // Form modal
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newPriority, setNewPriority] = useState<'high' | 'medium' | 'low'>('medium');
  const [newDueDate, setNewDueDate] = useState(new Date().toISOString().split('T')[0]);
  const [newSubjectName, setNewSubjectName] = useState(subjects[0]?.name || 'General Studies');

  const handleToggleTask = (id: string) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    playChimeSound('complete');
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: CustomTask = {
      id: `task-${Date.now()}`,
      title: newTitle,
      priority: newPriority,
      dueDate: newDueDate,
      completed: false,
      subjectName: newSubjectName,
    };

    setTasks([newTask, ...tasks]);
    setNewTitle('');
    setIsAdding(false);
  };

  const filteredTasks = tasks.filter((t) => {
    const matchesPriority = priorityFilter === 'all' || t.priority === priorityFilter;
    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'completed' && t.completed) ||
      (statusFilter === 'pending' && !t.completed);
    return matchesPriority && matchesStatus;
  });

  const completedCount = tasks.filter((t) => t.completed).length;

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-sky-950 rounded-2xl p-6 sm:p-8 text-white border border-teal-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold">
            <CheckSquare className="w-3.5 h-3.5" />
            <span>Academic Coursework & Task Management</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Daily Tasks & Coursework Deadlines
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Prioritize coursework, term papers, laboratory preparations, and daily academic to-dos.
          </p>
        </div>

        {/* Task Stats Card */}
        <div className="bg-white/10 backdrop-blur-md rounded-2xl p-5 border border-white/20 min-w-[220px] text-center space-y-2">
          <span className="text-xs uppercase font-bold text-teal-300 tracking-wider">
            Overall Completion
          </span>
          <h3 className="text-3xl font-black font-mono text-white">
            {completedCount} / {tasks.length}
          </h3>
          <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden">
            <div
              className="bg-teal-400 h-full rounded-full transition-all"
              style={{ width: `${(completedCount / (tasks.length || 1)) * 100}%` }}
            ></div>
          </div>
          <p className="text-[11px] text-slate-300">
            {Math.round((completedCount / (tasks.length || 1)) * 100)}% Tasks Completed
          </p>
        </div>
      </div>

      {/* Filter and Add Button Bar */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 sm:p-5 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-2">
          {/* Priority filter */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {(['all', 'high', 'medium', 'low'] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  priorityFilter === p
                    ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          {/* Status filter */}
          <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl text-xs font-semibold">
            {(['all', 'pending', 'completed'] as const).map((s) => (
              <button
                key={s}
                onClick={() => setStatusFilter(s)}
                className={`px-3 py-1.5 rounded-lg capitalize transition-all ${
                  statusFilter === s
                    ? 'bg-teal-600 text-white shadow-xs font-bold'
                    : 'text-slate-500'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={() => setIsAdding(true)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-all"
        >
          <Plus className="w-4 h-4" />
          Add Task
        </button>
      </div>

      {/* Task Items List */}
      <div className="space-y-3">
        {filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`p-4 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
              task.completed
                ? 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 opacity-80'
                : 'bg-white dark:bg-slate-900 border-slate-200/90 dark:border-slate-800 hover:border-teal-400 shadow-xs'
            }`}
          >
            <div
              onClick={() => handleToggleTask(task.id)}
              className="flex items-start gap-3 cursor-pointer flex-1"
            >
              <div
                className={`w-5 h-5 mt-0.5 rounded-md flex items-center justify-center border shrink-0 transition-colors ${
                  task.completed
                    ? 'bg-teal-600 border-teal-600 text-white'
                    : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                }`}
              >
                {task.completed && <CheckCircle2 className="w-3.5 h-3.5" />}
              </div>

              <div>
                <p className={`text-sm font-bold text-slate-900 dark:text-white ${task.completed ? 'line-through text-slate-400' : ''}`}>
                  {task.title}
                </p>
                <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-slate-500">
                  {task.subjectName && (
                    <span className="font-semibold text-teal-600 dark:text-teal-400">
                      {task.subjectName}
                    </span>
                  )}
                  <span>•</span>
                  <span className="font-mono flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    Due: {task.dueDate}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
              <span
                className={`text-[10px] font-bold uppercase px-2.5 py-1 rounded-full ${
                  task.priority === 'high'
                    ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                    : task.priority === 'medium'
                    ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300'
                    : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {task.priority}
              </span>

              <button
                onClick={() => handleDeleteTask(task.id)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40"
                title="Delete task"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Add Task Modal */}
      {isAdding && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 w-full max-w-md shadow-2xl space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white pb-2 border-b border-slate-100 dark:border-slate-800">
              Add Academic Task or Coursework
            </h3>

            <form onSubmit={handleAddTask} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Task Title</label>
                <input
                  type="text"
                  placeholder="e.g. Read Chapter 5 Environmental Risk Assessment"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Priority</label>
                  <select
                    value={newPriority}
                    onChange={(e) => setNewPriority(e.target.value as any)}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  >
                    <option value="high">High Priority</option>
                    <option value="medium">Medium Priority</option>
                    <option value="low">Low Priority</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Due Date</label>
                  <input
                    type="date"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject Tag</label>
                <select
                  value={newSubjectName}
                  onChange={(e) => setNewSubjectName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                >
                  <option value="General Studies">General Studies</option>
                  {subjects.map((s) => (
                    <option key={s.id} value={s.name}>
                      {s.code}: {s.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
                >
                  Save Task
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

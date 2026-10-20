import React, { useState } from 'react';
import {
  BookOpen,
  Plus,
  Trash2,
  Edit2,
  ExternalLink,
  CheckCircle2,
  Calendar,
  AlertCircle,
  FileText,
  Clock,
  Award,
  ChevronRight,
  X,
  Scale,
  ShieldCheck,
  TrendingUp,
  Leaf,
  Globe,
  HeartPulse,
  Microscope,
  Users,
  Briefcase,
  Layers,
} from 'lucide-react';
import { Subject, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface SubjectsSectionProps {
  subjects: Subject[];
  language: Language;
  onUpdateSubjects: (updated: Subject[]) => void;
  onOpenStudyTimerForSubject: (subjectId: string) => void;
}

export const SubjectsSection: React.FC<SubjectsSectionProps> = ({
  subjects,
  language,
  onUpdateSubjects,
  onOpenStudyTimerForSubject,
}) => {
  const t = TRANSLATIONS[language];
  const [selectedSubjectId, setSelectedSubjectId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'notes' | 'assignments' | 'exams' | 'goals' | 'reviews' | 'resources'>('overview');
  const [isEditingSubject, setIsEditingSubject] = useState(false);
  const [isAddingSubject, setIsAddingSubject] = useState(false);

  // New subject form state
  const [newSubName, setNewSubName] = useState('');
  const [newSubCode, setNewSubCode] = useState('');
  const [newSubDesc, setNewSubDesc] = useState('');
  const [newSubColor, setNewSubColor] = useState('#0d9488');

  // New Note Modal state
  const [isAddingNote, setIsAddingNote] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteSummary, setNoteSummary] = useState('');
  const [noteContent, setNoteContent] = useState('');

  // New Goal / Assignment state
  const [isAddingGoal, setIsAddingGoal] = useState(false);
  const [goalText, setGoalText] = useState('');

  const selectedSubject = subjects.find((s) => s.id === selectedSubjectId) || null;

  // Icon mapping
  const getSubjectIcon = (iconName: string, className = 'w-5 h-5') => {
    switch (iconName) {
      case 'Scale': return <Scale className={className} />;
      case 'ShieldCheck': return <ShieldCheck className={className} />;
      case 'TrendingUp': return <TrendingUp className={className} />;
      case 'Leaf': return <Leaf className={className} />;
      case 'Globe': return <Globe className={className} />;
      case 'HeartPulse': return <HeartPulse className={className} />;
      case 'CheckCircle2': return <CheckCircle2 className={className} />;
      case 'Microscope': return <Microscope className={className} />;
      case 'Users': return <Users className={className} />;
      case 'Briefcase': return <Briefcase className={className} />;
      default: return <BookOpen className={className} />;
    }
  };

  const handleUpdateProgress = (subjectId: string, newProgress: number) => {
    const updated = subjects.map((s) =>
      s.id === subjectId ? { ...s, progress: Math.max(0, Math.min(100, newProgress)) } : s
    );
    onUpdateSubjects(updated);
  };

  const handleDeleteSubject = (subjectId: string) => {
    if (confirm('Are you sure you want to delete this subject?')) {
      const updated = subjects.filter((s) => s.id !== subjectId);
      onUpdateSubjects(updated);
      if (selectedSubjectId === subjectId) setSelectedSubjectId(null);
    }
  };

  const handleCreateSubject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSubName.trim()) return;

    const newSub: Subject = {
      id: `subject-${Date.now()}`,
      name: newSubName,
      code: newSubCode || 'PH-GEN',
      icon: 'BookOpen',
      color: newSubColor,
      progress: 0,
      description: newSubDesc || 'Public Health curriculum study unit.',
      notes: [],
      assignments: [],
      exams: [],
      learningGoals: [],
      reviewSchedule: [],
      resourceLinks: [],
    };

    onUpdateSubjects([...subjects, newSub]);
    setNewSubName('');
    setNewSubCode('');
    setNewSubDesc('');
    setIsAddingSubject(false);
    setSelectedSubjectId(newSub.id);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !noteTitle.trim()) return;

    const newNote = {
      id: `note-${Date.now()}`,
      title: noteTitle,
      date: new Date().toISOString().split('T')[0],
      summary: noteSummary,
      content: noteContent,
      tags: ['Revision', selectedSubject.code],
    };

    const updated = subjects.map((s) =>
      s.id === selectedSubject.id ? { ...s, notes: [newNote, ...s.notes] } : s
    );
    onUpdateSubjects(updated);
    setNoteTitle('');
    setNoteSummary('');
    setNoteContent('');
    setIsAddingNote(false);
  };

  const handleAddGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedSubject || !goalText.trim()) return;

    const newGoal = {
      id: `goal-${Date.now()}`,
      text: goalText,
      completed: false,
    };

    const updated = subjects.map((s) =>
      s.id === selectedSubject.id ? { ...s, learningGoals: [...s.learningGoals, newGoal] } : s
    );
    onUpdateSubjects(updated);
    setGoalText('');
    setIsAddingGoal(false);
  };

  const handleToggleGoal = (subjectId: string, goalId: string) => {
    const updated = subjects.map((s) => {
      if (s.id !== subjectId) return s;
      return {
        ...s,
        learningGoals: s.learningGoals.map((g) =>
          g.id === goalId ? { ...g, completed: !g.completed } : g
        ),
      };
    });
    onUpdateSubjects(updated);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-2 rounded-lg bg-teal-50 text-teal-600 dark:bg-teal-950/60 dark:text-teal-400">
              <BookOpen className="w-5 h-5" />
            </span>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              My Public Health Studies
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Manage your 10 university subjects, lecture summaries, coursework, exams, learning goals, and revision schedule.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddingSubject(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-sm transition-all"
          >
            <Plus className="w-4 h-4" />
            Add Subject
          </button>
        </div>
      </div>

      {/* Grid of Subject Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {subjects.map((sub, index) => {
          const completedGoals = sub.learningGoals.filter((g) => g.completed).length;
          const pendingAssignments = sub.assignments.filter((a) => a.status !== 'graded' && a.status !== 'submitted').length;

          return (
            <div
              key={sub.id}
              className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/90 dark:border-slate-800 p-5 shadow-xs hover:shadow-md hover:border-teal-500/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                {/* Header row: Icon, Code, and Actions */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                      style={{ backgroundColor: sub.color || '#0d9488' }}
                    >
                      {getSubjectIcon(sub.icon)}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                        {sub.code}
                      </span>
                      <p className="text-[11px] text-slate-400 font-medium">
                        Unit #{index + 1}
                      </p>
                    </div>
                  </div>

                  <span className="text-xs font-bold font-mono text-teal-600 dark:text-teal-400 bg-teal-50 dark:bg-teal-950/60 px-2 py-1 rounded-lg">
                    {sub.progress}%
                  </span>
                </div>

                {/* Subject Title & Description */}
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white text-base leading-snug group-hover:text-teal-600 dark:group-hover:text-teal-400 transition-colors">
                    {language === 'so' && sub.nameSo ? sub.nameSo : language === 'ar' && sub.nameAr ? sub.nameAr : sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1 leading-relaxed">
                    {sub.description}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="space-y-1">
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${sub.progress}%`,
                        backgroundColor: sub.color || '#0d9488',
                      }}
                    ></div>
                  </div>
                  <div className="flex justify-between items-center text-[10px] text-slate-400">
                    <span>Study Progress</span>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={sub.progress}
                      onChange={(e) => handleUpdateProgress(sub.id, parseInt(e.target.value))}
                      className="w-20 accent-teal-600 cursor-pointer"
                      title="Adjust study progress percentage"
                    />
                  </div>
                </div>

                {/* Key stats badges */}
                <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-600 dark:text-slate-300">
                  <span className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded-md">
                    <FileText className="w-3 h-3 text-slate-400" />
                    {sub.notes.length} Notes
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded-md">
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                    {pendingAssignments} Coursework
                  </span>
                  <span className="inline-flex items-center gap-1 bg-slate-50 dark:bg-slate-800/60 px-2 py-1 rounded-md">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    {completedGoals}/{sub.learningGoals.length} Goals
                  </span>
                </div>
              </div>

              {/* Bottom Card Actions */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                <button
                  onClick={() => onOpenStudyTimerForSubject(sub.id)}
                  className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-600 dark:text-teal-400 hover:text-teal-700 hover:underline"
                >
                  <Clock className="w-3.5 h-3.5" />
                  Study Focus
                </button>

                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleDeleteSubject(sub.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                    title="Delete subject"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedSubjectId(sub.id);
                      setActiveTab('overview');
                    }}
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-teal-50 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-teal-700 dark:hover:text-teal-300 text-xs font-bold transition-colors"
                  >
                    Manage & Notes
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Subject Detailed Modal / Full View */}
      {selectedSubject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden animate-in fade-in-50 zoom-in-95">
            {/* Modal Header */}
            <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50/70 dark:bg-slate-800/40">
              <div className="flex items-center gap-3">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white shadow-sm"
                  style={{ backgroundColor: selectedSubject.color }}
                >
                  {getSubjectIcon(selectedSubject.icon)}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">
                      {selectedSubject.code}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                      {selectedSubject.name}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedSubject.description}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setSelectedSubjectId(null)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Tabs */}
            <div className="flex items-center gap-1 px-5 pt-3 border-b border-slate-200 dark:border-slate-800 overflow-x-auto text-xs font-semibold">
              {[
                { id: 'overview', label: 'Overview & Goals', count: selectedSubject.learningGoals.length },
                { id: 'notes', label: 'Lecture Notes', count: selectedSubject.notes.length },
                { id: 'assignments', label: 'Coursework Tracker', count: selectedSubject.assignments.length },
                { id: 'exams', label: 'Exams & Deadlines', count: selectedSubject.exams.length },
                { id: 'reviews', label: 'Review Schedule', count: selectedSubject.reviewSchedule.length },
                { id: 'resources', label: 'Resources & Papers', count: selectedSubject.resourceLinks.length },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-3 py-2 border-b-2 rounded-t-lg transition-colors whitespace-nowrap ${
                    activeTab === tab.id
                      ? 'border-teal-500 text-teal-600 dark:text-teal-400 font-bold bg-teal-50/50 dark:bg-teal-950/20'
                      : 'border-transparent text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                  }`}
                >
                  {tab.label} ({tab.count})
                </button>
              ))}
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Tab 1: Overview & Learning Goals */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  {/* Progress Slider */}
                  <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 space-y-2">
                    <div className="flex justify-between items-center text-xs font-bold text-slate-700 dark:text-slate-200">
                      <span>Curriculum Mastery</span>
                      <span className="font-mono text-teal-600 dark:text-teal-400">{selectedSubject.progress}%</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={selectedSubject.progress}
                      onChange={(e) => handleUpdateProgress(selectedSubject.id, parseInt(e.target.value))}
                      className="w-full accent-teal-600 cursor-pointer"
                    />
                  </div>

                  {/* Learning Goals Checklist */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        Personal Learning Goals & Core Competencies
                      </h4>
                      <button
                        onClick={() => setIsAddingGoal(true)}
                        className="text-xs font-semibold text-teal-600 hover:underline flex items-center gap-1"
                      >
                        <Plus className="w-3.5 h-3.5" />
                        Add Goal
                      </button>
                    </div>

                    {isAddingGoal && (
                      <form onSubmit={handleAddGoal} className="flex gap-2 p-3 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                        <input
                          type="text"
                          placeholder="Enter learning objective (e.g. Master Odds Ratio formula)..."
                          value={goalText}
                          onChange={(e) => setGoalText(e.target.value)}
                          className="flex-1 px-3 py-1.5 text-xs bg-white dark:bg-slate-900 border rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-500"
                          autoFocus
                        />
                        <button type="submit" className="px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold">
                          Add
                        </button>
                        <button type="button" onClick={() => setIsAddingGoal(false)} className="px-3 py-1.5 rounded-lg bg-slate-200 text-slate-700 text-xs">
                          Cancel
                        </button>
                      </form>
                    )}

                    <div className="space-y-2">
                      {selectedSubject.learningGoals.map((g) => (
                        <div
                          key={g.id}
                          onClick={() => handleToggleGoal(selectedSubject.id, g.id)}
                          className="flex items-center gap-3 p-3 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/40 cursor-pointer transition-colors"
                        >
                          <div
                            className={`w-4 h-4 rounded-md flex items-center justify-center border ${
                              g.completed
                                ? 'bg-emerald-600 border-emerald-600 text-white'
                                : 'border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800'
                            }`}
                          >
                            {g.completed && <CheckCircle2 className="w-3 h-3" />}
                          </div>
                          <span
                            className={`text-xs ${
                              g.completed
                                ? 'line-through text-slate-400'
                                : 'text-slate-800 dark:text-slate-200 font-medium'
                            }`}
                          >
                            {g.text}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Lecture Notes */}
              {activeTab === 'notes' && (
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                      Lecture Summaries & Study Notes
                    </h4>
                    <button
                      onClick={() => setIsAddingNote(true)}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-bold hover:bg-teal-700"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      Add Lecture Note
                    </button>
                  </div>

                  {isAddingNote && (
                    <form onSubmit={handleAddNote} className="p-4 rounded-xl border border-teal-200 bg-teal-50/30 dark:bg-slate-800/80 dark:border-slate-700 space-y-3">
                      <input
                        type="text"
                        placeholder="Lecture Title (e.g. Cohort Studies vs Case Control)"
                        value={noteTitle}
                        onChange={(e) => setNoteTitle(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                        required
                      />
                      <input
                        type="text"
                        placeholder="Key One-Sentence Summary"
                        value={noteSummary}
                        onChange={(e) => setNoteSummary(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                      />
                      <textarea
                        rows={4}
                        placeholder="Detailed notes, formulas, clinical guidelines..."
                        value={noteContent}
                        onChange={(e) => setNoteContent(e.target.value)}
                        className="w-full px-3 py-2 text-xs rounded-lg border bg-white dark:bg-slate-900 border-slate-300 dark:border-slate-700"
                        required
                      />
                      <div className="flex justify-end gap-2">
                        <button type="button" onClick={() => setIsAddingNote(false)} className="px-3 py-1.5 text-xs rounded-lg bg-slate-200 text-slate-700 font-semibold">
                          Cancel
                        </button>
                        <button type="submit" className="px-4 py-1.5 text-xs rounded-lg bg-teal-600 text-white font-bold">
                          Save Note
                        </button>
                      </div>
                    </form>
                  )}

                  <div className="space-y-3">
                    {selectedSubject.notes.length > 0 ? (
                      selectedSubject.notes.map((note) => (
                        <div key={note.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-50 text-teal-800 dark:bg-teal-950/60 dark:text-teal-300">
                              {note.lectureNumber || 'Lecture Note'} • {note.date}
                            </span>
                            <div className="flex gap-1">
                              {note.tags.map((tag) => (
                                <span key={tag} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded text-slate-500">
                                  #{tag}
                                </span>
                              ))}
                            </div>
                          </div>
                          <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                            {note.title}
                          </h5>
                          <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                            {note.summary}
                          </p>
                          <div className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/50 text-xs font-mono text-slate-700 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                            {note.content}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-center py-8 text-xs text-slate-400">
                        No notes yet for this subject. Click "Add Lecture Note" above to write your summaries.
                      </p>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 3: Assignments */}
              {activeTab === 'assignments' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Coursework & Assignment Progress
                  </h4>
                  {selectedSubject.assignments.map((asg) => (
                    <div key={asg.id} className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-teal-100 text-teal-800 dark:bg-teal-900/60 dark:text-teal-300">
                          Weight: {asg.weight}%
                        </span>
                        <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                          {asg.title}
                        </h5>
                        <p className="text-xs text-slate-500">
                          Due Date: <span className="font-semibold text-slate-800 dark:text-slate-200">{asg.dueDate}</span>
                        </p>
                        {asg.instructions && (
                          <p className="text-xs text-slate-600 dark:text-slate-400 mt-1">
                            {asg.instructions}
                          </p>
                        )}
                      </div>
                      <div className="text-right space-y-1">
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium capitalize bg-amber-50 text-amber-700 border border-amber-200 dark:bg-amber-950/40 dark:text-amber-300">
                          {asg.status.replace('_', ' ')}
                        </span>
                        {asg.grade && (
                          <p className="text-xs font-bold text-emerald-600">Grade: {asg.grade}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 4: Exams & Deadlines */}
              {activeTab === 'exams' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Exams and Key Milestones
                  </h4>
                  {selectedSubject.exams.map((exam) => (
                    <div key={exam.id} className="p-4 rounded-xl border border-red-100 bg-red-50/30 dark:bg-red-950/20 dark:border-red-900/40 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-800 dark:bg-red-900/60 dark:text-red-300 uppercase">
                          Weight: {exam.weight}%
                        </span>
                        <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                          📅 {exam.date} at {exam.time}
                        </span>
                      </div>
                      <h5 className="font-bold text-sm text-slate-900 dark:text-white">
                        {exam.title}
                      </h5>
                      <p className="text-xs text-slate-600 dark:text-slate-400">
                        Venue: {exam.location || 'University Main Exam Hall'}
                      </p>
                      <div className="pt-2 border-t border-red-100 dark:border-red-900/40 flex flex-wrap gap-1.5">
                        {exam.topics.map((top) => (
                          <span key={top} className="text-[10px] bg-white dark:bg-slate-800 px-2 py-0.5 rounded border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                            ✓ {top}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 5: Review Schedule (Spaced Repetition) */}
              {activeTab === 'reviews' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Spaced Repetition Review Schedule
                  </h4>
                  {selectedSubject.reviewSchedule.map((rev) => (
                    <div key={rev.id} className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-bold text-slate-900 dark:text-white">{rev.topic}</p>
                        <p className="text-[11px] text-slate-500">Next Review: {rev.nextReviewDate} (Interval: {rev.intervalDays} days)</p>
                      </div>
                      <span className="text-xs px-2.5 py-1 rounded bg-teal-50 text-teal-700 dark:bg-teal-950/60 dark:text-teal-300 font-semibold">
                        Scheduled
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tab 6: Resource Links */}
              {activeTab === 'resources' && (
                <div className="space-y-3">
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                    Textbooks, WHO Guidelines & Research Papers
                  </h4>
                  {selectedSubject.resourceLinks.map((link) => (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl border border-slate-200 dark:border-slate-800 flex items-center justify-between hover:border-teal-500 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <ExternalLink className="w-4 h-4 text-teal-600 dark:text-teal-400" />
                        <div>
                          <p className="text-xs font-bold text-slate-900 dark:text-white">{link.title}</p>
                          <p className="text-[10px] text-slate-400 font-mono truncate max-w-md">{link.url}</p>
                        </div>
                      </div>
                      <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                        {link.type}
                      </span>
                    </a>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between">
              <button
                onClick={() => {
                  onOpenStudyTimerForSubject(selectedSubject.id);
                  setSelectedSubjectId(null);
                }}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
              >
                <Clock className="w-4 h-4" />
                Start Pomodoro for this Subject
              </button>

              <button
                onClick={() => setSelectedSubjectId(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-semibold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add New Subject Modal */}
      {isAddingSubject && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 w-full max-w-md shadow-2xl space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-200 dark:border-slate-800">
              <h3 className="font-bold text-slate-900 dark:text-white text-base">
                Add New Public Health Subject
              </h3>
              <button onClick={() => setIsAddingSubject(false)} className="text-slate-400 hover:text-slate-700">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateSubject} className="space-y-3">
              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Subject Name</label>
                <input
                  type="text"
                  placeholder="e.g. Health Information Systems (DHIS2)"
                  value={newSubName}
                  onChange={(e) => setNewSubName(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Course Code</label>
                <input
                  type="text"
                  placeholder="e.g. HIS-312"
                  value={newSubCode}
                  onChange={(e) => setNewSubCode(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Description</label>
                <textarea
                  rows={2}
                  placeholder="Summary of topics, clinical rotation, or goals..."
                  value={newSubDesc}
                  onChange={(e) => setNewSubDesc(e.target.value)}
                  className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Color Tag</label>
                <div className="flex gap-2 mt-1">
                  {['#0d9488', '#0284c7', '#d97706', '#059669', '#6366f1', '#ec4899', '#8b5cf6', '#f59e0b'].map((col) => (
                    <button
                      type="button"
                      key={col}
                      onClick={() => setNewSubColor(col)}
                      className={`w-6 h-6 rounded-full border-2 ${newSubColor === col ? 'ring-2 ring-teal-500 scale-110' : 'border-transparent'}`}
                      style={{ backgroundColor: col }}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setIsAddingSubject(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold"
                >
                  Create Subject
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

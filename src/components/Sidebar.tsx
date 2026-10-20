import React from 'react';
import {
  LayoutDashboard,
  User,
  BookOpen,
  CalendarDays,
  FileText,
  Calendar,
  CheckSquare,
  Clock,
  BookMarked,
  Sunrise,
  Sunset,
  Bot,
  Quote,
  Moon,
  BarChart3,
  Settings,
  X,
  GraduationCap,
} from 'lucide-react';
import { NavSection, Language, UserProfile } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface SidebarProps {
  activeSection: NavSection;
  onSelectSection: (section: NavSection) => void;
  language: Language;
  profile: UserProfile;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeSection,
  onSelectSection,
  language,
  profile,
  isOpenMobile,
  onCloseMobile,
}) => {
  const t = TRANSLATIONS[language];

  const navItems: {
    id: NavSection;
    label: string;
    icon: React.ReactNode;
    category?: 'academic' | 'islamic' | 'wellness' | 'system';
    badge?: string;
  }[] = [
    // Core
    { id: 'home', label: t.nav.home, icon: <LayoutDashboard className="w-4 h-4" /> },
    { id: 'profile', label: t.nav.profile, icon: <User className="w-4 h-4" /> },
    
    // Academic Management
    { id: 'subjects', label: t.nav.subjects, icon: <BookOpen className="w-4 h-4" />, category: 'academic', badge: '10' },
    { id: 'timetable', label: t.nav.timetable, icon: <CalendarDays className="w-4 h-4" />, category: 'academic' },
    { id: 'notes', label: t.nav.notes, icon: <FileText className="w-4 h-4" />, category: 'academic' },
    { id: 'calendar', label: t.nav.calendar, icon: <Calendar className="w-4 h-4" />, category: 'academic' },
    { id: 'tasks', label: t.nav.tasks, icon: <CheckSquare className="w-4 h-4" />, category: 'academic' },
    
    // Islamic Routine
    { id: 'prayer', label: t.nav.prayer, icon: <Clock className="w-4 h-4" />, category: 'islamic', badge: '5x' },
    { id: 'quran', label: t.nav.quran, icon: <BookMarked className="w-4 h-4" />, category: 'islamic' },
    
    // Fitness & Sleep
    { id: 'morning_exercise', label: t.nav.morningExercise, icon: <Sunrise className="w-4 h-4" />, category: 'wellness' },
    { id: 'evening_exercise', label: t.nav.eveningExercise, icon: <Sunset className="w-4 h-4" />, category: 'wellness' },
    { id: 'sleep', label: t.nav.sleep, icon: <Moon className="w-4 h-4" />, category: 'wellness', badge: '21:30' },
    
    // AI & Growth
    { id: 'ai_mentor', label: t.nav.aiMentor, icon: <Bot className="w-4 h-4" />, category: 'academic', badge: 'AI' },
    { id: 'motivation', label: t.nav.motivation, icon: <Quote className="w-4 h-4" />, category: 'wellness' },
    
    // Reports & Config
    { id: 'progress', label: t.nav.progress, icon: <BarChart3 className="w-4 h-4" />, category: 'system' },
    { id: 'settings', label: t.nav.settings, icon: <Settings className="w-4 h-4" />, category: 'system' },
  ];

  const handleNavClick = (section: NavSection) => {
    onSelectSection(section);
    onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpenMobile && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-950/60 backdrop-blur-xs lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-slate-900 text-slate-200 border-r border-slate-800 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static ${
          isOpenMobile ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Area */}
        <div className="p-4 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white shadow-lg shadow-teal-500/20 ring-1 ring-white/20">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-white tracking-wide">
                ASAD AWEYS
              </h1>
              <p className="text-[11px] font-semibold text-teal-400">
                Public Health Portal
              </p>
            </div>
          </div>

          <button
            onClick={onCloseMobile}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Card Pill */}
        <div className="mx-3 mt-3 p-3 rounded-xl bg-slate-800/80 border border-slate-700/60 flex items-center gap-3">
          <img
            src={profile.avatarUrl}
            alt={profile.name}
            className="w-10 h-10 rounded-lg object-cover ring-2 ring-teal-500/40"
          />
          <div className="min-w-0 flex-1">
            <p className="text-xs font-bold text-white truncate">{profile.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{profile.university}</p>
            <div className="flex items-center gap-1.5 mt-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-[9px] uppercase tracking-wider text-emerald-400 font-bold">
                Active Student
              </span>
            </div>
          </div>
        </div>

        {/* Navigation Items List */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-150 ${
                  isActive
                    ? 'bg-gradient-to-r from-teal-600 to-teal-700 text-white shadow-md shadow-teal-900/30 font-bold'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className={`${isActive ? 'text-white' : 'text-slate-400 group-hover:text-teal-400'}`}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </div>

                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-bold ${
                      isActive
                        ? 'bg-white/20 text-white'
                        : item.badge === 'AI'
                        ? 'bg-teal-500/20 text-teal-300 border border-teal-500/30'
                        : 'bg-slate-800 text-slate-400 border border-slate-700'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Footer info: target bedtime & academic motivation */}
        <div className="p-3 border-t border-slate-800 bg-slate-950/40">
          <div className="p-2.5 rounded-lg bg-teal-950/30 border border-teal-800/40">
            <div className="flex items-center justify-between text-[11px] font-bold text-teal-300">
              <span className="flex items-center gap-1.5">
                <Moon className="w-3.5 h-3.5 text-teal-400" />
                Bedtime Target
              </span>
              <span className="font-mono bg-teal-900/60 px-1.5 py-0.5 rounded text-white">
                21:30
              </span>
            </div>
            <p className="text-[10px] text-slate-400 mt-1">
              Wind-down alert scheduled at 21:00 (30 min prior).
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

import React, { useState } from 'react';
import {
  FileText,
  Search,
  ExternalLink,
  Plus,
  BookOpen,
  Tag,
  Calendar,
  Share2,
  Copy,
  Bookmark,
} from 'lucide-react';
import { Subject, Language, SubjectNote } from '../types';
import { TRANSLATIONS } from '../utils/i18n';

interface NotesSectionProps {
  subjects: Subject[];
  language: Language;
  onUpdateSubjects: (updated: Subject[]) => void;
}

export const NotesSection: React.FC<NotesSectionProps> = ({
  subjects,
  language,
  onUpdateSubjects,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState('all');
  const [selectedNote, setSelectedNote] = useState<{ note: SubjectNote; subjectName: string; subjectCode: string } | null>(null);

  // External authoritative public health portals
  const publicHealthResources = [
    {
      title: 'PubMed Central (PMC) - Open Access Biomedical Research',
      description: 'Free archive of biomedical and life sciences journal literature at the U.S. National Institutes of Health.',
      url: 'https://www.ncbi.nlm.nih.gov/pmc/',
      tag: 'Research Literature',
    },
    {
      title: 'World Health Organization (WHO) Guidelines & IHR',
      description: 'Official global health standards, epidemiological bulletins, disease outbreak news, and International Health Regulations.',
      url: 'https://www.who.int/publications',
      tag: 'Global Guidelines',
    },
    {
      title: 'STROBE Statement - Reporting Observational Studies',
      description: 'Strengthening the Reporting of Observational Studies in Epidemiology (cohort, case-control, and cross-sectional studies).',
      url: 'https://www.strobe-statement.org',
      tag: 'Epidemiology Tools',
    },
    {
      title: 'CDC Public Health Image & Case Library',
      description: 'Public health training modules, outbreak investigations, and epidemiological surveillance case studies.',
      url: 'https://phil.cdc.gov',
      tag: 'Case Studies',
    },
    {
      title: 'FAO / WHO Codex Alimentarius - Food & Meat Hygiene',
      description: 'International food standards, codes of hygienic practice for fresh meat, and food safety standards.',
      url: 'https://www.fao.org/fao-who-codexalimentarius/en/',
      tag: 'Food Safety',
    },
  ];

  // Flatten all notes from subjects
  const allNotes = subjects.flatMap((s) =>
    s.notes.map((n) => ({
      note: n,
      subjectId: s.id,
      subjectName: s.name,
      subjectCode: s.code,
      color: s.color,
    }))
  );

  const filteredNotes = allNotes.filter((item) => {
    const matchesFilter =
      selectedSubjectFilter === 'all' || item.subjectId === selectedSubjectFilter;
    const matchesSearch =
      item.note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.note.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.subjectName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-sky-950 via-slate-900 to-teal-950 rounded-2xl p-6 sm:p-8 text-white border border-sky-900/40 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/20 border border-sky-400/30 text-sky-300 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            <span>Academic Knowledge Base</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Notes & Public Health Resources
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Consolidated lecture summaries, biostatistics formulas, and direct links to global health repositories.
          </p>
        </div>

        {/* Search & Filter */}
        <div className="space-y-2 min-w-[240px]">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search all notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-xl bg-white/10 border border-white/20 text-white placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400"
            />
          </div>

          <select
            value={selectedSubjectFilter}
            onChange={(e) => setSelectedSubjectFilter(e.target.value)}
            className="w-full text-xs font-bold bg-slate-900/90 text-white border border-sky-500/40 rounded-xl px-3 py-2"
          >
            <option value="all">All 10 Subjects ({allNotes.length} notes)</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.code}: {s.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Grid: Notes Cards on Left, Resource Links on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Notes Cards */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex justify-between items-center text-xs font-bold text-slate-500 dark:text-slate-400">
            <span>Showing {filteredNotes.length} notes</span>
          </div>

          <div className="space-y-3">
            {filteredNotes.map((item) => (
              <div
                key={item.note.id}
                onClick={() => setSelectedNote(item)}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-sky-500/50 cursor-pointer transition-all shadow-xs space-y-2.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white"
                      style={{ backgroundColor: item.color }}
                    >
                      {item.subjectCode}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      {item.subjectName}
                    </span>
                  </div>
                  <span className="text-[11px] font-mono text-slate-400">
                    {item.note.date}
                  </span>
                </div>

                <h4 className="font-bold text-base text-slate-900 dark:text-white">
                  {item.note.title}
                </h4>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {item.note.summary}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800 text-xs">
                  <div className="flex gap-1.5">
                    {item.note.tags.map((t) => (
                      <span key={t} className="text-[10px] bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded text-slate-500">
                        #{t}
                      </span>
                    ))}
                  </div>
                  <span className="text-sky-600 dark:text-sky-400 font-semibold text-xs">
                    Read Note →
                  </span>
                </div>
              </div>
            ))}

            {filteredNotes.length === 0 && (
              <div className="text-center py-12 text-slate-400 text-xs bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                No lecture notes match your search. You can add notes inside individual subject cards in "My Subjects".
              </div>
            )}
          </div>
        </div>

        {/* Right Col: Authoritative Medical & Public Health Links */}
        <div className="space-y-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl p-5 border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
            <div className="pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-sky-600" />
                Global Public Health Portals
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Primary scientific references for coursework, literature reviews, and research methodology.
              </p>
            </div>

            <div className="space-y-3">
              {publicHealthResources.map((res, idx) => (
                <a
                  key={idx}
                  href={res.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:border-sky-500 hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-all space-y-1 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 dark:text-sky-400">
                      {res.tag}
                    </span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-sky-600" />
                  </div>
                  <h5 className="font-bold text-xs text-slate-900 dark:text-white leading-snug">
                    {res.title}
                  </h5>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {res.description}
                  </p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Note Reader Modal */}
      {selectedNote && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 w-full max-w-2xl shadow-2xl space-y-4">
            <div className="flex justify-between items-start pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300">
                  {selectedNote.subjectCode} • {selectedNote.subjectName}
                </span>
                <h3 className="font-bold text-lg text-slate-900 dark:text-white mt-1">
                  {selectedNote.note.title}
                </h3>
                <p className="text-xs text-slate-500">
                  📅 Lecture Date: {selectedNote.note.date}
                </p>
              </div>
              <button onClick={() => setSelectedNote(null)} className="text-slate-400 hover:text-slate-700 text-lg font-bold">
                ✕
              </button>
            </div>

            <div className="p-3 bg-sky-50 dark:bg-slate-800/60 rounded-xl text-xs text-sky-900 dark:text-sky-200 font-medium">
              💡 {selectedNote.note.summary}
            </div>

            <div className="max-h-[350px] overflow-y-auto p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 text-xs sm:text-sm font-mono whitespace-pre-wrap text-slate-800 dark:text-slate-200 leading-relaxed">
              {selectedNote.note.content}
            </div>

            <div className="flex justify-between items-center pt-3 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedNote.note.content);
                  alert('Note content copied to clipboard!');
                }}
                className="inline-flex items-center gap-1.5 text-xs text-teal-600 font-semibold hover:underline"
              >
                <Copy className="w-3.5 h-3.5" />
                Copy Full Note
              </button>

              <button
                onClick={() => setSelectedNote(null)}
                className="px-4 py-2 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

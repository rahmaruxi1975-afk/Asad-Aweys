import React, { useState } from 'react';
import {
  User,
  Camera,
  GraduationCap,
  Mail,
  Building,
  Hash,
  BookOpen,
  Award,
  Save,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { UserProfile, Language } from '../types';
import { TRANSLATIONS } from '../utils/i18n';
import { playChimeSound } from '../utils/storage';

interface ProfileSectionProps {
  profile: UserProfile;
  language: Language;
  onUpdateProfile: (updated: UserProfile) => void;
}

export const ProfileSection: React.FC<ProfileSectionProps> = ({
  profile,
  language,
  onUpdateProfile,
}) => {
  const [formData, setFormData] = useState<UserProfile>(profile);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Url = reader.result as string;
        setFormData((prev) => ({ ...prev, avatarUrl: base64Url }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateProfile(formData);
    playChimeSound('complete');
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="bg-gradient-to-r from-slate-900 via-sky-950 to-teal-950 rounded-2xl p-6 sm:p-8 text-white border border-slate-800 shadow-xl flex flex-col sm:flex-row items-center gap-6">
        <div className="relative group">
          <img
            src={formData.avatarUrl}
            alt={formData.name}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover ring-4 ring-teal-500/50 shadow-2xl"
          />
          <label className="absolute bottom-1 right-1 p-2 rounded-xl bg-teal-600 hover:bg-teal-500 text-white cursor-pointer shadow-lg transition-transform hover:scale-105">
            <Camera className="w-4 h-4" />
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
        </div>

        <div className="space-y-2 text-center sm:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-semibold">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>{formData.degree}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            {formData.name}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            {formData.university} • Student ID: <span className="font-mono text-teal-300">{formData.studentId}</span>
          </p>
        </div>
      </div>

      {/* Profile Edit Form */}
      <div className="bg-white dark:bg-slate-900 rounded-2xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <User className="w-5 h-5 text-teal-600" />
              Student Academic Profile
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Update your personal photograph, university degree credentials, and public health scholar biography.
            </p>
          </div>

          {savedSuccess && (
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              <CheckCircle2 className="w-4 h-4" />
              Saved Successfully!
            </span>
          )}
        </div>

        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 font-semibold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Degree & Specialization</label>
              <input
                type="text"
                value={formData.degree}
                onChange={(e) => setFormData({ ...formData, degree: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 font-semibold"
                required
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">University Faculty</label>
              <input
                type="text"
                value={formData.university}
                onChange={(e) => setFormData({ ...formData, university: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Student ID Number</label>
              <input
                type="text"
                value={formData.studentId}
                onChange={(e) => setFormData({ ...formData, studentId: e.target.value })}
                className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 font-mono"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Short Biography & Public Health Vision</label>
            <textarea
              rows={4}
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full mt-1 px-3 py-2 text-xs rounded-xl border bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-700 leading-relaxed"
            />
          </div>

          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-md transition-all"
            >
              <Save className="w-4 h-4" />
              Save Profile Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { UserPlus, Save, X, Sparkles, BookOpen, Layers, User } from 'lucide-react';

export default function StudentForm({
  editingStudent,
  onSave,
  onCancelEdit,
  isSubmitting,
}) {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    course: '',
    section: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingStudent) {
      setFormData({
        firstname: editingStudent.firstname || '',
        lastname: editingStudent.lastname || '',
        course: editingStudent.course || '',
        section: editingStudent.section || '',
      });
      setErrors({});
    } else {
      setFormData({
        firstname: '',
        lastname: '',
        course: '',
        section: '',
      });
      setErrors({});
    }
  }, [editingStudent]);

  const validate = () => {
    const newErrors = {};
    if (!formData.firstname.trim()) newErrors.firstname = 'First name is required';
    if (!formData.lastname.trim()) newErrors.lastname = 'Last name is required';
    if (!formData.course.trim()) newErrors.course = 'Course is required';
    if (!formData.section.trim()) newErrors.section = 'Section is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    onSave(formData);
  };

  const handleClear = () => {
    setFormData({
      firstname: '',
      lastname: '',
      course: '',
      section: '',
    });
    setErrors({});
    if (editingStudent) {
      onCancelEdit();
    }
  };

  const isEditing = Boolean(editingStudent);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden sticky top-20">
      <div
        className={`px-5 py-4 border-b flex items-center justify-between ${
          isEditing
            ? 'bg-amber-50/70 border-amber-200/60'
            : 'bg-slate-50 border-slate-200'
        }`}
      >
        <div className="flex items-center gap-2.5">
          <div
            className={`w-8 h-8 rounded-lg flex items-center justify-center ${
              isEditing ? 'bg-amber-500 text-white' : 'bg-indigo-600 text-white'
            }`}
          >
            {isEditing ? <Save className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              {isEditing ? `Edit Student (ID: ${editingStudent.id})` : 'Add New Student'}
            </h2>
            <p className="text-xs text-slate-500">
              {isEditing ? 'Modify student details below' : 'Fill out all fields to register'}
            </p>
          </div>
        </div>

        {isEditing && (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold bg-amber-100 text-amber-800">
            Editing Mode
          </span>
        )}
      </div>

      <form onSubmit={handleSubmit} className="p-5 space-y-4">
        {/* First Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            First Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="firstname"
              value={formData.firstname}
              onChange={handleChange}
              placeholder="e.g. John"
              className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 hover:bg-white focus:bg-white border rounded-xl transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.firstname
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-200 focus:border-indigo-600'
              }`}
            />
          </div>
          {errors.firstname && (
            <p className="text-xs text-rose-500 mt-1">{errors.firstname}</p>
          )}
        </div>

        {/* Last Name */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Last Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <User className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="lastname"
              value={formData.lastname}
              onChange={handleChange}
              placeholder="e.g. Doe"
              className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 hover:bg-white focus:bg-white border rounded-xl transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.lastname
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-200 focus:border-indigo-600'
              }`}
            />
          </div>
          {errors.lastname && (
            <p className="text-xs text-rose-500 mt-1">{errors.lastname}</p>
          )}
        </div>

        {/* Course */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Course / Program <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <BookOpen className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="course"
              value={formData.course}
              onChange={handleChange}
              placeholder="e.g. BSIT, BSCS, BSIS"
              list="course-suggestions"
              className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 hover:bg-white focus:bg-white border rounded-xl transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.course
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-200 focus:border-indigo-600'
              }`}
            />
            <datalist id="course-suggestions">
              <option value="BSIT" />
              <option value="BSCS" />
              <option value="BSIS" />
              <option value="BSEMC" />
              <option value="ACT" />
            </datalist>
          </div>
          {errors.course && (
            <p className="text-xs text-rose-500 mt-1">{errors.course}</p>
          )}
        </div>

        {/* Section */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1">
            Section <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Layers className="w-4 h-4" />
            </div>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              placeholder="e.g. 3A, 2B, 4C"
              className={`w-full pl-9 pr-3 py-2 text-sm bg-slate-50 hover:bg-white focus:bg-white border rounded-xl transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 ${
                errors.section
                  ? 'border-rose-400 focus:border-rose-500'
                  : 'border-slate-200 focus:border-indigo-600'
              }`}
            />
          </div>
          {errors.section && (
            <p className="text-xs text-rose-500 mt-1">{errors.section}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="pt-2 flex items-center gap-2">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`flex-1 inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl text-sm font-semibold text-white shadow-sm transition-all disabled:opacity-60 cursor-pointer ${
              isEditing
                ? 'bg-amber-600 hover:bg-amber-700 active:bg-amber-800'
                : 'bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800'
            }`}
          >
            {isSubmitting ? (
              <span className="inline-flex items-center gap-2">
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
                Saving...
              </span>
            ) : isEditing ? (
              <>
                <Save className="w-4 h-4" />
                Update Student
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4" />
                Save Student
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleClear}
            disabled={isSubmitting}
            className="px-3.5 py-2.5 text-sm font-medium text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors cursor-pointer"
            title={isEditing ? 'Cancel editing' : 'Clear all fields'}
          >
            {isEditing ? 'Cancel' : 'Clear'}
          </button>
        </div>
      </form>
    </div>
  );
}

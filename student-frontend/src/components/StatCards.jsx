import React from 'react';
import { Users, BookOpen, Layers } from 'lucide-react';

export default function StatCards({ students = [] }) {
  const totalStudents = students.length;
  const distinctCourses = new Set(students.map((s) => s.course?.trim()).filter(Boolean)).size;
  const distinctSections = new Set(students.map((s) => s.section?.trim()).filter(Boolean)).size;

  const stats = [
    {
      label: 'Total Students',
      value: totalStudents,
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-100',
    },
    {
      label: 'Unique Courses',
      value: distinctCourses,
      icon: BookOpen,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-100',
    },
    {
      label: 'Active Sections',
      value: distinctSections,
      icon: Layers,
      color: 'text-violet-600',
      bgColor: 'bg-violet-50',
      borderColor: 'border-violet-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
      {stats.map((item, idx) => {
        const Icon = item.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-slate-200 p-4 shadow-xs flex items-center justify-between"
          >
            <div>
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                {item.label}
              </p>
              <p className="text-2xl font-bold text-slate-900 mt-1">{item.value}</p>
            </div>
            <div className={`w-12 h-12 rounded-xl ${item.bgColor} ${item.borderColor} border flex items-center justify-center shrink-0`}>
              <Icon className={`w-6 h-6 ${item.color}`} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

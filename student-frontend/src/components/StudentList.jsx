import React, { useState, useMemo } from 'react';
import { Search, Filter, Users, ArrowUpDown } from 'lucide-react';
import StudentRow from './StudentRow';

export default function StudentList({
  students = [],
  isLoading,
  editingStudent,
  onEditStudent,
  onDeleteStudent,
  isDeletingId,
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('ALL');
  const [sortBy, setSortBy] = useState('id-desc');

  // Available courses for filter dropdown
  const courses = useMemo(() => {
    const list = Array.from(
      new Set(students.map((s) => s.course?.trim()).filter(Boolean))
    );
    return list.sort();
  }, [students]);

  // Filtered and sorted students
  const filteredStudents = useMemo(() => {
    let result = students.filter((student) => {
      const matchesSearch =
        `${student.firstname || ''} ${student.lastname || ''} ${student.course || ''} ${student.section || ''} ${student.id || ''}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase());

      const matchesCourse =
        selectedCourse === 'ALL' || student.course === selectedCourse;

      return matchesSearch && matchesCourse;
    });

    result.sort((a, b) => {
      if (sortBy === 'id-desc') return (b.id || 0) - (a.id || 0);
      if (sortBy === 'id-asc') return (a.id || 0) - (b.id || 0);
      if (sortBy === 'name-asc') {
        const nameA = `${a.lastname} ${a.firstname}`.toLowerCase();
        const nameB = `${b.lastname} ${b.firstname}`.toLowerCase();
        return nameA.localeCompare(nameB);
      }
      if (sortBy === 'course-asc') {
        return (a.course || '').localeCompare(b.course || '');
      }
      return 0;
    });

    return result;
  }, [students, searchTerm, selectedCourse, sortBy]);

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
      {/* Search and Filters Header */}
      <div className="p-4 sm:p-5 border-b border-slate-200 bg-white">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, ID, course, section..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-slate-50 hover:bg-white focus:bg-white border border-slate-200 rounded-xl transition-all outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-xs text-slate-400 hover:text-slate-600"
              >
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {/* Filter by Course */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <Filter className="w-3.5 h-3.5" />
              </div>
              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="pl-8 pr-7 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer"
              >
                <option value="ALL">All Courses</option>
                {courses.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-slate-400">
                <ArrowUpDown className="w-3.5 h-3.5" />
              </div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="pl-8 pr-7 py-2 text-xs font-medium text-slate-700 bg-slate-50 hover:bg-white border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 cursor-pointer"
              >
                <option value="id-desc">Newest First</option>
                <option value="id-asc">Oldest First</option>
                <option value="name-asc">Name (A-Z)</option>
                <option value="course-asc">Course</option>
              </select>
            </div>
          </div>
        </div>

        {/* Status Count Line */}
        <div className="mt-3 flex items-center justify-between text-xs text-slate-500">
          <span>
            Showing <strong className="text-slate-900 font-semibold">{filteredStudents.length}</strong>{' '}
            of <strong className="text-slate-900 font-semibold">{students.length}</strong> students
          </span>
          {(searchTerm || selectedCourse !== 'ALL') && (
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCourse('ALL');
              }}
              className="text-indigo-600 hover:text-indigo-700 font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/80 border-b border-slate-200 text-xs font-semibold text-slate-500 uppercase tracking-wider">
              <th className="py-3 px-4">ID</th>
              <th className="py-3 px-4">Student Name</th>
              <th className="py-3 px-4 hidden sm:table-cell">Course</th>
              <th className="py-3 px-4 hidden sm:table-cell">Section</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && students.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-400">
                  <div className="inline-flex flex-col items-center gap-2">
                    <span className="w-6 h-6 border-2 border-indigo-600 border-t-transparent rounded-full animate-spin"></span>
                    <span className="text-sm">Loading students from API...</span>
                  </div>
                </td>
              </tr>
            ) : filteredStudents.length === 0 ? (
              <tr>
                <td colSpan="5" className="py-12 text-center text-slate-500">
                  <div className="max-w-xs mx-auto flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 mb-3">
                      <Users className="w-6 h-6" />
                    </div>
                    <p className="font-semibold text-slate-800 text-sm">
                      {students.length === 0
                        ? 'No students found'
                        : 'No matching students'}
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      {students.length === 0
                        ? 'Use the form on the left to add your first student record.'
                        : 'Try adjusting your search criteria or filter options.'}
                    </p>
                  </div>
                </td>
              </tr>
            ) : (
              filteredStudents.map((student) => (
                <StudentRow
                  key={student.id}
                  student={student}
                  isEditing={editingStudent?.id === student.id}
                  onEdit={onEditStudent}
                  onDelete={onDeleteStudent}
                  isDeleting={isDeletingId === student.id}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

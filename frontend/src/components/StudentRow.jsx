import React, { useState } from 'react';
import { Pencil, Trash2, Check, X, AlertTriangle } from 'lucide-react';

export default function StudentRow({
  student,
  isEditing,
  onEdit,
  onDelete,
  isDeleting,
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);

  return (
    <tr
      className={`border-b border-slate-100 transition-colors ${
        isEditing
          ? 'bg-amber-50/50 hover:bg-amber-50'
          : confirmDelete
          ? 'bg-rose-50/40 hover:bg-rose-50/60'
          : 'hover:bg-slate-50/80'
      }`}
    >
      {/* Student ID */}
      <td className="py-3.5 px-4 text-xs font-mono font-medium text-slate-500 whitespace-nowrap">
        #{student.id}
      </td>

      {/* Full Name */}
      <td className="py-3.5 px-4">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-xs uppercase shrink-0">
            {student.firstname?.[0] || '?'}{student.lastname?.[0] || ''}
          </div>
          <div>
            <div className="font-semibold text-sm text-slate-900">
              {student.firstname} {student.lastname}
            </div>
            <div className="text-xs text-slate-400 sm:hidden">
              {student.course} • Sec {student.section}
            </div>
          </div>
        </div>
      </td>

      {/* Course Badge */}
      <td className="py-3.5 px-4 hidden sm:table-cell">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200/60">
          {student.course || '—'}
        </span>
      </td>

      {/* Section Badge */}
      <td className="py-3.5 px-4 hidden sm:table-cell">
        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-100 text-slate-700">
          {student.section || '—'}
        </span>
      </td>

      {/* Actions (NO MODALS - Inline Confirmation) */}
      <td className="py-3.5 px-4 text-right whitespace-nowrap">
        {confirmDelete ? (
          <div className="inline-flex items-center gap-1.5 p-1 bg-white border border-rose-200 rounded-xl shadow-xs animate-in fade-in duration-150">
            <span className="text-xs font-medium text-rose-700 px-1.5 flex items-center gap-1">
              <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
              Confirm?
            </span>
            <button
              onClick={() => {
                onDelete(student.id);
                setConfirmDelete(false);
              }}
              disabled={isDeleting}
              className="px-2 py-1 bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer"
              title="Confirm permanent deletion"
            >
              {isDeleting ? '...' : <Check className="w-3.5 h-3.5" />}
              Delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              disabled={isDeleting}
              className="px-2 py-1 bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              title="Cancel deletion"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="inline-flex items-center gap-1">
            <button
              onClick={() => onEdit(student)}
              className={`p-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                isEditing
                  ? 'bg-amber-100 text-amber-800'
                  : 'text-slate-600 hover:text-indigo-600 hover:bg-indigo-50'
              }`}
              title="Edit student"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="p-1.5 rounded-lg text-xs font-medium text-slate-600 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
              title="Delete student"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

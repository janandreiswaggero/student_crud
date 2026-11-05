import React, { useState, useEffect, useCallback, useRef } from 'react';
import Header from './components/Header';
import StatCards from './components/StatCards';
import AlertBanner from './components/AlertBanner';
import StudentForm from './components/StudentForm';
import StudentList from './components/StudentList';
import { studentService } from './services/studentService';

export default function App() {
  const [students, setStudents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeletingId, setIsDeletingId] = useState(null);
  const [editingStudent, setEditingStudent] = useState(null);
  const [alert, setAlert] = useState(null);

  const formSectionRef = useRef(null);

  const showAlert = useCallback((type, message) => {
    setAlert({ type, message });
  }, []);

  const dismissAlert = useCallback(() => {
    setAlert(null);
  }, []);

  // Fetch all students from API
  const loadStudents = useCallback(async (isManualRefresh = false) => {
    if (isManualRefresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const data = await studentService.getAll();
      setStudents(Array.isArray(data) ? data : []);
      if (isManualRefresh) {
        showAlert('info', 'Student records updated from API.');
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      showAlert(
        'error',
        `Unable to reach backend API at /teresa/students: ${err.message}. Please ensure your Spring Boot server is running.`
      );
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [showAlert]);

  useEffect(() => {
    loadStudents();
  }, [loadStudents]);

  // Handle Save (Create or Update)
  const handleSaveStudent = async (formData) => {
    setIsSubmitting(true);
    try {
      if (editingStudent) {
        // UPDATE Existing
        const updated = await studentService.update(editingStudent.id, formData);
        setStudents((prev) =>
          prev.map((s) => (s.id === editingStudent.id ? updated : s))
        );
        showAlert(
          'success',
          `Successfully updated student ${updated.firstname} ${updated.lastname} (ID: ${updated.id})`
        );
        setEditingStudent(null);
      } else {
        // CREATE New
        const created = await studentService.create(formData);
        setStudents((prev) => [created, ...prev]);
        showAlert(
          'success',
          `Successfully added ${created.firstname} ${created.lastname} (ID: ${created.id})`
        );
      }
    } catch (err) {
      console.error('Error saving student:', err);
      showAlert('error', `Failed to save student: ${err.message}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Trigger Edit
  const handleEditStudent = (student) => {
    setEditingStudent(student);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Cancel Edit
  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  // Delete Student
  const handleDeleteStudent = async (id) => {
    setIsDeletingId(id);
    try {
      await studentService.delete(id);
      setStudents((prev) => prev.filter((s) => s.id !== id));
      if (editingStudent?.id === id) {
        setEditingStudent(null);
      }
      showAlert('success', `Student #${id} deleted successfully.`);
    } catch (err) {
      console.error('Error deleting student:', err);
      showAlert('error', `Failed to delete student #${id}: ${err.message}`);
    } finally {
      setIsDeletingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <Header
        onRefresh={() => loadStudents(true)}
        isRefreshing={isRefreshing}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <AlertBanner alert={alert} onDismiss={dismissAlert} />

        <StatCards students={students} />

        {/* Modal-Free Responsive Two-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Form Card (Sticky on desktop) */}
          <div ref={formSectionRef} className="lg:col-span-4">
            <StudentForm
              editingStudent={editingStudent}
              onSave={handleSaveStudent}
              onCancelEdit={handleCancelEdit}
              isSubmitting={isSubmitting}
            />
          </div>

          {/* Right Column: Student Table Directory */}
          <div className="lg:col-span-8">
            <StudentList
              students={students}
              isLoading={isLoading}
              editingStudent={editingStudent}
              onEditStudent={handleEditStudent}
              onDeleteStudent={handleDeleteStudent}
              isDeletingId={isDeletingId}
            />
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-slate-200 bg-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs text-slate-500">
          Student CRUD System • Vite + React + Tailwind CSS • Connected to Spring Boot JPA
        </div>
      </footer>
    </div>
  );
}

# Student Management CRUD Web Application

A modern, responsive, modal-free CRUD frontend built with **Vite**, **React**, and **Tailwind CSS**, designed to interface with the Spring Boot Student REST API.

## 🛠️ Tech Stack & Features
- **Frontend**: Vite 8, React 19, Tailwind CSS v4, Lucide Icons
- **Modal-Free Design**:
  - **Create / Edit Form**: Inline sticky panel that dynamically switches between "Add Student" and "Edit Student #ID" modes.
  - **Inline Delete Safety**: Two-step inline confirmation per table row (prevents accidental deletions without annoying popups).
  - **Real-Time Search & Filter**: Instant filtering across name, student ID, course, and section.
  - **Stat Overview**: Real-time KPI cards for Total Students, Enrolled Courses, and Active Sections.
  - **Toast / Alert Notifications**: Auto-dismissing status banner for operation feedback.
- **Backend API**: Spring Boot (`/teresa/students`) with JPA / Hibernate.

---

## 🚀 How to Run

### 1. Start the Spring Boot Backend
Make sure your Spring Boot backend is running on `http://localhost:8080`.
The endpoints accessed are:
- `GET /teresa/students`
- `GET /teresa/students/{id}`
- `POST /teresa/students`
- `PUT /teresa/students/{id}`
- `DELETE /teresa/students/{id}`

### 2. Start the Frontend Dev Server
In this directory (`student-frontend`):

```bash
# Install dependencies (already installed)
npm install

# Start Vite dev server with proxy
npm run dev
```

Open your browser to `http://localhost:5173`.
All requests to `/teresa/*` are automatically proxied to `http://localhost:8080` without any CORS configuration required on the backend.

### 3. Production Build
```bash
npm run build
npm run preview
```

# Student CRUD Application - Project Context & Implementation Details

## 1. Project Overview
This project provides a complete CRUD (Create, Read, Update, Delete) web interface for managing student records.
- **Frontend Stack**: Vite 8 + React 19 (JavaScript) + **Tailwind CSS v4** + `lucide-react`
- **UI Architecture**: **No Modals** (Card / Split-panel layout with inline sticky form & inline row delete confirmation)
- **Backend Stack**: Spring Boot (REST API with Spring Data JPA)
- **Backend Location**: `D:\TERESA\DA3A\STUDENT-CRUD\student`
- **Frontend Location**: `D:\TERESA\DA3A\STUDENT-CRUD\student-frontend`
- **Status**: ✅ **Implemented and Verified** (`npm run build` passing)

---

## 2. API Contract & Data Model

### Data Model (`Student`)
Defined in [`Student.java`](file:///D:/TERESA/DA3A/STUDENT-CRUD/student/Student.java):
| Field | Type | Description |
|---|---|---|
| `id` | Integer | Auto-generated Primary Key |
| `firstname` | String | Student's first name |
| `lastname` | String | Student's last name |
| `course` | String | Degree program (e.g. BSIT, BSCS, BSIS) |
| `section` | String | Section name / year section (e.g. 3A, 2B) |

### REST Endpoints
Defined in [`StudentController.java`](file:///D:/TERESA/DA3A/STUDENT-CRUD/student/StudentController.java):
Base Path: `/teresa/students`

| Method | Endpoint | Description | Payload / Response |
|---|---|---|---|
| `GET` | `/teresa/students` | Get all students | `200 OK` (Array of students) |
| `GET` | `/teresa/students/{id}` | Get student by ID | `200 OK` or `404 Not Found` |
| `POST` | `/teresa/students` | Create student | Body: `{ firstname, lastname, course, section }` -> `201 Created` |
| `PUT` | `/teresa/students/{id}` | Update student | Body: `{ firstname, lastname, course, section }` -> `200 OK` |
| `DELETE` | `/teresa/students/{id}` | Delete student | `200 OK` ("Student with id {id} deleted.") |

---

## 3. Proxy & Network Architecture
The Vite dev server (`vite.config.js`) proxies all API calls targeting `/teresa` to `http://localhost:8080`, bypassing browser CORS limitations seamlessly:
```javascript
server: {
  port: 5173,
  proxy: {
    '/teresa': {
      target: 'http://localhost:8080',
      changeOrigin: true,
      secure: false
    }
  }
}
```

---

## 4. Implemented Frontend Architecture

```
student-frontend/
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── src/
│   ├── main.jsx                     # Application entry point
│   ├── App.jsx                      # Main controller & state orchestrator
│   ├── index.css                    # Tailwind CSS base styles
│   ├── services/
│   │   └── studentService.js        # API service wrapper for fetch CRUD
│   └── components/
│       ├── Header.jsx               # Navigation bar, branding & refresh button
│       ├── StatCards.jsx            # Dynamic counts (Students, Courses, Sections)
│       ├── AlertBanner.jsx          # Auto-dismissing success/error banner
│       ├── StudentForm.jsx          # Sticky form panel for Add / Edit (No Modal)
│       ├── StudentList.jsx          # Table directory, search, course filter & sort
│       └── StudentRow.jsx           # Row with inline 2-step delete safety (No Modal)
```

---

## 5. Verification
- Production bundle compiled with `vite build`:
  - `dist/index.html` (0.51 kB)
  - `dist/assets/index-*.css` (24.41 kB)
  - `dist/assets/index-*.js` (250.94 kB)
- Zero build errors.

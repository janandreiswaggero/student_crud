# Student CRUD Application - Project Context & Render Deployment Guide

## 1. Project Overview
A complete CRUD application for managing student records.
- **Frontend Stack**: Vite + React (JavaScript) + Tailwind CSS v4 + `lucide-react`
- **Frontend Architecture**: Modal-Free Design (Inline sticky form panel for Add/Edit, inline two-step confirmation for row deletions)
- **Backend Stack**: Spring Boot (Java 21, JPA/Hibernate, PostgreSQL, REST API)
- **Deployment Platform**: Render.com Blueprint (`render.yaml`)

---

## 2. Render Blueprint Specification (`render.yaml`)

Based on the [reference blueprint](https://github.com/rnvelascoua/student-crud/blob/main/render.yaml):

```yaml
services:
  # ── Backend (Docker) ─────────────────────────────────────────────────────────
  - type: web
    name: student-backend
    env: docker
    plan: free
    dockerfilePath: ./student/Dockerfile
    dockerContext: ./student
    envVars:
      - key: DB_HOST
        fromDatabase:
          name: student-db
          property: host
      - key: DB_PORT
        fromDatabase:
          name: student-db
          property: port
      - key: DB_NAME
        fromDatabase:
          name: student-db
          property: database
      - key: DATABASE_USERNAME
        fromDatabase:
          name: student-db
          property: user
      - key: DATABASE_PASSWORD
        fromDatabase:
          name: student-db
          property: password
      - key: CORS_ALLOWED_ORIGINS
        value: "*"
      - key: DB_SSL_MODE
        value: require
      - key: PORT
        value: "8080"

  # ── Frontend (Static) ────────────────────────────────────────────────────────
  - type: web
    name: student-frontend
    env: static
    buildCommand: cd frontend && npm install && npm run build
    staticPublishPath: frontend/dist
    routes:
      - type: rewrite
        source: /*
        destination: /index.html
    envVars:
      - key: VITE_API_BASE_URL
        fromService:
          type: web
          name: student-backend
          property: host

databases:
  - name: student-db
    plan: free
    databaseName: db_student
```

---

## 3. Directory Layout

```
STUDENT-CRUD/
├── render.yaml                          # Render Blueprint infrastructure definition
├── README.md                            # Setup and deployment instructions
├── CONTEXT.md                           # Project context and architectural notes
├── .gitignore                           # Git ignore rules for Maven & Node
│
├── frontend/                            # Vite + React + Tailwind frontend
│   ├── package.json
│   ├── vite.config.js                   # Configured with proxy for local dev
│   ├── index.html
│   └── src/
│       ├── main.jsx
│       ├── App.jsx                      # Main dashboard controller
│       ├── index.css                    # Tailwind CSS imports
│       ├── services/
│       │   └── studentService.js        # Dynamic API URL resolution for Render
│       └── components/
│           ├── Header.jsx               # Branding & refresh
│           ├── StatCards.jsx            # Dynamic counts
│           ├── AlertBanner.jsx          # Operation feedback
│           ├── StudentForm.jsx          # Sticky form (No Modal)
│           ├── StudentList.jsx          # Table with search & filters
│           └── StudentRow.jsx           # Inline delete action (No Modal)
│
└── student/                             # Spring Boot Backend
    ├── Dockerfile                       # Multi-stage Maven + Java 21 build
    ├── pom.xml                          # Dependencies: Web, JPA, PostgreSQL
    └── src/
        ├── main/resources/
        │   └── application.properties   # Dynamic DB configuration for Render
        └── main/java/com/teresa/student/
            ├── Student.java             # JPA Entity
            ├── StudentApplication.java  # Main Application Runner
            ├── StudentController.java   # REST Controller (@CrossOrigin enabled)
            └── StudentRepository.java   # Spring Data JPA Repository
```

---

## 4. Deployment Instructions
1. Push local changes to GitHub repository (`origin/main`).
2. Navigate to [Render Dashboard](https://dashboard.render.com).
3. Create a **New Blueprint Instance** and link your repository.
4. Render automatically starts all 3 services (`student-db`, `student-backend`, and `student-frontend`).

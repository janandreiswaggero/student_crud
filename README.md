# Student CRUD Application

A full-stack CRUD application for managing student records, built with **Spring Boot** (Java 21, JPA, PostgreSQL) and **Vite + React** (JavaScript, Tailwind CSS, Lucide Icons, Modal-Free Architecture).

---

## 🚀 Deployment on Render.com (Blueprint)

This repository is pre-configured with a Render Blueprint [`render.yaml`](./render.yaml) that automatically provisions and connects:
1. **Managed PostgreSQL Database** (`student-db` / `db_student`)
2. **Backend Web Service** (`student-backend`) via Docker
3. **Frontend Static Site** (`student-frontend`) via Vite build

### Steps to Deploy:
1. Push your latest code to your GitHub repository (`main` branch):
   ```bash
   git add .
   git commit -m "Prepare for Render.com deployment"
   git push origin main
   ```
2. Log in to your [Render Dashboard](https://dashboard.render.com/).
3. Click **New +** and select **Blueprint**.
4. Connect your GitHub repository (`student_crud`).
5. Render will automatically detect [`render.yaml`](./render.yaml) and show the three resources to be created:
   - `student-db` (Database)
   - `student-backend` (Web Service)
   - `student-frontend` (Static Site)
6. Click **Apply**. Render will automatically provision the database, build the Docker container for the backend, compile the React frontend, and inject the environment variables.

---

## 💻 Local Development

### 1. Backend (Spring Boot)
- Location: `./student`
- Requires Java 21 & PostgreSQL (or default localhost configuration)
- Base URL: `http://localhost:8080/teresa/students`

### 2. Frontend (Vite + React + Tailwind)
- Location: `./frontend`
- Run locally:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- Local URL: `http://localhost:5173`
- Dev server proxy routes `/teresa/*` directly to `http://localhost:8080`.

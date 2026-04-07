# THE ESTATE
### Premium Architectural Dashboard - Docker Setup

> [!IMPORTANT]
> **Note:** Property details are currently **hardcoded** in the codebase.


This project is fully containerized for easy orchestration and deployment. Follow the steps below to launch the entire stack.

---

## 🚀 Quick Start (Docker Compose)

### 1. Prerequisites
- **Docker Desktop** installed and running on your machine.

### 2. Termination of Local Processes (Crucial)
Before starting Docker, ensure that ports **8000** (Backend) and **5173** (Frontend) are not being used. **Stop any local Python or Node servers** (e.g., press `Ctrl+C` in those terminals).

### 3. Launch the Application
From the project root directory, run:
```bash
docker-compose up --build
```

---

## 🔗 Access Links
- **Frontend Dashboard**: [http://localhost:5173](http://localhost:5173)
- **Backend API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

## 🛠️ Core Features
- **Curated Property Exploration**: Seamless interface for architecture enthusiasts.
- **Private Collection**: Persistently saved favorites (SQLite-backed).
- **Secure Authentication**: Cookie-based session management.
- **Architectural Concierge**: Ready for premium service interactions.

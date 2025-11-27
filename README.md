# Caritas Kiddie Academy - School Management System

A full-stack school management system built with Next.js (frontend) and FastAPI (backend), using PostgreSQL as the database.

## Project Structure

```
Caritas Kiddie Academy/
├── frontend/          # Next.js application with TypeScript and Tailwind CSS
├── backend/           # FastAPI server
├── orm/               # Database models and queries
└── [config files]     # Root-level configurations
```

## Prerequisites

- Node.js 18+ and npm
- Python 3.9+
- PostgreSQL 14+
- Database user: DivAmok (password: P@ssW0rd!)
- Database: Caritas Kiddie Academy

## Quick Start

Start the development environment with a single command:

```bash
./code_watcher.sh
```

This unified script will:
- Check and create virtual environment if needed
- Install dependencies if missing
- Start both frontend (port 4411) and backend (port 1144) servers with auto-reload
- Optionally enable file change notifications if `fswatch` is available
- Display server URLs and logs

**Auto-reload features:**
- Frontend: Next.js built-in hot module replacement (HMR)
- Backend: Uvicorn `--reload` flag (watches Python files automatically)

**Optional:** If you have `fswatch` installed, the script will also show file change notifications with timestamps.

Press `Ctrl+C` to stop all servers.

## Manual Setup

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on http://localhost:4411

### Backend Setup

```bash
cd backend
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --host 0.0.0.0 --port 1144 --reload
```

Backend will run on http://localhost:1144

### Database Setup

The database connection is configured to use:
- Host: localhost
- Port: 5432
- User: DivAmok
- Password: P@ssW0rd!
- Database: Caritas Kiddie Academy

Create a `.env` file in the `backend` directory with your database configuration.

## Development

- Frontend: http://localhost:4411
- Backend API: http://localhost:1144
- API Docs: http://localhost:1144/docs

## ⚠️ Important: Port Configuration

**These ports are FIXED and must NEVER be changed:**
- Frontend port: **4411**
- Backend port: **1144**

These ports are hardcoded in the configuration files and changing them will break the application.

## Tech Stack

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **Backend**: FastAPI, Python, SQLAlchemy
- **Database**: PostgreSQL
- **ORM**: SQLAlchemy

# Port Configuration

## Fixed Ports (NEVER CHANGE)

This project uses fixed ports that must never be modified:

- **Frontend (Next.js)**: Port `4411`
- **Backend (FastAPI)**: Port `1144`

## Why These Ports Are Fixed

These ports are configured in multiple places:
- Frontend: `frontend/package.json` (dev and start scripts)
- Backend: `backend/.env.example` and CORS configuration in `backend/main.py`
- Documentation: `README.md`

Changing these ports will break:
- CORS configuration
- API connections
- Development workflow
- Documentation accuracy

## Port Usage

- Frontend runs on: `http://localhost:4411`
- Backend API runs on: `http://localhost:1144`
- API Documentation: `http://localhost:1144/docs`


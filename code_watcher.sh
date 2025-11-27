#!/bin/bash

# Caritas Kiddie Academy - Code Watcher
# This script starts both frontend and backend servers with auto-reload
# Works with or without fswatch for file change notifications

# Get the directory where this script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
cd "$SCRIPT_DIR"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Caritas Kiddie Academy - Development${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""

# Check if backend virtual environment exists
if [ ! -d "backend/venv" ]; then
    echo -e "${YELLOW}Backend virtual environment not found. Creating...${NC}"
    cd backend
    python3 -m venv venv
    cd ..
fi

# Check if backend dependencies are installed
if [ ! -f "backend/venv/bin/activate" ]; then
    echo -e "${RED}Backend virtual environment setup incomplete.${NC}"
    exit 1
fi

# Check if frontend node_modules exists
if [ ! -d "frontend/node_modules" ]; then
    echo -e "${YELLOW}Frontend dependencies not found. Installing...${NC}"
    cd frontend
    npm install
    cd ..
fi

# Function to cleanup on exit
cleanup() {
    echo ""
    echo -e "${YELLOW}Shutting down servers...${NC}"
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    if [ ! -z "$WATCHER_PID" ]; then
        kill $WATCHER_PID 2>/dev/null
    fi
    exit
}

# Trap Ctrl+C and call cleanup
trap cleanup INT TERM

# Start Backend Server with auto-reload
echo -e "${GREEN}Starting Backend Server on port 1144 (auto-reload enabled)...${NC}"
cd "$SCRIPT_DIR/backend"
source venv/bin/activate

# Check if .env exists, if not copy from .env.example
if [ ! -f ".env" ]; then
    echo -e "${YELLOW}Creating .env file from .env.example...${NC}"
    cp .env.example .env
fi

# Start backend with uvicorn reload (watches Python files automatically)
uvicorn main:app --host 0.0.0.0 --port 1144 --reload > ../backend.log 2>&1 &
BACKEND_PID=$!
cd "$SCRIPT_DIR"

# Wait a moment for backend to start
sleep 2

# Start Frontend Server (Next.js has built-in hot reload)
echo -e "${GREEN}Starting Frontend Server on port 4411 (hot reload enabled)...${NC}"
cd "$SCRIPT_DIR/frontend"
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd "$SCRIPT_DIR"

# Wait a moment for frontend to start
sleep 2

echo ""
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Servers started with auto-reload!${NC}"
echo -e "${BLUE}========================================${NC}"
echo ""
echo -e "Frontend: ${GREEN}http://localhost:4411${NC} (Hot reload enabled)"
echo -e "Backend API: ${GREEN}http://localhost:1144${NC} (Auto-reload enabled)"
echo -e "API Docs: ${GREEN}http://localhost:1144/docs${NC}"
echo ""

# Check if fswatch is available for enhanced file watching
if command -v fswatch &> /dev/null; then
    echo -e "${YELLOW}File change monitoring enabled (fswatch detected)${NC}"
    echo -e "${YELLOW}Watching for file changes...${NC}"
    echo ""
    
    # Watch for changes in key directories and log them
    fswatch -o \
        backend/**/*.py \
        backend/requirements.txt \
        backend/.env \
        frontend/**/*.{ts,tsx,js,jsx} \
        frontend/package.json \
        orm/**/*.py \
        2>/dev/null | while read num
    do
        echo -e "${BLUE}[$(date +'%H:%M:%S')] File change detected${NC}"
    done &
    WATCHER_PID=$!
else
    echo -e "${YELLOW}Auto-reload is active:${NC}"
    echo -e "  • Backend: Watches Python files in backend/ and orm/"
    echo -e "  • Frontend: Next.js hot module replacement (HMR)"
    echo ""
    echo -e "${YELLOW}Tip: Install fswatch for file change notifications${NC}"
    echo -e "${YELLOW}  macOS: brew install fswatch${NC}"
    echo ""
fi

echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""

# Wait for user interrupt
wait


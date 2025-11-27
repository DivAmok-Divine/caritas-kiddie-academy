from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Caritas Kiddie Academy API",
    description="School Management System API for Caritas Kiddie Academy",
    version="1.0.0"
)

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:4411"],  # Frontend port (NEVER CHANGE)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Caritas Kiddie Academy API is running"}

@app.get("/health")
async def health_check():
    return {"status": "healthy"}


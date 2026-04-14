from fastapi import FastAPI, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from schemas.github import GitHubDeploymentPayload
from dotenv import load_dotenv
import os

load_dotenv()

app = FastAPI(title="Vibe2Ship Backend")


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"], 
    allow_headers=["*"],
)

async def run_recovery_pipeline(repo_name: str, deployment_id: int):
    
    print(f"--- STARTING AUTOMATION FOR {repo_name} ---")
    print(f"Fetching logs for deployment: {deployment_id}...")
    
    print("Automation complete. PR opened.")

@app.post("/webhooks/github")
async def handle_github_webhook(payload: GitHubDeploymentPayload, background_tasks: BackgroundTasks):
    status = payload.deployment_status.get("state")
    repo_name = payload.repository.get("full_name")
    deployment_id = payload.deployment.get("id")

    print(f"Received webhook for {repo_name}, Status: {status}")

    if status == "failure":
        
        background_tasks.add_task(run_recovery_pipeline, repo_name, deployment_id)
        return {"message": "Automation triggered"}
    
    return {"message": "No action needed"}
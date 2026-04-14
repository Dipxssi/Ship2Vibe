from pydantic import BaseModel

class GitHubDeploymentPayload(BaseModel):
  action: str
  deployment_status: dict
  repository: dict
  deployment: dict
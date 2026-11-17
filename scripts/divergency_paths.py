"""Resolve the actual Unity checkout without using another game's name as configuration."""
import os
from pathlib import Path


def unity_project_root():
    configured = os.environ.get("DIVERGENCY_UNITY_PROJECT")
    if configured:
        project = Path(configured).expanduser().resolve()
        if (project / "Assets").is_dir() and (project / "ProjectSettings").is_dir():
            return project
        raise ValueError("DIVERGENCY_UNITY_PROJECT must point to the Divergency Unity project.")
    workspace_parent = Path(__file__).resolve().parents[2]
    projects = [p for p in workspace_parent.iterdir() if p.is_dir()
                and (p / "Assets").is_dir() and (p / "ProjectSettings").is_dir()]
    if len(projects) == 1:
        return projects[0]
    raise RuntimeError("Set DIVERGENCY_UNITY_PROJECT to the Divergency Unity checkout.")


def unity_path(*parts):
    return str(unity_project_root().joinpath(*parts))

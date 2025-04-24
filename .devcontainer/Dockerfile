FROM python:3.12-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    git \
    && rm -rf /var/lib/apt/lists/*

# Set work directory
WORKDIR /workspaces/collaborative-task-app

# Setup non-root user
RUN groupadd -r vscode && useradd -m -r -g vscode -s /bin/bash vscode
USER vscode
#!/bin/bash

# Script to scaffold a new project directory with a README template

if [ -z "$1" ]; then
  echo "Usage: ./scaffold-project.sh <project-slug>"
  exit 1
fi

SLUG=$1
PROJECT_DIR="../projects/$SLUG"
MEDIA_DIR="../assets/demo-media/$SLUG"

# Create directories
mkdir -p "$PROJECT_DIR"
mkdir -p "$PROJECT_DIR/src"
mkdir -p "$MEDIA_DIR"

# Create README template
cat <<EOF > "$PROJECT_DIR/README.md"
# $SLUG

Add a brief, one-sentence description of the project here.

## Overview

Explain the core problem this project solves and why it exists. What was the goal?

## Features / What it Does

*   Feature 1
*   Feature 2
*   Feature 3

## Key Results / Impact

*   Metric 1
*   Metric 2

## How to Run

Provide instructions on how to build and run the project locally.

## Tech Stack

*   Tech 1
*   Tech 2
EOF

echo "Scaffolded project structure for '$SLUG' in $PROJECT_DIR"
echo "Created media directory in $MEDIA_DIR"

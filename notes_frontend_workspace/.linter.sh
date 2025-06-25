#!/bin/bash
cd /home/kavia/workspace/code-generation/noteease-72716-8bd3bc26/notes_frontend_workspace/notes_frontend
npm run lint
ESLINT_EXIT_CODE=$?
npm run build
BUILD_EXIT_CODE=$?
if [ $ESLINT_EXIT_CODE -ne 0 ] || [ $BUILD_EXIT_CODE -ne 0 ]; then
   exit 1
fi


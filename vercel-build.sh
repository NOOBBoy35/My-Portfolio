#!/bin/bash

# Install client dependencies and build
cd client
npm install
npm run build
cd ..

# Build the server
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Copy client build to the correct location
mkdir -p dist/public
cp -r client/dist/* dist/public/

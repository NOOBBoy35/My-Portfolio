#!/bin/bash
set -e  # Exit on error

# Install client dependencies and build
cd client
npm install
npm run build
cd ..

# Build the server
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

# Ensure the public directory exists
mkdir -p dist/public

# Copy client build to the correct location
cp -r client/dist/* dist/public/

# Create a fallback index.html if it doesn't exist
if [ ! -f "dist/public/index.html" ]; then
  echo "<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8" />
    <title>Loading...</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/assets/index.js"></script>
  </body>
</html>" > dist/public/index.html
fi

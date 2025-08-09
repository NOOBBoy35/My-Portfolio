#!/bin/bash
set -e  # Exit on error

# Enable debugging
set -x

# Print environment
env

# Check if client/package.json exists
if [ -f "client/package.json" ]; then
    echo "=== Installing client dependencies ==="
    cd client
    npm install --no-fund --no-audit

    echo "=== Building client ==="
    npm run build
    cd ..
else
    echo "=== No client/package.json found, skipping client build ==="
    mkdir -p client/dist
fi

echo "=== Building server ==="
# Check if esbuild is installed
if ! command -v esbuild &> /dev/null; then
    echo "Error: esbuild is not installed. Installing..."
    npm install -g esbuild
fi

# Build the server with detailed output
esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist --log-level=debug

echo "=== Creating public directory ==="
# Ensure the public directory exists
mkdir -p dist/public

# Create dist directory if it doesn't exist
mkdir -p dist/public

# Copy client build to the correct location if it exists
if [ -d "client/dist" ] && [ "$(ls -A client/dist 2>/dev/null)" ]; then
    echo "=== Copying client build to dist/public ==="
    cp -r client/dist/* dist/public/
else
    echo "=== No client build found, creating minimal public directory ==="
    # Create a minimal index.html
    mkdir -p dist/public
    echo '<!DOCTYPE html><html><head><title>Loading...</title></head><body><div id="root"></div></body></html>' > dist/public/index.html
fi

# Create a fallback index.html if it doesn't exist
if [ ! -f "dist/public/index.html" ]; then
    echo "=== Creating fallback index.html ==="
    mkdir -p dist/public
    echo "<!DOCTYPE html>
<html>
  <head>
    <meta charset=\"UTF-8\" />
    <title>Loading...</title>
  </head>
  <body>
    <div id=\"root\"></div>
    <script type=\"module\" src=\"/assets/index.js\"></script>
  </body>
</html>" > dist/public/index.html
fi

echo "=== Build completed successfully ==="
ls -la dist/

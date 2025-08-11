import express, { type Express } from "express";
import fs from "fs";
import path from "path";
import { createServer as createViteServer, createLogger } from "vite";
import { type Server } from "http";
import viteConfig from "../vite.config";
import { nanoid } from "nanoid";
import { fileURLToPath } from 'node:url';

const viteLogger = createLogger();

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    customLogger: {
      ...viteLogger,
      error: (msg, options) => {
        viteLogger.error(msg, options);
        process.exit(1);
      },
    },
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "..",
        "client",
        "index.html",
      );

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`,
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  const publicDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "public");
  
  // Only serve static files if the directory exists
  if (fs.existsSync(publicDir)) {
    app.use(express.static(publicDir, { maxAge: "1y" }));
    
    // Serve index.html for all other routes to support client-side routing
    app.get("*", (req, res) => {
      res.sendFile(path.join(publicDir, "index.html"));
    });
  } else if (process.env.NODE_ENV === 'development') {
    // In development, just show a simple message if public dir doesn't exist
    app.get("*", (req, res) => {
      res.send(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Development Server</title>
            <style>
              body { 
                font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
                max-width: 800px; 
                margin: 0 auto; 
                padding: 2rem;
                line-height: 1.6;
              }
              code { 
                background: #f0f0f0; 
                padding: 0.2em 0.4em; 
                border-radius: 3px; 
              }
            </style>
          </head>
          <body>
            <h1>Development Server Running</h1>
            <p>The server is running in development mode, but no frontend build was found.</p>
            <p>To start the frontend development server, run:</p>
            <pre><code>cd client && npm run dev</code></pre>
            <p>Then open <a href="http://localhost:5173">http://localhost:5173</a> in your browser.</p>
          </body>
        </html>
      `);
    });
  } else {
    // In production, log an error if public dir doesn't exist
    console.error(`Error: Public directory not found at ${publicDir}`);
    
    app.get("*", (req, res) => {
      res.status(500).json({
        error: "Frontend build not found",
        message: "The frontend build directory is missing. Please build the client application first."
      });
    });
  }
}

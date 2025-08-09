import express, { type Request, Response, NextFunction, Express } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Create and configure the Express app
export function createApp(): Express {
  const app = express();
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  // Request logging middleware
  app.use((req, res, next) => {
    const start = Date.now();
    const path = req.path;
    let capturedJsonResponse: Record<string, any> | undefined = undefined;

    const originalResJson = res.json;
    res.json = function (bodyJson, ...args) {
      capturedJsonResponse = bodyJson;
      return originalResJson.apply(res, [bodyJson, ...args]);
    };

    res.on("finish", () => {
      const duration = Date.now() - start;
      if (path.startsWith("/api")) {
        let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
        if (capturedJsonResponse) {
          logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
        }
        if (logLine.length > 80) {
          logLine = logLine.slice(0, 79) + "…";
        }
        log(logLine);
      }
    });
    next();
  });

  // Register API routes
  registerRoutes(app);

  // Error handling middleware
  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(status).json({ message });
    console.error(err);
  });

  return app;
}

// For local development
if (process.env.NODE_ENV !== 'production') {
  const app = createApp();
  const port = parseInt(process.env.PORT || "5002", 10);
  
  if (app.get("env") === "development") {
    const server = require('http').createServer(app);
    setupVite(app, server).then(() => {
      server.listen(port, "0.0.0.0", () => {
        log(`Development server running on port ${port}`);
      });
    });
  } else {
    serveStatic(app);
    app.listen(port, "0.0.0.0", () => {
      log(`Server running on port ${port}`);
    });
  }
}

// Export the app for Vercel serverless functions
const app = createApp();
serveStatic(app);
export { app };

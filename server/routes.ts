import type { Request, Response } from "express";
import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // API routes
  app.get("/api/example", (_req: Request, res: Response) => {
    res.json({ message: "Hello from the API!" });
  });

  // Catch-all route for undefined API endpoints
  app.all("/api/*", (_req: Request, res: Response) => {
    res.status(404).json({ 
      error: "Not Found",
      message: "The requested API endpoint does not exist" 
    });
  });

  // For all other routes, serve the frontend (handled by serveStatic)
  app.get("*", (_req: Request, res: Response) => {
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>My Portfolio</title>
          <style>
            body { 
              font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
              max-width: 800px; 
              margin: 0 auto; 
              padding: 2rem;
              line-height: 1.6;
            }
          </style>
        </head>
        <body>
          <h1>Welcome to My Portfolio</h1>
          <p>The server is running in ${process.env.NODE_ENV || 'development'} mode.</p>
          <p>API endpoints:</p>
          <ul>
            <li><a href="/api/health">/api/health</a> - Health check</li>
            <li><a href="/api/example">/api/example</a> - Example API endpoint</li>
          </ul>
        </body>
      </html>
    `);
  });

  const httpServer = createServer(app);
  return httpServer;
}

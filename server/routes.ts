import type { Request, Response, Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

// Simple logger for routes
const logger = {
  info: (message: string, ...args: any[]) => console.log(`[ROUTES] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ROUTES] ${message}`, ...args)
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Test endpoint to verify server is working
  app.get("/api/test", (_req: Request, res: Response) => {
    logger.info("Test endpoint hit");
    res.status(200).json({ 
      status: "success", 
      message: "Server is working correctly",
      timestamp: new Date().toISOString() 
    });
  });

  // Health check endpoint
  app.get("/api/health", (_req: Request, res: Response) => {
    res.status(200).json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || 'development'
    });
  });

  // API routes
  app.get("/api/example", (_req: Request, res: Response) => {
    res.json({ 
      message: "Hello from the API!",
      timestamp: new Date().toISOString()
    });
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

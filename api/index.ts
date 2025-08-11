import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server';
import serverless from 'serverless-http';
import { Response } from 'express';

// Simple logger
const logger = {
  info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
  error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
  warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
};

// Initialize Express app and handler
let handler: ReturnType<typeof serverless>;

try {
  logger.info('Initializing Express app...');
  
  // Create Express app
  const app = createApp();
  
  // Add a test endpoint
  app.get('/api/test', (_req, res) => {
    logger.info('Test endpoint hit');
    res.json({ status: 'ok', message: 'Test endpoint is working' });
  });
  
  // Create serverless handler with detailed logging
  handler = serverless(app, {
    binary: ['image/*', 'font/*', 'application/*'],
    request: (req, _, context) => {
      req._startTime = Date.now();
      logger.info(`Request: ${req.method} ${req.url}`, {
        headers: req.headers,
        query: req.query,
        body: req.body
      });
    },
    response: (res) => {
      const responseTime = Date.now() - (res.req as any)?._startTime || 0;
      logger.info(`Response: ${res.statusCode} in ${responseTime}ms`);
    }
  });
  
  logger.info('Express app and serverless handler initialized successfully');
} catch (error) {
  logger.error('Failed to initialize Express app:', error);
  throw error;
}

// Main handler
export default async (req: VercelRequest, res: VercelResponse) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-V, Authorization');

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      logger.info('Handling OPTIONS preflight request');
      return res.status(200).end();
    }

    logger.info(`Processing ${req.method} ${req.url}`);
    
    if (!handler) {
      throw new Error('Serverless handler is not initialized');
    }
    
    // Process the request
    return await handler(req, res);
  } catch (error: any) {
    logger.error('Unhandled error in request handler:', {
      error: error?.message || 'Unknown error',
      stack: error?.stack,
      url: req.url,
      method: req.method,
      headers: req.headers,
      query: req.query,
      body: req.body
    });
    
    // Ensure headers are not already sent
    if (!res.headersSent) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: error?.message || 'Unknown error',
        timestamp: new Date().toISOString(),
        requestId: req.headers['x-request-id'] || 'unknown'
      });
    } else {
      logger.error('Headers already sent, could not send error response');
    }
  }
};

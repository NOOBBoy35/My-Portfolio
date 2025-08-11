import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server';
import serverless, { Handler } from 'serverless-http';
import { Response } from 'express';

// Initialize Express app outside the handler for better performance
let app;
let handler;

try {
  console.log('Initializing Express app...');
  app = createApp();
  
  // Create serverless handler
  handler = serverless(app, {
    binary: ['image/*', 'font/*', 'application/*'],
    request: (req: any, _: any, context: any) => {
      // Add request start time to context
      context.startTime = Date.now();
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    },
    response: (res: any) => {
      // Log response details
      const responseTime = Date.now() - res.locals.startTime;
      console.log(`[${new Date().toISOString()}] Response: ${res.statusCode} in ${responseTime}ms`);
    }
  });
  
  console.log('Express app and serverless handler initialized successfully');
} catch (error) {
  console.error('Failed to initialize Express app:', error);
  // We'll re-throw the error to fail fast during initialization
  throw error;
}

// Main handler
export default async (req: VercelRequest, res: VercelResponse) => {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-V, Authorization');

  // Handle preflight requests
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return res.status(200).end();
  }

  try {
    // Add request start time to response
    (res as any).startTime = Date.now();
    
    // Process the request
    return await handler(req, res);
  } catch (error) {
    console.error('Error in request handler:', error);
    
    // Ensure headers are not already sent
    if (!res.headersSent) {
      return res.status(500).json({
        status: 'error',
        message: 'Internal Server Error',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      });
    } else {
      console.error('Headers already sent, could not send error response');
    }
  }
};

import { createApp } from '../server';
import { VercelRequest, VercelResponse } from '@vercel/node';
import serverless, { Handler } from 'serverless-http';
import { IncomingMessage, ServerResponse } from 'http';
import { Request, Response } from 'express';

interface ErrorWithStack extends Error {
  statusCode?: number;
  status?: number;
  code?: string;
}

console.log('=== Initializing serverless function ===');
console.log('Node version:', process.version);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Initialize the Express app
let app;
try {
  console.log('Creating Express app...');
  app = createApp();
  console.log('Express app created successfully');
} catch (err) {
  const error = err as ErrorWithStack;
  console.error('Failed to create Express app:', {
    name: error.name,
    message: error.message,
    stack: error.stack
  });
  throw error;
}

// Create a request handler for Vercel
const handler: Handler = serverless(app, {
  binary: ['image/*', 'font/*', 'application/*'],
  request: (request: IncomingMessage, event: any, context: any) => {
    console.log('Incoming request:', {
      path: request.url,
      method: request.method,
      headers: JSON.stringify(request.headers, null, 2)
    });
  },
  response: (response: ServerResponse) => {
    console.log('Outgoing response:', {
      statusCode: response.statusCode,
      headers: JSON.stringify(response.getHeaders(), null, 2)
    });
  }
});

export default async (req: VercelRequest, res: VercelResponse) => {
  console.log('\n=== New Request ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  console.log('Headers:', JSON.stringify(req.headers, null, 2));
  console.log('Query:', JSON.stringify(req.query, null, 2));
  
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-V, Authorization'
    );

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      console.log('Handling OPTIONS preflight request');
      return res.status(200).end();
    }

    console.log('Processing request with serverless-http handler...');
    const result = await handler(req, res);
    console.log('Request processed successfully');
    return result;
  } catch (err) {
    const error = err as ErrorWithStack;
    console.error('\n=== ERROR ===');
    const errorDetails = {
      name: error.name,
      message: error.message,
      stack: error.stack,
      code: error.code,
      statusCode: error.statusCode,
      status: error.status
    };
    
    console.error('Error details:', JSON.stringify(errorDetails, null, 2));
    
    return res.status(500).json({ 
      error: 'Internal Server Error',
      message: error.message || 'An unexpected error occurred',
      ...(process.env.NODE_ENV !== 'production' ? { 
        details: errorDetails,
        environment: process.env.NODE_ENV,
        nodeVersion: process.version
      } : {})
    });
  }
};

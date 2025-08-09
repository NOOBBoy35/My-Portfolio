import { createApp } from '../server';
import { VercelRequest, VercelResponse } from '@vercel/node';
import serverless from 'serverless-http';

console.log('=== Initializing serverless function ===');
console.log('Node version:', process.version);
console.log('NODE_ENV:', process.env.NODE_ENV);

// Initialize the Express app
let app;
try {
  console.log('Creating Express app...');
  app = createApp();
  console.log('Express app created successfully');
} catch (error) {
  console.error('Failed to create Express app:', {
    name: error.name,
    message: error.message,
    stack: error.stack
  });
  throw error;
}

// Create a request handler for Vercel
const handler = serverless(app, {
  binary: ['image/*', 'font/*', 'application/*'],
  request: (request, event, context) => {
    console.log('Incoming request:', {
      path: request.path,
      method: request.method,
      query: request.query,
      headers: JSON.stringify(request.headers, null, 2),
      body: JSON.stringify(request.body, null, 2)
    });
  },
  response: (response) => {
    console.log('Outgoing response:', {
      statusCode: response.statusCode,
      headers: JSON.stringify(response.headers, null, 2)
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
  } catch (error) {
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
      message: error instanceof Error ? error.message : 'Unknown error occurred',
      ...(process.env.NODE_ENV !== 'production' ? { 
        details: errorDetails,
        environment: process.env.NODE_ENV,
        nodeVersion: process.version
      } : {})
    });
  }
};

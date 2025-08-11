import { VercelRequest, VercelResponse } from '@vercel/node';
import { createApp } from '../server';
import serverless from 'serverless-http';

// Initialize Express app
let app;
try {
  console.log('Initializing Express app...');
  app = createApp();
  console.log('Express app initialized successfully');
} catch (error) {
  console.error('Failed to initialize Express app:', error);
  throw error;
}

// Create serverless handler
const handler = serverless(app, {
  binary: ['image/*', 'font/*', 'application/*']
});

// Main handler
export default async (req: VercelRequest, res: VercelResponse) => {
  console.log('\n=== New Request ===');
  console.log('Method:', req.method);
  console.log('URL:', req.url);
  
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
    console.log('Processing request with serverless-http handler...');
    return await handler(req, res);
  } catch (error) {
    console.error('Error in request handler:', error);
    return res.status(500).json({
      status: 'error',
      message: 'Internal Server Error',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    });
  }
};

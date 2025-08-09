import { VercelRequest, VercelResponse } from '@vercel/node';
import { join } from 'path';
import { readFile } from 'fs/promises';
import { app } from '../server';

// Create a request handler from the Express app
export default async function handler(req: VercelRequest, res: VercelResponse) {
  try {
    // Handle API routes
    if (req.url?.startsWith('/api/')) {
      return app(req, res);
    }

    // Serve static files
    try {
      const filePath = join(process.cwd(), 'dist/public', req.url || 'index.html');
      const data = await readFile(filePath);
      
      // Set content type based on file extension
      if (req.url?.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (req.url?.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (req.url?.endsWith('.json')) {
        res.setHeader('Content-Type', 'application/json');
      } else if (req.url?.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (req.url?.endsWith('.jpg') || req.url?.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (req.url?.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      } else {
        // Default to HTML for all other requests
        res.setHeader('Content-Type', 'text/html');
      }
      
      return res.status(200).send(data);
    } catch (error) {
      // If file not found, serve index.html for SPA routing
      if (error.code === 'ENOENT') {
        const indexHtml = await readFile(join(process.cwd(), 'dist/public/index.html'));
        res.setHeader('Content-Type', 'text/html');
        return res.status(200).send(indexHtml);
      }
      throw error;
    }
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

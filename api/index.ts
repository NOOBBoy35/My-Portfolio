import { createApp } from '../server';
import { VercelRequest, VercelResponse } from '@vercel/node';

const app = createApp();

// Create a request handler for Vercel
const handler = async (req: VercelRequest, res: VercelResponse) => {
  // Convert Vercel request/response to Express format
  const { method, headers, url } = req;
  const request = {
    method,
    url,
    ...req,
  };

  // Create a mock response object
  const response: any = {
    statusCode: 200,
    body: '',
    headers: {},
    setHeader: (key: string, value: string) => {
      res.setHeader(key, value);
    },
    end: (data: any) => {
      if (data) {
        res.send(data);
      } else {
        res.end();
      }
    },
    status: (code: number) => {
      res.status(code);
      return response;
    },
    json: (data: any) => {
      res.json(data);
    },
    send: (data: any) => {
      res.send(data);
    },
  };

  // Handle the request with Express
  await new Promise<void>((resolve) => {
    app(request as any, response as any, () => {
      resolve();
    });
  });
};

export default handler;

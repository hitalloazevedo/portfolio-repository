import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/error.middleware';
import { router } from './routes/routes';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(' '),
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']
}))

app.use(express.json());
app.use((req, res, next) => {
  const start = Date.now();

  // Listen for response finish event
  res.on('finish', () => {
    const duration = Date.now() - start;
    console.log(`${req.method} ${req.url} | ${res.statusCode} | ${duration}ms`);
  });

  next();
});


router.get("/", (request: Request, response: Response) => { response.status(200).json({ message: "backend is running..."}) })

app.use(router);
app.use(errorHandler);


export { app };
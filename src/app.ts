import express from 'express'
import { router } from './routes/routes';
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/error.middleware';

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(' '),
    methods: ['GET', 'POST', 'DELETE', 'PATCH'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']
}))

app.use(express.json());
app.use(router);
app.use(errorHandler);


export { app };
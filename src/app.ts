import express from 'express'
import { router } from './routes/routes';
import cors from 'cors'
import dotenv from 'dotenv'

dotenv.config();

const app = express();

app.use(cors({
    origin: process.env.ALLOWED_ORIGINS?.split(' ')
}))

app.use(express.json())
app.use(router)


export { app };
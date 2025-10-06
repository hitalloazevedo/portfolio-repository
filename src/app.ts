import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler } from './middlewares/error.middleware';
import { router } from './routes/routes';
import chalk from 'chalk';

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

  res.on("finish", () => {
    const duration = Date.now() - start;
    const timestamp = new Date().toISOString();
    const method = req.method;
    const url = req.originalUrl || req.url;
    const status = res.statusCode;
    const ip = req.ip || req.connection.remoteAddress;

    // Escolhe cor baseada no status
    const statusColor =
      status >= 500
        ? chalk.red
        : status >= 400
          ? chalk.yellow
          : status >= 300
            ? chalk.cyan
            : chalk.green;

    const methodColor =
      method === "GET"
        ? chalk.blue
        : method === "POST"
          ? chalk.magenta
          : method === "PUT"
            ? chalk.yellow
            : method === "DELETE"
              ? chalk.red
              : chalk.white;

    console.log(
      `${chalk.gray(`[${timestamp}]`)} ${methodColor(method)} ${chalk.white(
        url
      )} - ${statusColor(status)} ${chalk.gray(`(${duration}ms) - ${ip}`)}`
    );
  });

  next();
});



router.get("/", (request: Request, response: Response) => { response.status(200).json({ message: "backend is running..."}) })

app.use(router);
app.use(errorHandler);


export { app };
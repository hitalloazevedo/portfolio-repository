import { Request, Response, Router } from "express";
import { createUserController } from "../useCases/users/CreateUser";
import { authenticateUserController } from "../useCases/auth/AuthenticateUser";

const authRoutes = Router();

authRoutes.post('/signup', (request: Request, response: Response) => {
    createUserController.handle(request, response);
});

authRoutes.post('/signin', (request: Request, response: Response) => {
    authenticateUserController.handle(request, response);
});

export { authRoutes };
import { NextFunction, Request, Response, Router } from "express";
import { authController } from "../controllers/auth.controller";
import { userController } from "../controllers/user.controller";

const authRoutes = Router();

authRoutes.post(
  "/signup",
  (request: Request, response: Response, next: NextFunction) => {
    userController.create(request, response, next);
  }
);

authRoutes.post(
  "/signin",
  (request: Request, response: Response, next: NextFunction) => {
    authController.login(request, response, next);
  }
);

export { authRoutes };

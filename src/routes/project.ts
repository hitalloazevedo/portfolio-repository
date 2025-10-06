import { NextFunction, Request, Response, Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { projectController } from "../controllers/project.controller";

const projectRoutes = Router();

projectRoutes.post('/projects', authMiddleware.guard(), (request: Request, response: Response, next: NextFunction) => {
    projectController.create(request, response, next);
});

projectRoutes.get('/projects', (request: Request, response: Response, next: NextFunction) => {
    projectController.findAll(request, response, next)
})

projectRoutes.get('/projects/:title', (request: Request, response: Response, next: NextFunction) => {
    projectController.findByTitle(request, response, next)
})


projectRoutes.delete('/projects/:title', authMiddleware.guard(), (request: Request, response: Response, next: NextFunction) => {
    projectController.deleteByTitle(request, response, next);
})

export { projectRoutes };
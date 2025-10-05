import { Request, Response, Router } from "express";
import { findProjectByUUIDController } from "../use-cases/projects/FindProjectByUUID";
import { authMiddleware } from "../middlewares/auth.middleware";

const projectRoutes = Router();

// projectRoutes.post('/projects', authMiddleware.guard(), (request: Request, response: Response) => {
//     createProjectController.handle(request, response);
// });

// projectRoutes.get('/projects', (request: Request, response: Response) => {
//     getAllProjectController.handle(request, response)
// })

// projectRoutes.get('/projects/:uuid', (request: Request, response: Response) => {
//     findProjectByUUIDController.handle(request, response)
// })

// projectRoutes.patch('/projects/:uuid', authMiddleware.guard(), (request: Request, reponse: Response) => {
//     updateProjectController.handle(request, reponse);
// })

// projectRoutes.delete('/projects/:uuid', authMiddleware.guard(), (request: Request, response: Response) => {
//     deleteProjectController.handle(request, response);
// })

export { projectRoutes };
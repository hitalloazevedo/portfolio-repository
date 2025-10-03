import { Request, Response, Router } from "express";
import { createProjectController } from "../use-cases/projects/CreateProject";
import { getAllProjectController } from "../use-cases/projects/GetAllProject";
import { updateProjectController } from "../use-cases/projects/UpdateProject";
import { deleteProjectController } from "../use-cases/projects/DeleteProject";
import { authMiddlewareController } from "../middlewares/AuthMiddleware";
import { findProjectByUUIDController } from "../use-cases/projects/FindProjectByUUID";

const projectRoutes = Router();

projectRoutes.post('/projects', authMiddlewareController, (request: Request, response: Response) => {
    createProjectController.handle(request, response);
});

projectRoutes.get('/projects', (request: Request, response: Response) => {
    getAllProjectController.handle(request, response)
})

projectRoutes.get('/projects/:uuid', (request: Request, response: Response) => {
    findProjectByUUIDController.handle(request, response)
})

projectRoutes.patch('/projects/:uuid', authMiddlewareController,(request: Request, reponse: Response) => {
    updateProjectController.handle(request, reponse);
})

projectRoutes.delete('/projects/:uuid', authMiddlewareController, (request: Request, response: Response) => {
    deleteProjectController.handle(request, response);
})

export { projectRoutes };
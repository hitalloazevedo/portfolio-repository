import { Request, Response, Router } from "express";
import { createProjectController } from "../useCases/projects/CreateProject";
import { getAllProjectController } from "../useCases/projects/GetAllProject";
import { updateProjectController } from "../useCases/projects/UpdateProject";
import { deleteProjectController } from "../useCases/projects/DeleteProject";
import { authMiddlewareController } from "../middlewares/AuthMiddleware";

const projectRoutes = Router();

projectRoutes.post('/projects', authMiddlewareController, (request: Request, response: Response) => {
    createProjectController.handle(request, response);
});

projectRoutes.get('/projects', (request: Request, response: Response) => {
    getAllProjectController.handle(request, response)
})

projectRoutes.patch('/projects/:uuid', authMiddlewareController,(request: Request, reponse: Response) => {
    updateProjectController.handle(request, reponse);
})

projectRoutes.delete('/projects/:uuid', authMiddlewareController, (request: Request, response: Response) => {
    deleteProjectController.handle(request, response);
})

export { projectRoutes };
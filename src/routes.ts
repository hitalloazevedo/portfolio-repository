import { Request, Response, Router } from "express";
import { createProjectController } from "./useCases/CreateProject";
import { getAllProjectController } from "./useCases/GetAllProject";
import { updateProjectController } from "./useCases/UpdateProject";

const router = Router();

router.post('/projects', (request: Request, response: Response) => {
    createProjectController.handle(request, response);
});

router.get('/projects', (request: Request, response: Response) => {
    getAllProjectController.handle(request, response);
})

router.patch('/projects/:uuid', (request: Request, reponse: Response) => {
    updateProjectController.handle(request, reponse);
})

export { router };
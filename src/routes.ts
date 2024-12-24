import { Request, Response, Router } from "express";
import { createProjectController } from "./useCases/CreateProject";
import { getAllProjectController } from "./useCases/GetAllProject";
import { updateProjectController } from "./useCases/UpdateProject";
import { deleteProjectController } from "./useCases/DeleteProject";

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

router.delete('/projects/:uuid', (request: Request, response: Response) => {
    deleteProjectController.handle(request, response);
})

export { router };
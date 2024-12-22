import { Request, Response, Router } from "express";
import { createProjectController } from "./useCases/CreateProject";
import { getAllProjectController } from "./useCases/GetAllProject";

const router = Router();

router.post('/projects', (request: Request, response: Response) => {
    createProjectController.handle(request, response);
});

router.get('/projects', (request: Request, response: Response) => {
    getAllProjectController.handle(request, response);
})

export { router };
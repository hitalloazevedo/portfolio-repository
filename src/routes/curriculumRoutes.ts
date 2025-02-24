import { Router, Request, Response } from "express";
import { getCurriculumController } from "../useCases/curriculum";

const curriculumRouter = Router();

curriculumRouter.get("/curriculum", (request: Request, response: Response) => {
    getCurriculumController.handle(request, response);
})

export { curriculumRouter };
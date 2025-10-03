import { Router, Response, Request } from "express";
import { authMiddlewareController } from "../middlewares/AuthMiddleware";
import { createSkillController } from "../use-cases/skills/CreateSkill";
import { updateSkillController } from "../use-cases/skills/UpdateSkill";
import { getAllSkillsController } from "../use-cases/skills/GetAllSkills";

const skillRoutes = Router();

skillRoutes.get('/skills',  (request: Request, response: Response) => {
    getAllSkillsController.handle(request, response);
})

skillRoutes.post('/skills', authMiddlewareController, (request: Request, response: Response) => {
    createSkillController.handle(request, response);
})

skillRoutes.patch('/skills/:uuid', authMiddlewareController, (request: Request, response: Response) => {
    updateSkillController.handle(request, response);
})

export { skillRoutes };
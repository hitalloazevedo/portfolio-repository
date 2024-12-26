import { Router, Response, Request } from "express";
import { authMiddlewareController } from "../middlewares/AuthMiddleware";
import { createSkillController } from "../useCases/skills/CreateSkill";
import { updateSkillController } from "../useCases/skills/UpdateSkill";
import { getAllSkillsController } from "../useCases/skills/GetAllSkills";

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
import { Router, Request, Response, NextFunction } from "express";
import { curriculumController } from "../use-cases/curriculum/curriculum.controller";

const curriculumRouter = Router();

curriculumRouter.get(
  "/curriculum",
  (request: Request, response: Response, next: NextFunction) => {
    curriculumController.downloadCurriculum(request, response, next);
  }
);

export { curriculumRouter };

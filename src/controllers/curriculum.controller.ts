import { NextFunction, Request, Response } from "express";
import path from "path";

class CurriculumController {
  constructor() {}
  async downloadCurriculum(_: Request, response: Response, next: NextFunction) {
    try {
      const basePath = path.join(__dirname, "../files");
      const fileName = "hitallo-azevedo-curriculum.pdf";
      const filePath = path.join(basePath, fileName);
      return response.status(200).download(filePath, fileName, (err) => {
        if (err) {
          console.error("Erro while downloading file:", err);
          response.status(500).send("Error during download processing");
        }
      });
    } catch (error) {
        next(error);
    }
  }
}

export const curriculumController = new CurriculumController();
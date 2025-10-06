import { NextFunction, Request, Response } from "express";
import path from "path";
import { Get } from "../routes/decorator";

export class CurriculumController {
  constructor() {}

  @Get('/curriculum')
  async downloadCurriculum(_: Request, response: Response, next: NextFunction) {
    try {
      const basePath = path.join(__dirname, "../../public");
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
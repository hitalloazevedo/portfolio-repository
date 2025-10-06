import { NextFunction, Request, Response } from "express";
import { ProjectUseCase } from "../use-cases/project.usecase";
import { MongoProjectRepository } from "../repositories/implementations/project.mongo";

class ProjectController {
    constructor(
        private useCase: ProjectUseCase
    ) { }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const dto = request.body;
            await this.useCase.create(dto);
            return response.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    async findAll(_: Request, response: Response, next: NextFunction) {
        try {
            const projects = await this.useCase.findAll();
            return response.status(200).json({
                projects
            });
        } catch (error) {
            next(error);
        }
    }

    async findByTitle(request: Request, response: Response, next: NextFunction) {
        try {
            const title = request.params.title;
            const project = await this.useCase.findByTitle(title);
            return response.status(200).json({
                project
            });
        } catch (error) {
            next(error);
        }
    }

    async deleteByTitle(request: Request, response: Response, next: NextFunction) {
        try {
            const title = request.params.title;
            await this.useCase.deleteByTitle(title);
            return response.status(200).send();
        } catch (error) {
            next(error);
        }
    }
}

export const projectController = new ProjectController(
    new ProjectUseCase(
        new MongoProjectRepository()
    )
);

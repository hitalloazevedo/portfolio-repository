import { NextFunction, Request, Response } from "express";
import { ProjectUseCase } from "../use-cases/project.usecase";
import { Delete, Get, Post } from "../routes/decorator";
import { authMiddleware } from "../middlewares/auth.middleware";

export class ProjectController {
    constructor(
        private useCase: ProjectUseCase
    ) { }

    @Post('/projects', authMiddleware.guard())
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const dto = request.body;
            await this.useCase.create(dto);
            return response.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    @Get('/projects')
    async findAll(request: Request, response: Response, next: NextFunction) {
        try {
            const title = request.query.title?.toString();

            if (!title) {
                const projects = await this.useCase.findAll();
                return response.status(200).json({
                    projects
                });
            }

            const project = await this.useCase.findByTitle(title);
            return response.status(200).json({
                project
            });
        } catch (error) {
            next(error);
        }
    }

    @Delete('/projects/:title', authMiddleware.guard())
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
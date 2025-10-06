import { NextFunction, Request, Response } from "express";
import { SkillUseCase } from "../use-cases/skill.usecase";
import { Delete, Get, Post } from "../routes/decorator";
import { authMiddleware } from "../middlewares/auth.middleware";

export class SkillController {
    constructor(
        private useCase: SkillUseCase
    ) { }

    @Post('/skills', authMiddleware.guard())
    async create(request: Request, response: Response, next: NextFunction) {
        try {
            const dto = request.body;
            await this.useCase.create(dto);
            return response.status(201).send();
        } catch (error) {
            next(error);
        }
    }

    @Get('/skills')
    async findAll(_: Request, response: Response, next: NextFunction) {
        try {
            const skills = await this.useCase.findAll();
            return response.status(200).json({
                skills
            });
        } catch (error) {
            next(error);
        }
    }

    @Delete('/skills/:title', authMiddleware.guard())
    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const title = request.params.title;
            await this.useCase.deleteByTitle(title);
            return response.status(200).send();
        } catch (error) {
            next(error);
        }
    }
}
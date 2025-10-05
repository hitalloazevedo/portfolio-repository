import { NextFunction, Request, Response } from "express";
import { SkillUseCase } from "../use-cases/skill.usecase";
import { MongoSkillRepository } from "../repositories/implementations/skill.mongo";

class SkillController {
    constructor(
        private useCase: SkillUseCase
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
            const skills = await this.useCase.findAll();
            return response.status(200).json({
                skills
            });
        } catch (error) {
            next(error);
        }
    }
}

export const skillController = new SkillController(
    new SkillUseCase(
        new MongoSkillRepository()
    )
);

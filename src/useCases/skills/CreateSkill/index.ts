import { MongoDBSkillsRepository } from "../../../repositories/implementations/MongoDBSkillsRepository";
import { CreateSkillController } from "./CreateSkillController";
import { CreateSkillUseCase } from "./CreateSkillUseCase";

const mongoSkillsRepository = new MongoDBSkillsRepository();

const createSkillUseCase = new CreateSkillUseCase(
    mongoSkillsRepository
);

const createSkillController = new CreateSkillController(
    createSkillUseCase
);

export { createSkillController };
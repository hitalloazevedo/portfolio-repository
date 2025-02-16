import { CreateSkillController } from "./CreateSkillController";
import { CreateSkillUseCase } from "./CreateSkillUseCase";
import { mongoDBSkillsRepository } from "../../../shared/singletonsInstances";

const createSkillUseCase = new CreateSkillUseCase(
    mongoDBSkillsRepository
);

const createSkillController = new CreateSkillController(
    createSkillUseCase
);

export { createSkillController };
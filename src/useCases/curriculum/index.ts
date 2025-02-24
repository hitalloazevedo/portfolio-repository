import { LocalCurriculumRepository } from "../../repositories/implementations/LocalCurriculumRepository";
import { GetCurriculumController } from "./GetCurriculumController";
import { GetCurriculumUseCase } from "./GetCurriculumUseCase";

const curriculumRepository = new LocalCurriculumRepository();

const getCurriculumUseCase = new GetCurriculumUseCase(
    curriculumRepository
);

const getCurriculumController = new GetCurriculumController(
    getCurriculumUseCase
);

export { getCurriculumController };
import { mongoDBProjectsRepository } from "../../../shared/singletonsInstances";
import { FindProjectByUUIDController } from "./find-project-by-uuid.controller";
import { FindProjectByUUIDUseCase } from "./find-project-by-uuid.usecase";

const usecase = new FindProjectByUUIDUseCase(
    mongoDBProjectsRepository
)

const findProjectByUUIDController = new FindProjectByUUIDController(
    usecase
)

export { findProjectByUUIDController };
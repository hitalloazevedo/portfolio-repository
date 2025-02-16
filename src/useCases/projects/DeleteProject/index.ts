import { DeleteProjectController } from "./DeleteProjectContoller";
import { DeleteProjectUseCase } from "./DeleteProjectUseCase";
import { mongoDBProjectsRepository } from "../../../shared/singletonsInstances";

const deleteProjectUseCase = new DeleteProjectUseCase(
    mongoDBProjectsRepository
);

const deleteProjectController = new DeleteProjectController(
    deleteProjectUseCase
);

export { deleteProjectController };
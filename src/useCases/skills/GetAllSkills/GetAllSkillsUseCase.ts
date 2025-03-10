import { MongoDBSkillsRepository } from "../../../repositories/implementations/MongoDBSkillsRepository";
import { Skill } from "../../../entities/Skill";

export class GetAllSkillsUseCase {
    constructor (
        private skillsRepository: MongoDBSkillsRepository
    ) {}

    async execute() {
        const skills = await this.skillsRepository.findAll();
        return skills;
    }
}
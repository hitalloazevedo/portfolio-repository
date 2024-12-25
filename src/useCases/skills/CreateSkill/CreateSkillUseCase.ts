import { MongoDBSkillsRepository } from "../../../repositories/implementations/MongoDBSkillsRepository";
import { ICreateSkillRequestDTO } from "./CreateSkillDTO";
import { Skill } from "../../../entities/Skill";

export class CreateSkillUseCase {
    constructor (
        private skillsRepository: MongoDBSkillsRepository
    ) {}

    async execute(data: ICreateSkillRequestDTO) {
        
        const skillAlreadyExists = await this.skillsRepository.findByTitle(data.title);

        if (skillAlreadyExists) {
            throw new Error("Skill already exists.");
        }

        const escapedSvg: string = encodeURIComponent(data.svg_image)
        .replace(/'/g, '%27')
        .replace(/"/g, '%22');

        const base64Svg = `data:image/svg+xml;charset=utf-8,${escapedSvg}`;

        const skill = new Skill({  
            title: data.title, 
            description: data.description, 
            svg_image: base64Svg
        })

        await this.skillsRepository.save(skill);
    }
}
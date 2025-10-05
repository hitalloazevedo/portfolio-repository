import { MongoDBSkillsRepository } from "../../../repositories/implementations/MongoDBSkillsRepository";
import { ICreateSkillRequestDTO } from "./CreateSkillDTO";
import { Skill } from "../../../entities/skill";
import { svgToBase64 } from "../../../utils/svgImageHandler";

export class CreateSkillUseCase {
    constructor (
        private skillsRepository: MongoDBSkillsRepository
    ) {}

    async execute({ title, description, svg_image }: ICreateSkillRequestDTO) {
        
        const skillAlreadyExists = await this.skillsRepository.findByTitle(title);

        if (skillAlreadyExists) {
            throw new Error("Skill already exists.");
        }

        const base64Svg = svgToBase64(svg_image);

        const skill = new Skill({  
            title, 
            description,
            svg_image: base64Svg
        })

        await this.skillsRepository.save(skill);
    }
}
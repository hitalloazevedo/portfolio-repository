import { AlreadyExistsError } from "./errors/already-exists.error";
import { svgToBase64 } from "../helpers/svg-to-base64";
import { HttpError } from "./errors/http.error";
import { CreateSkillRequestDTO, CreateSkillSchema, makeSkill } from "../entities/skill";
import { SkillRepository } from "../repositories/interfaces/skill.repository";

export class SkillUseCase {
  constructor(private readonly repo: SkillRepository) {}

  async create(dto: CreateSkillRequestDTO) {
    const parsed = CreateSkillSchema.parse(dto);

    const { description, title, svgImage } = parsed;

    const skill = await this.repo.findByTitle(title);

    if (skill) throw new AlreadyExistsError(`skill ${title} already exists.`);

    const base64Image = svgToBase64(svgImage);

    const newSkill = makeSkill({
      base64Image,
      description,
      title,
    });

    await this.repo.save(newSkill);
  }

  async findAll() {
    return await this.repo.findAll();
  }

  async deleteByTitle(title: string) {
    if (!title)
      throw new HttpError(400, "invalid input.", "a title must be provided.");
    await this.repo.delete(title);
  }
}
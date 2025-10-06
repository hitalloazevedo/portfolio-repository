import mongoose from "mongoose";
import { ProjectRepository } from "../interfaces/project.repository";
import { CreateProjectDTO, makeProject, Project } from "../../entities/project";

export const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  githubUrl: { type: String, required: true },
  deployUrl: { type: String, required: true },
  techStack: { type: Array<String>, required: true },
});

const ProjectModel = mongoose.model<Project>("Project", ProjectSchema);

export class MongoProjectRepository implements ProjectRepository {
  findByUUID(uuid: string): Promise<Project | null> {
    throw new Error("Method not implemented.");
  }

  async save(dto: CreateProjectDTO): Promise<void> {
    const skill = new ProjectModel(dto);
    await skill.save();
  }

  async findAll(): Promise<Project[]> {
    const response = await ProjectModel.find();
    return response.map(document => makeProject({
        deployUrl: document.deployUrl,
        description: document.description,
        githubUrl: document.githubUrl,
        imageUrl: document.imageUrl,
        techStack: document.techStack,
        title: document.title
    }));
  }

  async findByTitle(title: string): Promise<Project | null> {
    const response = await ProjectModel.findOne({ title });
    if (!response) return null;

    return makeProject({
        deployUrl: response.deployUrl,
        description: response.description,
        githubUrl: response.githubUrl,
        imageUrl: response.imageUrl,
        techStack: response.techStack,
        title: response.title
    });
  }

  async deleteByTitle(title: string): Promise<void> {
    const { deletedCount } = await ProjectModel.deleteOne({ title });
    if (deletedCount > 0){
      console.log(`Project (${title}) deleted!`);
    }
  }
}

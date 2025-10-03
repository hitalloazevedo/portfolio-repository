import mongoose, { Schema } from "mongoose";
import { Project } from "../../entities/project";
import { IProjectsRepository } from "../project.repository";
import { ICache } from "../../infrastructure/cache/ICache";

const ProjectSchema: Schema = new mongoose.Schema({
    uuid: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    image_url: { type: String, required: true},
    repo_url: { type: String, required: true},
    deploy_url: { type: String, required: true},
    tech_stack: { type: [String], required: true}
});

const ProjectModel = mongoose.model<Project>('Project', ProjectSchema);

export class MongoDBProjectsRepository implements IProjectsRepository {

    private cacheExpirationTime: number;
    private static instance: MongoDBProjectsRepository;
    private cache: ICache<Project[]>;
    private cacheKey: string;

    private constructor(
        cache: ICache
    ){
        this.cache = cache;
        this.cacheKey = "projects";
        this.cacheExpirationTime = 86400; // cache expire in 24 hours
    }

    async findByUUID(uuid: string): Promise<Project | undefined> {
        try {

            const project = await ProjectModel.findOne({ uuid });
            
            if (!project){
                throw new Error(`Project with uuid ${uuid} not found.`);
            }

            return project;

        } catch (err) {
            console.log("Error trying to find project by uuid.", err);
        }
    }

    public static getInstance(cache: ICache): MongoDBProjectsRepository {
        if (!MongoDBProjectsRepository.instance){
            MongoDBProjectsRepository.instance = new MongoDBProjectsRepository(cache);
        }

        return MongoDBProjectsRepository.instance;
    }

    async findAll(): Promise<Project[] | undefined> {
        try {
            
            // looking into cache first
            const allProjects = await this.cache.get(this.cacheKey);
            if (allProjects) return allProjects;

            // otherwise, request the data from mongodb

            const response = await ProjectModel.find();

            const projects = response.map((p) => {
                return new Project({ 
                    uuid: p.uuid,
                    title: p.title, 
                    deploy_url: p.deploy_url, 
                    description: p.description,
                    image_url: p.image_url,
                    repo_url: p.repo_url,
                    tech_stack: p.tech_stack
                 })
            })

            // caching data after query main database
            await this.cache.set(this.cacheKey, projects, this.cacheExpirationTime);

            return projects;

        } catch (err) {
            console.log("Error: ", err);

        } 
    }

    async findByTitle(title: string): Promise<Project | undefined> {
        try {

            const response = await ProjectModel.findOne({ title: title});

            if (response){
                return new Project({
                    uuid: response.uuid,
                    title: response.title, 
                    deploy_url: response.deploy_url, 
                    description: response.description,
                    image_url: response.image_url,
                    repo_url: response.repo_url,
                    tech_stack: response.tech_stack
                })
            }

        } catch (err) {
            console.log("Error looking for project: ", err);
        }
    }

    async save(project: Project): Promise<void> {
        try {

            const newProject = new ProjectModel({
                uuid: project.uuid,
                title: project.title,
                description: project.description,
                image_url: project.image_url,
                repo_url: project.repo_url,
                deploy_url: project.deploy_url,
                tech_stack: project.tech_stack
            })

            await newProject.save();
            console.log("Project saved");

            // cleaning the cache after some database modification
            this.cache.delete(this.cacheKey);

        } catch(err) {
            console.log(err);
        }
    }

    async getIdbyUuid(uuid: string): Promise<unknown> {
        try {

            const project = await ProjectModel.findOne({ uuid }, { _id: 1 })
            
            if (!project){
                throw new Error(`Project with uuid ${uuid} not found.`);
            }

            return project._id;

        } catch (err) {
            console.log("Error trying to find project by uuid.", err);
        }
    }
    
    async update(_id: unknown, newData: Partial<Project>): Promise<void> {
        try {

            await ProjectModel.findByIdAndUpdate(_id, { $set: newData});

            // cleaning the cache after some database modification
            this.cache.delete(this.cacheKey);

        } catch (err) {
            console.log("Error while updating project", err);
        } 
    }

    async delete(_id: unknown): Promise<void> {
        try {

            await ProjectModel.deleteOne({ _id });

            // cleaning the cache after some database modification
            this.cache.delete(this.cacheKey);

        } catch (err) {
            console.log("Error deleting project", err);
        }
    }
}
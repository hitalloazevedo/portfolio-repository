import mongoose, { Schema, Document } from "mongoose";
import { ObjectId } from "mongoose";

import { Project } from "../../entities/Project";
import { IProjectsRepository } from "../IProjectsRepository";
import dotenv from 'dotenv'

interface IProject extends Document {
    uuid: string;
    title: string;
    description: string;
    image_url: string;
    repo_url: string;
    deploy_url: string;
    tech_stack: string[];
}

const ProjectSchema: Schema = new mongoose.Schema({
    uuid: { type: String, required: true},
    title: { type: String, required: true},
    description: { type: String, required: true},
    image_url: { type: String, required: true},
    repo_url: { type: String, required: true},
    deploy_url: { type: String, required: true},
    tech_stack: { type: [String], required: true}
});

const ProjectModel = mongoose.model<IProject>('Project', ProjectSchema);







export class MongoDBProjectsRepository implements IProjectsRepository {

    private connectionString: string;

    constructor(){

        // configuração para conseguir ler as variaveis de
        dotenv.config();

        this.connectionString = String(process.env.MONGODB_CONNECTION_STRING);

    }

    async connect(){
        try {
            await mongoose.connect(this.connectionString);
        } catch (err) {
            console.log("Error connecting to MongoDB: ", err);
        }

    }

    async closeConnection(): Promise<void> {
        try {
            await mongoose.connection.close();
        } catch (err) {
            console.log("Error closing MongoDB connection: ", err);
        }
    }

    async findAll(): Promise<Project[] | undefined> {
        try {
            await this.connect();

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

            return projects;

        } catch (err) {
            console.log("Error: ", err);

        } finally {
            await this.closeConnection();
        }
    }

    async findByTitle(title: string): Promise<Project | undefined> {
        try {

            await this.connect();

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
        } finally {
            await this.closeConnection();
        }

    }

    async save(project: Project): Promise<void> {
        try {

            await this.connect();

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

        } catch(err) {
            console.log(err);
        } finally {
            await this.closeConnection();
        }
    }

    async getIdbyUuid(uuid: string): Promise<unknown> {
        try {
            await this.connect();

            const project = await ProjectModel.findOne({ uuid }, { _id: 1 })
            
            if (!project){
                throw new Error(`Project with uuid ${uuid} not found.`);
            }

            return project._id;

        } catch (err) {
            console.log("Error trying to find project by uuid.", err);
        } finally {
            await this.closeConnection();
        }
    }
    
    async update(_id: unknown, newData: Partial<Project>): Promise<void> {
        try {
            await this.connect();

            await ProjectModel.findByIdAndUpdate(_id, { $set: newData});

        } catch (err) {
            console.log("Error while updating project", err);
        } finally {
            await this.closeConnection();
        }
    }

    async delete(_id: unknown): Promise<void> {
        try {
            await this.connect();

            await ProjectModel.deleteOne({ _id });

        } catch (err) {
            console.log("Error deleting project", err);
        } finally {
            await this.closeConnection();
        }
    }
}
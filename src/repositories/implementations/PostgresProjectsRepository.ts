import { Project } from "../../entities/Project";
import { IProjectsRepository } from "../IProjectsRepository";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import dotenv from 'dotenv'

export class PostgresProjectsRepository implements IProjectsRepository {

    private supabase: SupabaseClient;
    private supabaseUrl: string;
    private supabaseKey: string;

    constructor(){

        // configuração para conseguir ler as variaveis de
        dotenv.config();

        this.supabaseUrl = String(process.env.SUPABASE_URL);
        this.supabaseKey = String(process.env.SUPABASE_API_KEY);
        this.supabase = createClient(this.supabaseUrl, this.supabaseKey);
    }

    async findAll(): Promise<Project[]> {
        const { data, error } = await this.supabase
            .from('projects')
            .select()

        if (error) {
            console.log(error)
        }

        return data
    }

    async findByTitle(title: string): Promise<Project> {
        const { data, error } = await this.supabase
            .from("projects")
            .select()
            .eq('title', title);

        if (error) {
            console.log(error)
        }

        if (data){
            return data[0];
        }

        return null;
    }

    async save(project: Project): Promise<void> {
        const { error } = await this.supabase.from('projects').insert({
            title: project.title,
            description: project.description,
            image_url: project.imageUrl,
            tech_stack: project.technologies,
            deploy_link: project.deployUrl,
            github_link: project.repoUrl
        })
        if (error) {
            console.log(error)
        }
    }
}
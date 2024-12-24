import { ObjectId } from "mongoose";

export class Project {
    
    public title: string;
    public description: string;
    public image_url: string;
    public repo_url: string;
    public deploy_url: string;
    public tech_stack: Array<string>;

    constructor (props: Omit<Project, 'id'>, id?: ObjectId){
        
        // Object.assign(this, props);

        this.title = props.title;
        this.description = props.description;
        this.image_url = props.image_url;
        this.repo_url = props.repo_url;
        this.deploy_url = props.deploy_url;
        this.tech_stack = props.tech_stack;
    }
}
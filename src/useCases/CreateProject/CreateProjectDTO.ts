export interface ICreateProjectRequestDTO {
    title: string;
    description: string;
    image_url: string;
    repo_url: string;
    deploy_url: string;
    tech_stack: Array<string>;
}
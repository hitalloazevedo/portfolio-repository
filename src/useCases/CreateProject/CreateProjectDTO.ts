export interface ICreateProjectRequestDTO {
    title: string;
    description: string;
    imageUrl: string;
    repoUrl: string;
    deployUrl: string;
    technologies: Array<string>;
}
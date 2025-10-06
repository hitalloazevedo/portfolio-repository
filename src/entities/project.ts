import { z } from "zod";

export const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.url("ImageUrl must be a valid URL"),
  githubUrl: z.url("GitHubUrl must be a valid URL"),
  deployUrl: z.url("DeployUrl must be a valid URL"),
  techStack: z.array(z.string().min(1)).nonempty("TechStack must have at least one technology"),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export type Project = ProjectInput;

export function makeProject(props: ProjectInput): Project {
  return projectSchema.parse(props);
}

export type CreateProjectDTO = z.infer<typeof projectSchema>;

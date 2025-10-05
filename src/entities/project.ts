import { v7 as uuidv7 } from "uuid";
import { z } from "zod";

const projectSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  imageUrl: z.url("ImageUrl must be a valid URL"),
  githubUrl: z.url("GitHubUrl must be a valid URL"),
  deployUrl: z.url("DeployUrl must be a valid URL"),
  techStack: z.array(z.string().min(1)).nonempty("TechStack must have at least one technology"),
});

export type ProjectInput = z.infer<typeof projectSchema>;

export type Project = ProjectInput & { uuid: string };

export function makeProject(props: ProjectInput): Project {
  const data = projectSchema.parse(props);

  return {
    uuid: uuidv7(),
    ...data,
  };
}

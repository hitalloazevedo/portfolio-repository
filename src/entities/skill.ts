import { z } from "zod";

const skillSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  base64Image: z.string().regex(/^data:image\/svg\+xml;base64,/, "Must be a valid base64 svg"),
})

type SkillInput = z.infer<typeof skillSchema>;

export type Skill = SkillInput;

export function makeSkill(props: SkillInput): Skill {
    const data = skillSchema.parse(props);
    return data;
}

export type CreateSkillRequestDTO = z.infer<typeof CreateSkillSchema>;

export const CreateSkillSchema = z.object({
  title: z.string().min(1, "Title is required"), // must be non-empty
  description: z.string().min(1, "Description is required"), // must be non-empty
  svgImage: z.string().min(1, "SVG image is required"), // must be non-empty
});

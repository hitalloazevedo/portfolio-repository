import { z } from "zod";

const pdfFileSchema = z.object({
  filename: z
    .string()
    .min(1, "Filename is required")
    .refine((val) => val.toLowerCase().endsWith(".pdf"), "Filename must have a .pdf extension"),
  filepath: z
    .string()
    .min(1, "Filepath is required")
    .refine((val) => val.startsWith("/") || val.startsWith("./"), "Filepath must be absolute or relative"),
});

export type PDFFileInput = z.infer<typeof pdfFileSchema>;

export function makePDFFile(props: PDFFileInput): PDFFileInput {
  const data = pdfFileSchema.parse(props);
  return data;
}

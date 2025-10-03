import { makePDFFile, PDFFileInput } from "./pdf-file";
import { ZodError } from "zod";

describe("makePDFFile", () => {
  const validInput: PDFFileInput = {
    filename: "document.pdf",
    filepath: "./uploads/document.pdf",
  };

  it("should return the file object when valid props are provided", () => {
    const file = makePDFFile(validInput);
    expect(file).toEqual(validInput);
  });

  it("should throw ZodError if filename is empty", () => {
    expect(() =>
      makePDFFile({ ...validInput, filename: "" })
    ).toThrow(ZodError);
  });

  it("should throw ZodError if filepath is empty", () => {
    expect(() =>
      makePDFFile({ ...validInput, filepath: "" })
    ).toThrow(ZodError);
  });

  it("should throw ZodError if filename does not end with .pdf", () => {
    expect(() =>
      makePDFFile({ ...validInput, filename: "file.txt" })
    ).toThrow(ZodError);
  });

  it("should throw ZodError if filepath does not start with / or ./", () => {
    expect(() =>
      makePDFFile({ ...validInput, filepath: "uploads/file.pdf" })
    ).toThrow(ZodError);
  });
});

import { makeSkill } from "./kill";
import { ZodError } from "zod";

const validInput = {
  title: "Node.js",
  description: "Backend development",
  base64Image: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0i...",
};

describe("makeSkill", () => {
  it("should throw ZodError if title is empty", () => {
    expect(() => makeSkill({ ...validInput, title: "" })).toThrow(ZodError);
  });

  it("should throw ZodError if description is empty", () => {
    expect(() => makeSkill({ ...validInput, description: "" })).toThrow(ZodError);
  });

  it("should throw ZodError if base64Image is invalid", () => {
    expect(() => makeSkill({ ...validInput, base64Image: "invalidBase64" })).toThrow(ZodError);
  });
});

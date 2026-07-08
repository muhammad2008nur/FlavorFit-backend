import { randomBytes } from "crypto";

export const generateToken = (length: number = 32) => {
  return randomBytes(length).toString("hex");
};

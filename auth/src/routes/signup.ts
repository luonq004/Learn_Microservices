import express, { Request, Response } from "express";
import { z } from "zod";

import { RequestValidationError } from "../errors/request-validation-error";
import { BadRequestError } from "../errors/bad-request-error";

import { User } from "../models/user.schema";

const router = express.Router();

const signupSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
      invalid_type_error: "Email must be a string",
    })
    .email("Email must be valid"),
  password: z
    .string({
      required_error: "Password is required",
    })
    .trim()
    .min(4, "Password must be at least 4 characters long")
    .max(20, "Password must be at most 20 characters long"),
});

router.post(
  "/api/users/signup",
  async (req: Request, res: Response): Promise<any> => {
    const result = signupSchema.safeParse(req.body);

    if (!result.success) {
      throw new RequestValidationError(result.error);
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    res.status(201).send(user);
  }
);

export { router as signupRouter };

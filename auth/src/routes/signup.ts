import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { z } from "zod";

import { BadRequestError } from "../errors/bad-request-error";

import { validateRequest } from "../middlewares/validate-request";
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
  validateRequest(signupSchema),
  async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      throw new BadRequestError("Email in use");
    }

    const user = User.build({ email, password });
    await user.save();

    const userJWT = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    req.session = {
      jwt: userJWT,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };

import express, { Request, Response } from "express";
import { z } from "zod";
import { RequestValidationError } from "../errors/request-validation-error";
import { DatabaseConnectionError } from "../errors/database-connection-error";

const router = express.Router(); // Đã chính xác

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

router.post("/api/users/signup", (req: Request, res: Response): any => {
  const result = signupSchema.safeParse(req.body);

  if (!result.success) {
    // const errors = result.error.errors.map((error) => error.message);
    // console.log(result);
    throw new RequestValidationError(result.error);
  }

  throw new DatabaseConnectionError();

  // return res.status(201).json({ message: "Đăng ký thành công!" }); // Trả về success với status 201
});

export { router as signupRouter };

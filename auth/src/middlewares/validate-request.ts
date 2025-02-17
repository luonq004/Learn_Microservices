import { Request, Response, NextFunction } from "express";

import { ZodSchema } from "zod";
import { RequestValidationError } from "../errors/request-validation-error";

/**
 * Middleware validate dữ liệu với schema Zod
 * @param schema - Schema Zod cần validate
 */

export const validateRequest =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      throw new RequestValidationError(result.error);
    }
    next();
  };

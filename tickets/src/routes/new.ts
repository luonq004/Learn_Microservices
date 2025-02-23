import express, { Request, Response } from "express";
import { requireAuth, validateRequest } from "@lqvtickets/common";
import { z } from "zod";

const router = express.Router();

const signinSchema = z.object({
  title: z.string({
    required_error: "Title is required",
  }),
  price: z
    .number({
      required_error: "Price is required",
    })
    .nonnegative("Price must be greater than 0"),
});

router.post(
  "/api/tickets",
  requireAuth,
  validateRequest(signinSchema),
  (req: Request, res: Response) => {
    res.sendStatus(200);
  }
);

export { router as createTicketRouter };

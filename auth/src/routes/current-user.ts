import express from "express";
import { currentUser } from "@lqvtickets/common";
import { requireAuth } from "@lqvtickets/common";

const router = express.Router();

router.get("/api/users/current-user", currentUser, requireAuth, (req, res) => {
  res.send({ currentUser: req.currentUser || null });
});

export { router as currentUserRouter };

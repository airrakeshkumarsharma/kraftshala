import { Router } from "express";
import { assignmentRoutes } from "./assignment";
import { userAuthRouter } from "./user.auth";

const router = Router();

// Auth
router.use("/auth", userAuthRouter);
router.use("/assignment", assignmentRoutes);

export { router };

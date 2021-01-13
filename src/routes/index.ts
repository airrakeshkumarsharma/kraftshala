import { Router } from "express";
import { assignmentRoutes } from "./assignment";
import { instructorAssignmentRouter } from "./instructorAssignment";
import { userRouter } from "./user";

const router = Router();

// Auth
router.use("/user", userRouter);
router.use("/instructor-assignment", instructorAssignmentRouter);
router.use("/assignment", assignmentRoutes);

export { router };

import AssignmentController from "@controllers/assignment";
import { asyncMiddleware } from "@middlewares/asyncMiddleware";
import { instructorAuth } from "@middlewares/auth";
import { validator } from "@middlewares/validator";
import { assignmentSchema } from "@validators";
import { Router } from "express";

const routes = Router();

const assignmentController = new AssignmentController();

routes.post(
  "/assign-to-student",
  instructorAuth,
  validator({ body: assignmentSchema.create }),
  asyncMiddleware(assignmentController.assign)
);

export { routes as assignmentRoutes };

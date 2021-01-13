import { CONSTANTS } from "@configs";
import AssignmentController from "@controllers/assignment";
import { asyncMiddleware } from "@middlewares/asyncMiddleware";
import { instructorAuth, studentAuth } from "@middlewares/auth";
import { fileValidator, validator } from "@middlewares/validator";
import { assignmentSchema, pipeline as pipelineSchema } from "@validators";
import { Router } from "express";

const routes = Router();

const assignmentController = new AssignmentController();

routes.post(
  "/assign-to-student",
  instructorAuth,
  validator({ body: assignmentSchema.create }),
  asyncMiddleware(assignmentController.assign)
);

routes.put(
  "/submit-assignment/:assignmentId",
  studentAuth,
  fileValidator([...CONSTANTS.MIME_TYPE.ASSIGNMENT_FILE], null, 10 * 1024 * 1024).single("file"),
  asyncMiddleware(assignmentController.submitAssignment)
);

routes.get(
  "/get-assignments",
  studentAuth,
  validator({ query: pipelineSchema }),
  asyncMiddleware(assignmentController.getAssignmentsByStudent)
);

export { routes as assignmentRoutes };

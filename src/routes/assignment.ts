import { CONSTANTS } from "@configs";
import AssignmentController from "@controllers/assignment";
import { asyncMiddleware } from "@middlewares/asyncMiddleware";
import { instructorAuth } from "@middlewares/auth";
import { fileValidator, validator } from "@middlewares/validator";
import { assignmentSchema } from "@validators";
import { Router } from "express";

const routes = Router();

const assignmentController = new AssignmentController();

routes.post(
  "/upload-assignment",
  instructorAuth,
  fileValidator([...CONSTANTS.MIME_TYPE.ASSIGNMENT_FILE], null, 50 * 1024 * 1024).single("file"),
  validator({ body: assignmentSchema.create }),
  asyncMiddleware(assignmentController.upload)
);

export { routes as assignmentRoutes };

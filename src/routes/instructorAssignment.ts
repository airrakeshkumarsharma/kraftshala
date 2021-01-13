import { CONSTANTS } from "@configs";
import InstructorAssignmentController from "@controllers/instructorAssignment";
import { asyncMiddleware } from "@middlewares/asyncMiddleware";
import { instructorAuth } from "@middlewares/auth";
import { fileValidator, validator } from "@middlewares/validator";
import { instructorAssignmentSchema } from "@validators";
import { Router } from "express";

const routes = Router();

const instructorAssignmentController = new InstructorAssignmentController();

routes.post(
  "/upload",
  instructorAuth,
  fileValidator([...CONSTANTS.MIME_TYPE.ASSIGNMENT_FILE], null, 50 * 1024 * 1024).single("file"),
  validator({ body: instructorAssignmentSchema.create }),
  asyncMiddleware(instructorAssignmentController.upload)
);

routes.get("/get-all", instructorAuth, instructorAssignmentController.getAll);
export { routes as instructorAssignmentRouter };

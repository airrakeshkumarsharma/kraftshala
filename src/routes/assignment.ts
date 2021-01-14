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
  "students/get-assignments",
  studentAuth,
  validator({ query: pipelineSchema }),
  asyncMiddleware(assignmentController.getAssignmentsByStudent)
);

routes.get(
  "instructor/get-assignments",
  instructorAuth,
  validator({ query: pipelineSchema }),
  asyncMiddleware(assignmentController.getAssignmentsByInstructor)
);

routes.put(
  "instructor/assignments-grade",
  instructorAuth,
  validator({ body: assignmentSchema.addGrade }),
  asyncMiddleware(assignmentController.addGradeByInstructor)
);

export { routes as assignmentRoutes };

import InstructorAssignmentSI from "@interfaces/instructorAssignment";
import { instructorAssignmentModel } from "@models";
import BaseService from "./base";

class InstructorAssignmentService extends BaseService<InstructorAssignmentSI> {
  constructor() {
    super(instructorAssignmentModel);
  }
}

export default new InstructorAssignmentService();

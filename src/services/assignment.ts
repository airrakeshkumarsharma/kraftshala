import AssignmentSI from "@interfaces/assignment";
import { assignmentModel } from "@models";
import BaseService from "./base";

class AssignmentService extends BaseService<AssignmentSI> {
  constructor() {
    super(assignmentModel);
  }
}

export default new AssignmentService();

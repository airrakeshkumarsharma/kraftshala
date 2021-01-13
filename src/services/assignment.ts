import AssignmentSI from "@interfaces/assignment";
import instructorAssignmentService from "./instructorAssignment";
import { assignmentModel } from "@models";
import BaseService from "./base";
import { Types } from "mongoose";

class AssignmentService extends BaseService<AssignmentSI> {
  instructorAssignmentService;
  constructor() {
    super(assignmentModel);
    this.instructorAssignmentService = instructorAssignmentService;
  }

  isDeadlineOver = async (assignmentId: Types.ObjectId) => {
    const assignmentDeadlineCondition = { assignmentId, deadline: { $gt: new Date() } };
    const resource = await this.instructorAssignmentService.exists(assignmentDeadlineCondition);
    return resource;
  };
}

export default new AssignmentService();

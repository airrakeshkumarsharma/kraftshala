import AssignmentSI from "@interfaces/assignment";
import { assignmentModel, instructorAssignmentModel } from "@models";
import BaseService from "./base";

class AssignmentService extends BaseService<AssignmentSI> {
  instructorAssignmentService;
  constructor() {
    super(assignmentModel);
    this.instructorAssignmentService = instructorAssignmentModel;
  }

  isDeadlineOver = async (filters: object) => {
    const resource = (await this.instructorAssignmentService.exists(filters)) as boolean;
    return resource;
  };
}

export default new AssignmentService();

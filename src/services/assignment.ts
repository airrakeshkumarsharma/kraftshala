import AssignmentSI from "@interfaces/assignment";
import instructorAssignmentService from "./instructorAssignment";
import { assignmentModel } from "@models";
import BaseService from "./base";
import { Types } from "mongoose";
import { IPipeline } from "@interfaces/pipeline";
import { mongoPipeline } from "@helpers/pipeline";
import { CONSTANTS } from "@configs";
import { decrypt } from "@helpers/crypto/aes-256-cbc";

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

  // FIXME: Query is not optimized. So, write a query which will optimize the query
  getAllAssignments = async (pipeline: IPipeline) => {
    const filters: any = pipeline.filters;
    const sort: any = pipeline.sort;
    const buildPipeline: any[] = mongoPipeline({ filters, sort });

    // Lookup pipeline
    const lookupPipeline: any[] = [];
    const COLLECTIONS = CONSTANTS.COLLECTIONS;
    lookupPipeline.push({
      $lookup: { from: COLLECTIONS.USERS, localField: "studentId", foreignField: "_id", as: "student" }
    });
    lookupPipeline.push({ $unwind: { path: "$student", preserveNullAndEmptyArrays: true } });

    lookupPipeline.push({
      $lookup: { from: COLLECTIONS.USERS, localField: "instructorId", foreignField: "_id", as: "instructor" }
    });
    lookupPipeline.push({ $unwind: { path: "$instructor", preserveNullAndEmptyArrays: true } });

    // Insert at position beginning
    buildPipeline.unshift(...lookupPipeline);

    buildPipeline.push({ $project: pipeline.projection });

    const assignments = await this.aggregate(buildPipeline);

    assignments.forEach(assignment => {
      assignment.student.email = decrypt(assignment.student.email);
      assignment.instructor.email = decrypt(assignment.instructor.email);
    });

    return assignments;
  };
}

export default new AssignmentService();

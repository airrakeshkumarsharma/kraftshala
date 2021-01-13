import { Types } from "mongoose";
import { mongoose } from "@configs";

export interface AssignmentI {
  assignmentId: Types.ObjectId;
  instructorId: Types.ObjectId;
  studentId: Types.ObjectId;
  isSubmitted: boolean;
  submittedAt: Date;
}

export default interface AssignmentSI extends AssignmentI, mongoose.Document {}

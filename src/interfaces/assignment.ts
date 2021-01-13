import { Types } from "mongoose";
import { mongoose } from "@configs";

export interface AssignmentI {
  assignmentId: Types.ObjectId;
  instructorId: Types.ObjectId;
  studentId: Types.ObjectId;
  solutionPdf: string;
  isSubmitted: boolean;
  submittedAt: Date;
  student: any;
  instructor: any;
}

export default interface AssignmentSI extends AssignmentI, mongoose.Document {}

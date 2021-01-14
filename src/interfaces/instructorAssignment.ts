import { Types } from "mongoose";
import { mongoose } from "@configs";

export interface AssignmentI {
  instructorId: Types.ObjectId;
  title: string;
  subject: string;
  question: string; // This is URL
  deadline: Date;
}

export default interface InstructorAssignmentSI extends AssignmentI, mongoose.Document {}

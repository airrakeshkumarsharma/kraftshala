import { mongoose } from "@configs";

export interface AssignmentI {
  title: string;
  subject: string;
  question: string;
  deadline: Date;
}

export default interface AssignmentSI extends AssignmentI, mongoose.Document {}

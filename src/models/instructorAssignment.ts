import { Types } from "mongoose";
import { Schema, Model, model } from "mongoose";
import { CONSTANTS } from "@configs";
import InstructorAssignmentSI from "@interfaces/instructorAssignment";

const instructorAssignmentSchema: Schema<any> = new Schema(
  {
    instructorId: {
      type: Types.ObjectId,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    subject: {
      type: String,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    deadline: {
      type: Date,
      required: true
    }
  },
  {
    timestamps: true
  }
);

const COLLECTION_NAME = CONSTANTS.COLLECTIONS.INSTRUCTOR_ASSIGNMENT;
const instructorAssignmentModel: Model<any> = model<InstructorAssignmentSI>(
  COLLECTION_NAME,
  instructorAssignmentSchema,
  COLLECTION_NAME
);
instructorAssignmentModel.createCollection(); // If not than create

export { instructorAssignmentModel };

import { Schema, Model, model } from "mongoose";
import { CONSTANTS } from "@configs";
import AssignmentSI from "@interfaces/assignment";

const assignmentSchema: Schema<any> = new Schema(
  {
    title: {
      type: String
    },
    subject: {
      type: String
    },
    question: {
      type: String
    },
    deadline: {
      type: Date
    }
  },
  {
    timestamps: true
  }
);

const COLLECTION_NAME = CONSTANTS.COLLECTIONS.ASSIGNMENT;
const assignmentModel: Model<any> = model<AssignmentSI>(COLLECTION_NAME, assignmentSchema, COLLECTION_NAME);
assignmentModel.createCollection(); // If not than create

export { assignmentModel };

import { Types } from "mongoose";
import { Schema, Model, model } from "mongoose";
import { CONSTANTS } from "@configs";
import AssignmentSI from "@interfaces/assignment";

const assignmentSchema: Schema<any> = new Schema(
  {
    assignmentId: {
      type: Types.ObjectId,
      required: true
    },
    instructorId: {
      type: Types.ObjectId,
      required: true
    },
    studentId: {
      type: Types.ObjectId,
      required: true
    },
    isSubmitted: {
      type: Boolean,
      default: false
    },
    submittedAt: {
      type: Date,
      default: null
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

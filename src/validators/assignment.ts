import { Joi } from "celebrate";
import { CONSTANTS } from "../configs/constants";

export const assignmentSchema = {
  create: Joi.object().keys({
    assignmentId: Joi.string().regex(CONSTANTS.REGEX.MONGO_OBJECT_ID).required(),
    studentIds: Joi.array().items(Joi.string().regex(CONSTANTS.REGEX.MONGO_OBJECT_ID).required()).required()
  }),
  addGrade: Joi.object().keys({
    assignmentId: Joi.string().regex(CONSTANTS.REGEX.MONGO_OBJECT_ID).required(),
    grade: Joi.number().min(0).max(10).required()
  })
};

import { Joi } from "celebrate";
import { CONSTANTS } from "../configs/constants";

export const assignmentSchema = {
  create: Joi.object().keys({
    assignmentId: Joi.string().regex(CONSTANTS.REGEX.MONGO_OBJECT_ID).required(),
    studentIds: Joi.array().items(Joi.string().regex(CONSTANTS.REGEX.MONGO_OBJECT_ID).required()).required()
  })
};

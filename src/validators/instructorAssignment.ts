import { Joi } from "celebrate";

export const instructorAssignmentSchema = {
  create: Joi.object().keys({
    title: Joi.string().required(),
    subject: Joi.string().required(),
    deadline: Joi.date().required()
  })
};

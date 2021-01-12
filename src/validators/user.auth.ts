import { CONSTANTS, ENUMS, ENUMS_ARRAY } from "@configs";
import { Joi } from "celebrate";

export const userAuthSchema = {
  create: Joi.object().keys({
    userType: Joi.string()
      .valid(...ENUMS_ARRAY.USERS.userType)
      .required(),
    name: Joi.string().max(CONSTANTS.USER.MAX_FIRST_NAME_LEN).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(CONSTANTS.USER.MIN_PASSWORD_LEN).required(),
    // Subject is required only in case of instructor
    subjects: Joi.alternatives().conditional("userType", {
      is: ENUMS.USERS.userType.INSTRUCTOR,
      then: Joi.array().items(Joi.string()).required(),
      otherwise: Joi.disallow()
    })
  }),

  login: Joi.object().keys({
    email: Joi.string().required(),
    password: Joi.string().required()
  })
};

import { Schema, Model, model } from "mongoose";
import UserSI from "@interfaces/user";
import { CONSTANTS } from "@configs";
import { hashPassword, validatePassword } from "@helpers/bycrypt";
import { createHash } from "@helpers/crypto/hmac-sha-256";
import { decrypt, encrypt } from "@helpers/crypto/aes-256-cbc";

const enums = {
  userType: {
    STUDENT: "STUDENT",
    INSTRUCTOR: "INSTRUCTOR"
  }
};
const enumArrays = {
  userType: Object.values(enums.userType)
};

const isUserTypeInstructor = function (this: any) {
  return this.userType === enums.userType.INSTRUCTOR;
};

const userSchema: Schema<any> = new Schema(
  {
    userType: {
      type: String,
      enum: enumArrays.userType,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    emailHash: {
      type: String,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    subjects: {
      type: [String],
      required: isUserTypeInstructor
    }
  },
  {
    timestamps: true
  }
);

// FIXME: Users type Safety should go Interface instead of any
const modifyOrCreateOperations = async (user: any) => {
  user.password ? (user.password = await hashPassword(user.password)) : null;

  user.email ? (user.email = user.email.toLowerCase()) : null;
  user.email ? (user.emailHash = createHash(user.email)) : null;
  user.email ? (user.email = encrypt(user.email)) : null;
  return user;
};

// On save
const save = function (this: any) {
  return modifyOrCreateOperations(this);
};

// On update
const update = async function (this: any) {
  let user: any = this.getUpdate();
  return await modifyOrCreateOperations(user);
};
const findOne = (doc: any) => {
  doc && doc.email ? (doc.email = decrypt(doc.email)) : null;
};

// TODO: Go for better solution
const findAll = (docs: any) => {
  for (let i = 0; i < docs.length; i += 1) {
    findOne(docs[i]);
  }
};

// Pre hook
userSchema.pre("save", save);
userSchema.pre("findOneAndUpdate", update);
userSchema.pre("update", update);
userSchema.pre("updateOne", update);
userSchema.pre("updateMany", update);

userSchema.post("find", findAll);
userSchema.post("findOne", findOne);
userSchema.post("aggregate", findAll);

const COLLECTION_NAME = CONSTANTS.COLLECTIONS.USERS;
const userModel: Model<any> = model<UserSI>(COLLECTION_NAME, userSchema, COLLECTION_NAME);
userModel.createCollection(); // If not then create

// Add custom function
userModel.prototype.validatePassword = function (password: string) {
  return validatePassword(password, this.password);
};

export { userModel, enums as userEnums, enumArrays as userEnumArrays };

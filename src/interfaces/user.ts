import { mongoose } from "@configs";

export interface UserI {
  name: string;
  email: string;
  password?: string;
  subjects?: string[];
}

export default interface UserSI extends UserI, mongoose.Document {
  validatePassword(password: any): false;
}

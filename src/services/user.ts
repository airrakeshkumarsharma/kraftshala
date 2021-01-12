import UserSI from "@interfaces/user";
import { userModel } from "../models/user";
import BaseService from "./base";

class UserService extends BaseService<UserSI> {
  constructor() {
    super(userModel);
  }
}

export default new UserService();

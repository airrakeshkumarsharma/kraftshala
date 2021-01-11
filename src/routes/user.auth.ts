import UserAuthController from "@controllers/user.auth";
import { validator } from "@middlewares/validator";
import { userAuthSchema } from "@validators";
import { Router } from "express";

const router = Router();

const userAuthController = new UserAuthController();
// Auth
router.post("/signup", validator({ body: userAuthSchema.create }), userAuthController.post);
router.post("/login", validator({ body: userAuthSchema.login }), userAuthController.login);

export { router as userAuthRouter };

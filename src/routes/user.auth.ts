import UserAuthController from "@controllers/user.auth";
import { asyncMiddleware } from "@middlewares/asyncMiddleware";
import { instructorAuth, studentAuth } from "@middlewares/auth";
import { validator } from "@middlewares/validator";
import { userAuthSchema } from "@validators";
import { Router } from "express";

const router = Router();

const userAuthController = new UserAuthController();
// Auth
router.post("/signup", validator({ body: userAuthSchema.create }), asyncMiddleware(userAuthController.post));
router.post("/login", validator({ body: userAuthSchema.login }), asyncMiddleware(userAuthController.login));

export { router as userAuthRouter };

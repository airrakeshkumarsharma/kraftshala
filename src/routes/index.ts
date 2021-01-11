import { Router } from "express";
import { userAuthRouter } from "./user.auth";

const router = Router();

// Auth
router.use("/auth", userAuthRouter);

export { router };

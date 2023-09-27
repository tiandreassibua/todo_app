import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const router = express.Router();
router.use(authMiddleware);

router.get("/api/users/current", userController.get);
router.put("/api/users/current", userController.update);
router.delete("/api/auth/logout", userController.logout);

export default router;

import express from "express";
import userController from "../controller/user-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";
import taskController from "../controller/task-controller.js";

const router = express.Router();
router.use(authMiddleware);

// User API
router.get("/api/users/current", userController.get);
router.put("/api/users/current", userController.update);
router.delete("/api/auth/logout", userController.logout);

// Task API
router.get("/api/tasks", taskController.index);
router.post("/api/tasks", taskController.create);
router.put("/api/tasks/:taskId", taskController.update);
router.patch("/api/tasks/:taskId", taskController.updateStatus);
router.delete("/api/tasks/:taskId", taskController.destroy);

export default router;

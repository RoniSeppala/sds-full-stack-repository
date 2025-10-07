import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getGoals, createGoal, deleteGoal } from "../controllers/goalController.js";

const router = Router();

// Protect goals with auth middleware to ensure users can access only their own goals
router.use(authMiddleware);

router.route("/").get(getGoals).post(createGoal);
router.route("/:id").delete(deleteGoal);

export default router;
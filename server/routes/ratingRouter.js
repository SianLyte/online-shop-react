import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { ratingController } from "../controllers/ratingController.js";

const router = new Router();
router.post("/", authMiddleware, ratingController.create);
router.get("/", ratingController.getAll);
router.delete("/", authMiddleware, ratingController.delete);
router.get("/count", ratingController.getCount);
export { router };

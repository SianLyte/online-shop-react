import { Router } from "express";
import { basketController } from "../controllers/basketController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = new Router();

router.get("/", authMiddleware, basketController.getAll);
router.delete("/:id", authMiddleware, basketController.deleteDevice);
router.post("/:id", authMiddleware, basketController.addDevice);

export { router };

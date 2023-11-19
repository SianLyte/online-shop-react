import { Router } from "express";
import { deviceController } from "../controllers/deviceController.js";
const router = new Router();
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";
router.post("/", checkRoleMiddleware("ADMIN"), deviceController.create);
router.get("/", deviceController.getAll);
router.get("/:id", deviceController.getOne);
router.delete("/:id", checkRoleMiddleware("ADMIN"), deviceController.delete);

export { router };

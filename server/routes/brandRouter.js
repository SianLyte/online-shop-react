import { Router } from "express";
import { brandController } from "../controllers/brandController.js";
const router = new Router();
import { checkRoleMiddleware } from "../middleware/checkRoleMiddleware.js";

router.post("/", checkRoleMiddleware("ADMIN"), brandController.create);
router.get("/", brandController.getAll);

export { router };

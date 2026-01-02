import { Router } from "express";
import { ClientController } from "../controllers/client.controller";
import { requireAuth } from "../middleware/auth.middleware";

const router = Router();

router.get("/", ClientController.list);
router.get("/:id", ClientController.get);

// Protected
router.post("/", requireAuth, ClientController.create);
router.put("/:id", requireAuth, ClientController.update);
router.delete("/:id", requireAuth, ClientController.delete);

export default router;

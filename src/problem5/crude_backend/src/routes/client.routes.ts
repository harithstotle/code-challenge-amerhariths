import { Router } from "express";
import { ClientController } from "../controllers/client.controller";

const router = Router();

router.post("/", ClientController.create);
router.get("/", ClientController.list);
router.get("/:id", ClientController.get);
router.put("/:id", ClientController.update);
router.delete("/:id", ClientController.delete);

export default router;

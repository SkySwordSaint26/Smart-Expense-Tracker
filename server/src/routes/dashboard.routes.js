import express from "express";
import * as dashboardController from "../controllers/dashboard.controller.js";
import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/summary", protect, dashboardController.summary);
router.get("/recent", protect, dashboardController.recent);
router.get("/categories", protect, dashboardController.categories);

export default router;
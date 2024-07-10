import express from "express";

import protectRoute from "../middleware/protectRoute.js";
import {
  getCities,
  getCity,
  addCity,
  removeCity,
} from "../controllers/city.controller.js";

const router = express.Router();

router.get("/", protectRoute, getCities);
router.get("/:id", protectRoute, getCity);
router.post("/", protectRoute, addCity);
router.delete("/:id", protectRoute, removeCity);

export default router;

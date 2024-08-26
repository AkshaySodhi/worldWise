import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { updateFullname,updateUsername,updatePassword } from "../controllers/user.controller.js";

const router=express.Router();

router.put("/username/:id",protectRoute,updateUsername);
router.put("/fullname/:id",protectRoute,updateFullname);
router.put("/password/:id",protectRoute,updatePassword);

export default router;
import express from "express";
import { signup, login } from "../controllers/authController.js";
import { verifyToken } from "../controllers/auth.js";


const router = express.Router();
// const mid = (req, res, next) => {
//     console.log("Middleware executed");
//     next();
//   };
router.post("/signup", signup);
router.post("/login", login);
router.post("/verifyToken", verifyToken);
export default router;
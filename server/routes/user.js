import { Router } from "express";
import { changePassword, getTaxReports, login, logout, register, taxForm } from "../controllers/user.js";
import isAuthenticated from "../middlewares/auth.js";

// import { register, login, logout, getMyProfile, forgotPassword, resetPassword, changePassword, updateUser } from "../controllers/user.controller.js"
// import { isAuthenticated } from "../middlewares/auth.js";

const router = Router();

try {
    router.post("/register", register)
    router.post("/login", login)
    router.post("/logout", logout)
    router.post("/tax-form", isAuthenticated, taxForm)
    router.get("/getTaxReport",isAuthenticated, getTaxReports)
    router.post("/change-password", isAuthenticated, changePassword)

} catch (error) {
    console.log("error", error);
}

export default router;
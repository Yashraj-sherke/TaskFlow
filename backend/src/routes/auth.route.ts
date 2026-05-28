import { Router } from "express";
import passport from "passport";
import { config } from "../config/app.config";
import {
  googleLoginCallback,
  loginController,
  logOutController,
  registerUserController,
  forgotPasswordController,
  resetPasswordController,
} from "../controllers/auth.controller";

const failedUrl = `${config.FRONTEND_GOOGLE_CALLBACK_URL}?status=failure`;

const authRoutes = Router();

authRoutes.post("/register", registerUserController);
authRoutes.post("/login", loginController);

authRoutes.post("/logout", logOutController);

// Password reset
authRoutes.post("/forgot-password", forgotPasswordController);
authRoutes.post("/reset-password", resetPasswordController);

authRoutes.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

authRoutes.get(
  "/google/callback",
  (req, res, next) => {
    passport.authenticate("google", (error: Error | null, user: Express.User | false) => {
      if (error || !user) {
        return res.redirect(failedUrl);
      }

      req.logIn(user, (loginError) => {
        if (loginError) {
          return res.redirect(failedUrl);
        }

        return googleLoginCallback(req, res, next);
      });
    })(req, res, next);
  }
);

export default authRoutes;

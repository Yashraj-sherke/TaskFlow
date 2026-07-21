import "dotenv/config";
import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import session from "cookie-session";
import { config } from "./config/app.config";
import connectDatabase from "./config/database.config";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { HTTPSTATUS } from "./config/http.config";
import { asyncHandler } from "./middlewares/asyncHandler.middleware";
import { seedRoles } from "./seeders/role.seeder";


import "./config/passport.config";
import passport from "passport";
import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import isAuthenticated from "./middlewares/isAuthenticated.middleware";
import workspaceRoutes from "./routes/workspace.route";
import memberRoutes from "./routes/member.route";
import projectRoutes from "./routes/project.route";
import taskRoutes from "./routes/task.route";
import aiRoutes from "./routes/ai.route";
import contractRoutes from "./routes/contract.route";
import workspaceChatRoutes from "./routes/workspace-chat.route";

const app = express();
if (config.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}
const BASE_PATH = config.BASE_PATH;

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// CORS must be applied BEFORE session/passport so preflight OPTIONS requests succeed
const corsOrigins = config.FRONTEND_ORIGIN
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      
      // Allow if the origin exactly matches the FRONTEND_ORIGIN in .env
      if (corsOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      // Dynamically allow any Vercel deployment URL
      if (origin.endsWith(".vercel.app")) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
  })
);

app.use(
  session({
    name: "session",
    keys: [config.SESSION_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    secure: config.NODE_ENV === "production", // only true in production
    httpOnly: true,
    sameSite: config.NODE_ENV === "production" ? "none" : "lax", // <-- FIXED
  })
);


app.use(passport.initialize());
app.use(passport.session());

app.get(
  `/`,
  asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    return res.status(HTTPSTATUS.OK).json({
      message: "Taskflow API is running",
      author: "Yashraj Sherke",
    });
  })
);

app.use(`${BASE_PATH}/auth`, authRoutes);
app.use(`${BASE_PATH}/user`, isAuthenticated, userRoutes);
app.use(`${BASE_PATH}/workspace`, isAuthenticated, workspaceRoutes);
app.use(`${BASE_PATH}/member`, isAuthenticated, memberRoutes);
app.use(`${BASE_PATH}/project`, isAuthenticated, projectRoutes);
app.use(`${BASE_PATH}/task`, isAuthenticated, taskRoutes);
app.use(`${BASE_PATH}/ai`, isAuthenticated, aiRoutes);
app.use(`${BASE_PATH}/contract`, isAuthenticated, contractRoutes);
app.use(`${BASE_PATH}/workspace-chat`, isAuthenticated, workspaceChatRoutes);

app.use(errorHandler);

app.listen(config.PORT, async () => {
  console.log(`Server listening on port ${config.PORT} in ${config.NODE_ENV}`);
  await connectDatabase();
  // Auto-seed roles so OWNER/ADMIN/MEMBER roles always exist
  await seedRoles();
});
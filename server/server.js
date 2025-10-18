import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.js";
import dashboardRoutes from "./routes/dashboard.js";
import submissionsRoutes from "./routes/submissions.js";
import reviewsRoutes from "./routes/reviews.js";
import certificatesRoutes from "./routes/certificates.js";
import uploadRoutes from "./routes/upload.js";

import { requireAuth } from "./middleware/auth.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/dashboard", requireAuth, dashboardRoutes);
app.use("/submissions", requireAuth, submissionsRoutes);
app.use("/reviews", requireAuth, reviewsRoutes);
app.use("/certificates", requireAuth, certificatesRoutes);
app.use("/upload", requireAuth, uploadRoutes);

app.listen(5000, () => console.log("🚀 Node backend running on http://localhost:5000"));

export default app;

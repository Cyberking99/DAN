import express from "express";
import cors from "cors";
import multer from "multer";
import dotenv from "dotenv";
import { uploadToPinata } from "./config/pinata.js";
import { reviewPaper } from "./config/openai.js";
import { mintCertificate } from "./config/chain.js";

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

const upload = multer({ dest: "uploads/" });

let submissions = [];

// app.post("/upload", upload.single("file"), async (req, res) => {
//   try {
//     const { title, author, recipient_address } = req.body;
//     const filePath = req.file.path;

//     console.log(`[UPLOAD] Received: ${title} by ${author}`);

//     // 1️⃣ Upload file to Pinata
//     const cid = await uploadToPinata(filePath);
//     console.log(`[PINATA] CID: ${cid}`);

//     // 2️⃣ Review with OpenAI
//     const review = await reviewPaper(title, filePath);
//     console.log(`[OPENAI] Review:`, review);

//     // 3️⃣ Create report JSON → upload to Pinata
//     const reportData = { title, author, ipfs_cid: cid, review };
//     const fs = await import("fs");
//     const tempPath = `uploads/report-${Date.now()}.json`;
//     fs.writeFileSync(tempPath, JSON.stringify(reportData, null, 2));
//     const reportCid = await uploadToPinata(tempPath);
//     fs.unlinkSync(tempPath);

//     console.log(`[PINATA] Report CID: ${reportCid}`);

//     // 4️⃣ Mint NFT certificate
//     let txHash = null;
//     if (recipient_address) {
//       const receipt = await mintCertificate(recipient_address, `ipfs://${reportCid}`);
//       txHash = receipt.hash;
//       console.log(`[MINT] TX: ${txHash}`);
//     }

//     // 5️⃣ Save submission
//     const sub = {
//       id: Date.now(),
//       title,
//       author,
//       ipfs_cid: cid,
//       report_cid: reportCid,
//       review,
//       txHash,
//       status: txHash ? "Certificate Minted" : "Reviewed",
//     };
//     submissions.push(sub);

//     res.json({ message: "Processed", submission: sub });
//   } catch (err) {
//     console.error("[ERROR]", err);
//     res.status(500).json({ message: "Error", error: err.message });
//   }
// });

app.use("/auth", authRoutes);
app.use("/dashboard", requireAuth, dashboardRoutes);
app.use("/submissions", requireAuth, submissionsRoutes);
app.use("/reviews", requireAuth, reviewsRoutes);
app.use("/certificates", requireAuth, certificatesRoutes);
app.use("/upload", requireAuth, uploadRoutes);

app.listen(5000, () => console.log("🚀 Node backend running on http://localhost:5000"));

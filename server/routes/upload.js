import express from "express";
import multer from "multer";
import fs from "fs";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '../generated/prisma/index.js';
import { uploadToPinata } from "../config/pinata.js";
import { reviewPaper } from "../config/openai.js";
import { mintCertificate } from "../config/chain.js";

const prisma = new PrismaClient();
const router = express.Router();

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const { title, author, abstract } = req.body;
    const filePath = req.file.path;
    const userId = req.user.userId;
    const recipient_address = req.user.address;

    console.log(`[UPLOAD] Received: ${title} by ${author}`);

    // 1️⃣ Upload file to Pinata (PDF)
    const cid = await uploadToPinata(filePath);
    console.log(`[PINATA] Paper CID: ${cid}`);

    // 2️⃣ Create submission record
    const submission = await prisma.submission.create({
      data: {
        title,
        author,
        abstract: abstract || "N/A",
        ipfs_cid: cid,
        userId,
        status: "Under Review",
      },
    });

    // 3️⃣ Review with OpenAI
    const reviewData = await reviewPaper(title, filePath);
    console.log(`[OPENAI] Review:`, reviewData);

    // 4️⃣ Create review report JSON → upload to Pinata
    const reportData = { ...reviewData, title, author, ipfs_cid: cid };
    const tempPath = `uploads/report-${Date.now()}.json`;
    fs.writeFileSync(tempPath, JSON.stringify(reportData, null, 2));
    const reportCid = await uploadToPinata(tempPath);
    fs.unlinkSync(tempPath);

    // 5️⃣ Save review to DB
    const review = await prisma.review.create({
      data: {
        submissionId: submission.id,
        ai_agent: "GPT-4o",
        abstract: abstract || "N/A",
        score: reviewData.score,
        methodology: reviewData.methodology || null,
        novelty: reviewData.novelty || null,
        clarity: reviewData.clarity || null,
        reproducibility: reviewData.reproducibility || null,
        feedback: reviewData.feedback,
      },
    });

    // 6️⃣ Update submission status + score
    await prisma.submission.update({
      where: { id: submission.id },
      data: {
        status: "Completed",
        score: reviewData.score,
      },
    });

    // 7️⃣ Mint NFT certificate (optional)
    let txHash = null;
    let tokenUri = `ipfs://${reportCid}`;
    let certificate = null;

    if (recipient_address) {
      console.log(`[CHAIN] Minting certificate to ${recipient_address}...`);
      const receipt = await mintCertificate(recipient_address, tokenUri);
      txHash = receipt.hash;

      certificate = await prisma.certificate.create({
        data: {
          submissionId: submission.id,
          txHash,
          tokenUri,
          userId,
        },
      });

      await prisma.submission.update({
        where: { id: submission.id },
        data: { status: "Certified" },
      });
    }

    res.json({
      message: "Processed",
      submission: {
        ...submission,
        review,
        certificate,
        reportCid,
      },
    });
  } catch (err) {
    console.error("[UPLOAD ERROR]", err);
    res.status(500).json({ message: "Error", error: err.message });
  }
});

export default router;
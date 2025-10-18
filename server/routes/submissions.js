import express from "express";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '../generated/prisma/index.js';
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  
  const userId = req.user.userId;
  
  try {
    const submissions = await prisma.submission.findMany({
      where: { userId },
      orderBy: { dateSubmitted: "desc" },
    });
    res.json(submissions);
  } catch (err) {
    console.error("[SUBMISSIONS ERROR]", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

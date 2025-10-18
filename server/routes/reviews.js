import express from "express";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '../generated/prisma/index.js';
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  
  const userId = req.user.userId;
  
  try {
    const reviews = await prisma.review.findMany({
      where: { submission: { userId } },
      include: { submission: { select: { title: true } } },
      orderBy: { dateReviewed: "desc" },
    });

    // Statistics
    const avgScore = await prisma.review.aggregate({
      _avg: { score: true },
      where: { submission: { userId } },
    });

    const total = reviews.length;
    const highQuality = reviews.filter(r => r.score >= 8).length;

    res.json({
      stats: {
        averageScore: avgScore._avg.score || 0,
        reviewsCompleted: total,
        highQuality
      },
      reviews
    });
  } catch (err) {
    console.error("[REVIEWS ERROR]", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

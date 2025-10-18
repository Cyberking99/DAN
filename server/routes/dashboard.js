import express from "express";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '../generated/prisma/index.js';
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  try {
    
    const userId = req.user.userId;

    // Counts
    const totalSubmissions = await prisma.submission.count({ where: { userId } });
    const underReview = await prisma.submission.count({ where: { userId, status: "Under Review" } });
    const completed = await prisma.submission.count({ where: { userId, status: "Completed" } });
    const certificates = await prisma.certificate.count({ where: { userId } });

    // Recent Submissions
    const recentSubs = await prisma.submission.findMany({
      where: { userId },
      orderBy: { dateSubmitted: "desc" },
      take: 5,
      select: { title: true, status: true, score: true, dateSubmitted: true }
    });

    // Recent Reviews
    const recentReviews = await prisma.review.findMany({
      where: { submission: { userId } },
      orderBy: { dateReviewed: "desc" },
      take: 5,
      select: { title: false, submission: { select: { title: true } }, abstract: true, score: true }
    });

    res.json({
      stats: { totalSubmissions, underReview, completed, certificates },
      recentSubmissions: recentSubs,
      recentReviews
    });
  } catch (err) {
    console.error("[DASHBOARD ERROR]", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

import express from "express";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '../generated/prisma/index.js';
const router = express.Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
  const userId = req.user.userId;
  try {
    const certs = await prisma.certificate.findMany({
      where: { userId },
      include: { submission: { select: { title: true } } },
      orderBy: { dateMinted: "desc" },
    });
    res.json(certs);
  } catch (err) {
    console.error("[CERTIFICATES ERROR]", err);
    res.status(500).json({ error: err.message });
  }
});

export default router;

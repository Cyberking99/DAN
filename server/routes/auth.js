import express from "express";
import { ethers } from "ethers";
import jwt from "jsonwebtoken";
// import { PrismaClient } from "@prisma/client";
import { PrismaClient } from '../generated/prisma/index.js';

const router = express.Router();
const prisma = new PrismaClient();

router.get("/nonce/:address", async (req, res) => {
  const { address } = req.params;
  const lower = address.toLowerCase();
  const nonceValue = Math.floor(Math.random() * 1000000).toString();

  try {
    const nonce = await prisma.nonce.upsert({
      where: { address: lower },
      update: { value: nonceValue, createdAt: new Date() },
      create: { address: lower, value: nonceValue },
    });
    res.json({ nonce: nonce.value });
  } catch (err) {
    console.error("[NONCE ERROR]", err);
    res.status(500).json({ error: "Failed to generate nonce" });
  }
});

router.post("/verify", async (req, res) => {
  const { address, signature } = req.body;
  const lower = address.toLowerCase();

  try {
    const nonce = await prisma.nonce.findUnique({ where: { address: lower } });
    if (!nonce) return res.status(400).json({ error: "Nonce not found" });

    const recovered = ethers.verifyMessage(`Login nonce: ${nonce.value}`, signature);
    if (recovered.toLowerCase() !== lower) {
      return res.status(401).json({ error: "Invalid signature" });
    }

    await prisma.nonce.delete({ where: { address: lower } });

    let user = await prisma.user.findUnique({ where: { address: lower } });
    if (!user) user = await prisma.user.create({ data: { address: lower } });

    const token = jwt.sign(
      { userId: user.id, address: user.address },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({ token, user });
  } catch (err) {
    console.error("[VERIFY ERROR]", err);
    res.status(500).json({ error: "Verification failed" });
  }
});

export default router;

import { ethers } from "ethers";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

export async function mintCertificate(to, uri) {
  try {
    console.log("[CHAIN] Connecting to provider...");
    const provider = new ethers.JsonRpcProvider(process.env.WEB3_PROVIDER);
    const wallet = new ethers.Wallet(process.env.DEPLOYER_PRIVATE_KEY, provider);

    console.log(`[CHAIN] Loading contract from ${process.env.CONTRACT_ADDRESS}`);
    const contractJSON = JSON.parse(fs.readFileSync(process.env.CONTRACT_ABI_PATH));
    const contractABI = fs.readFileSync(process.env.CONTRACT_ABI_PATH);
    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS, contractABI, wallet);

    console.log(`[CHAIN] Minting certificate for ${to} with URI ${uri}`);
    const tx = await contract.mintCertificate(to, uri);

    console.log(`[CHAIN] TX sent: ${tx.hash}, waiting for confirmation...`);

    const receipt = await Promise.race([
      tx.wait(1),
      new Promise((_, reject) =>
        setTimeout(() => reject(new Error("Mint transaction timed out (no confirmation)")), 15000)
      ),
    ]);

    console.log("[CHAIN] Mint confirmed:", receipt.transactionHash);
    return receipt;
  } catch (err) {
    console.error("[CHAIN ERROR]", err);
    throw err;
  }
}

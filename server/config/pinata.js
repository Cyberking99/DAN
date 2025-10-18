import axios from "axios";
import fs from "fs";
import dotenv from "dotenv";
import FormData from "form-data";
dotenv.config();

const PINATA_URL = process.env.PINATA_URL || "https://api.pinata.cloud/pinning/pinFileToIPFS";

export async function uploadToPinata(filePath) {
  const form = new FormData();
  form.append("file", fs.createReadStream(filePath));

  const res = await axios.post(PINATA_URL, form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${process.env.PINATA_JWT}`,
    },
    maxBodyLength: Infinity,
  });
  
  return res.data.IpfsHash;
}

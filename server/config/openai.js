import OpenAI from "openai";
import { PDFParse } from "pdf-parse";
import fs from "fs";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function reviewPaper(title, filePath) {
  const pdfBuffer = fs.readFileSync(filePath);
  const parser = new PDFParse({ data: pdfBuffer });
  const data = await parser.getText();
  const text = data.text.slice(0, 3000);
  await parser.destroy();

  console.log("[OPENAI] Extracted text length:", text.length);

  const system = `
    You are an academic paper reviewer. Analyze the provided text and respond ONLY in JSON format with the following structure:

    {
    "summary": "1-3 sentence concise overview of the paper",
    "overall_score": number (0-10),
    "methodology": number (0-10),
    "novelty": number (0-10),
    "clarity": number (0-10),
    "reproducibility": number (0-10),
    "feedback": {
        "strengths": "short list of strong points",
        "weaknesses": "short list of issues or missing aspects",
        "recommendations": ["actionable suggestion 1", "actionable suggestion 2", ...]
    }
    }

    Keep your JSON valid and do not include any other text or commentary.
    `;

  const user = `Paper Title: ${title}\n\nExcerpt:\n${text}`;

  const resp = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    max_tokens: 1024,
  });
  const content = resp.choices[0].message.content;
  console.log("[OPENAI] Raw Response:", content);

  let review;
  try {
    review = JSON.parse(content);
  } catch (e) {
    console.error("[OPENAI] JSON Parse Error:", e);
    const match = content.match(/\{[\s\S]*\}/);
    review = match ? JSON.parse(match[0]) : {};
  }

  return {
    score: review.overall_score || review.score || 0,
    methodology: review.methodology || 0,
    novelty: review.novelty || 0,
    clarity: review.clarity || 0,
    reproducibility: review.reproducibility || 0,
    summary: review.summary || "",
    feedback: review.feedback || {},
  };

//   try {
//     return JSON.parse(content);
//   } catch (e) {
//     return { score: 0, summary: "Invalid JSON response", feedback: "Failed to parse JSON from OpenAI." };
//   }
}

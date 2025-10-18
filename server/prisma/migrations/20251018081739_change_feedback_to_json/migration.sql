/*
  Warnings:

  - You are about to alter the column `feedback` on the `Review` table. The data in that column could be lost. The data in that column will be cast from `String` to `Json`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "ai_agent" TEXT NOT NULL DEFAULT 'GPT-4o',
    "abstract" TEXT,
    "score" REAL NOT NULL,
    "methodology" REAL,
    "novelty" REAL,
    "clarity" REAL,
    "reproducibility" REAL,
    "feedback" JSONB,
    "dateReviewed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Review" ("abstract", "ai_agent", "clarity", "dateReviewed", "feedback", "id", "methodology", "novelty", "reproducibility", "score", "submissionId") SELECT "abstract", "ai_agent", "clarity", "dateReviewed", "feedback", "id", "methodology", "novelty", "reproducibility", "score", "submissionId" FROM "Review";
DROP TABLE "Review";
ALTER TABLE "new_Review" RENAME TO "Review";
CREATE UNIQUE INDEX "Review_submissionId_key" ON "Review"("submissionId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

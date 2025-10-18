-- CreateTable
CREATE TABLE "Submission" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "abstract" TEXT,
    "ipfs_cid" TEXT NOT NULL,
    "score" REAL,
    "status" TEXT NOT NULL DEFAULT 'Under Review',
    "dateSubmitted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Review" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "ai_agent" TEXT NOT NULL DEFAULT 'GPT-4o',
    "abstract" TEXT,
    "score" REAL NOT NULL,
    "methodology" REAL,
    "novelty" REAL,
    "clarity" REAL,
    "reproducibility" REAL,
    "feedback" TEXT,
    "dateReviewed" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Review_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Certificate" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "submissionId" TEXT NOT NULL,
    "txHash" TEXT NOT NULL,
    "tokenUri" TEXT NOT NULL,
    "dateMinted" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Certificate_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "Submission" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Review_submissionId_key" ON "Review"("submissionId");

-- CreateIndex
CREATE UNIQUE INDEX "Certificate_submissionId_key" ON "Certificate"("submissionId");

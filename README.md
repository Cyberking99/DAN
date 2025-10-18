# 🧬 DeSci Agent Network (DAN)

A decentralized science review and certification platform powered by AI and blockchain.

The **DeSci Agent Network (DAN)** enables researchers to upload papers, get impartial AI-generated reviews, and mint on-chain certificates of authenticity and review completion.

---

## 🚀 Features

- **Wallet Authentication:** Users log in by connecting their wallet (no passwords).
- **IPFS Integration (via Pinata):** Papers and review reports are uploaded to IPFS.
- **AI Paper Review (GPT-4o):** Automatically analyzes submissions for clarity, methodology, novelty, and reproducibility.
- **On-Chain Certification:** After a successful review, a certificate NFT is minted on the local Hardhat blockchain.
- **Prisma + PostgreSQL Backend:** Robust database for submissions, reviews, and certificates.
- **Dashboard Analytics:**
  - Total submissions, under review, completed, certificates
  - Recent submissions and reviews with scores
  - Average review statistics and quality insights

---

## 🧱 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | Next.js |
| **Backend** | Node.js + Express |
| **Database** | Prisma ORM + PostgreSQL |
| **AI Review** | OpenAI GPT-4o |
| **Storage** | IPFS via Pinata |
| **Blockchain** | Hardhat (local Ethereum node) |
| **Deployment** | Vercel (frontend) & Render (backend) |

---

## ⚙️ Prerequisites

Make sure you have the following installed:

- **Node.js** v20 or later
- **npm**
- **Hardhat** (for local blockchain)
- **Hosted PostgreSQL** (Neon)
- **Pinata API Keys**
- **OpenAI API Key**

---

## 🧩 Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/desci_network?schema=public"
PINATA_API_KEY=your_pinata_api_key
PINATA_SECRET_API_KEY=your_pinata_secret
OPENAI_API_KEY=your_openai_api_key
WEB3_PROVIDER=http://127.0.0.1:8545
DEPLOYER_PRIVATE_KEY=0x...
CONTRACT_ADDRESS=0x...
JWT_SECRET=super_secret_jwt_key
````

---

## 🧠 Installation & Development

```bash
# Clone the repo
git clone https://github.com/Cyberking99/DAN.git
cd DAN

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Migrate database
npx prisma migrate dev --name init

# Run local blockchain (in a separate terminal)
npx hardhat node

# Start the backend server
npm run dev
```

Server runs on **[http://localhost:5000](http://localhost:5000)**

---

## 📦 Project Structure

```
server/
│
├── config/
│   ├── pinata.js          # IPFS upload helpers
│   ├── openai.js          # GPT-4o review generation
│   ├── chain.js           # Certificate minting logic
│
├── routes/
│   ├── auth.js            # Wallet authentication (nonce/signature)
│   ├── upload.js          # Submission upload & review
│   ├── dashboard.js       # Stats & analytics endpoints
│   ├── reviews.js         # Review listing and details
│
├── prisma/
│   └── schema.prisma      # Database schema
│
├── uploads/               # Temporary file storage
│
└── server.js              # Main Express entry point
```

---

## 🔗 Key Endpoints

### **Authentication**

* `POST /auth/nonce` — Get nonce for wallet signature
* `POST /auth/verify` — Verify wallet signature and issue token

### **Submissions**

* `POST /upload` — Upload a paper → store on IPFS → review via GPT-4o → mint certificate
* `GET /submissions` — Fetch all user submissions

### **Dashboard**

* `GET /dashboard` — Retrieve stats, recent submissions, and recent reviews

### **Reviews**

* `GET /reviews` — List all reviews and their scores

---

## 🧠 AI Review Flow

1. User uploads paper → backend saves file.
2. File uploaded to IPFS via Pinata.
3. Text extracted from PDF (first 10 pages).
4. OpenAI GPT-4o reviews the text and returns structured JSON:

   ```json
   {
     "score": 8.2,
     "methodology": 7,
     "novelty": 8,
     "clarity": 9,
     "reproducibility": 7,
     "feedback": { "strengths": "...", "improvements": "..." }
   }
   ```
5. Review saved to database and uploaded to IPFS as JSON.
6. Smart contract mints NFT certificate with IPFS URI of report.

---

## 🪙 On-Chain Certificate

* Deployed on local **Hardhat node**
* Minted automatically after AI review
* Metadata (title, author, review score) stored on IPFS

---

## 📊 Dashboard Summary

**User Dashboard shows:**

* Total submissions by user
* Total under review
* Total completed
* Total certificates
* Recent submissions and review summaries

---

## 🧪 Commands Reference

| Command                     | Description                    |
| --------------------------- | ------------------------------ |
| `npx prisma generate`       | Generates Prisma client (safe) |
| `npx prisma migrate dev`    | Apply migrations locally       |
| `npx prisma migrate deploy` | Apply migrations in production |
| `npx prisma studio`         | Open database UI               |
| `npm run dev`               | Start server (development)     |
| `npx hardhat node`          | Run local blockchain node      |

---

## 🧑‍💻 Contributors

* **Kingsley Kefas (KC)**
* **Jethro Lopwus**
* **Simon Itodo** 
---

## 🧾 License

This project is licensed under the **MIT License**.

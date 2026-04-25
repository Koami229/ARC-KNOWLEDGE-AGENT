<div align="center">

# ARC Knowledge Agent  
### Pay-per-Knowledge AI Agent powered by Circle Nanopayments on Arc

An AI-powered autonomous agent that pays premium APIs in real time using **USDC nanopayments** on **Arc**, enabling a new **pay-per-query knowledge economy**.

Demo Prototype for the Circle + Arc Hackathon.

</div>

---

## Problem

Today AI agents consume premium APIs (weather, finance, news, research) through centralized subscriptions.

That model breaks down for autonomous agents making thousands of tiny requests.

**Problem:**
- APIs force monthly subscriptions
- Micropayments are too expensive on traditional rails
- Agents cannot pay dynamically per query

---

## Solution

ARC Knowledge Agent introduces **Pay-per-Knowledge**:

For every user question:

1. AI agent selects the best premium data provider  
2. Agent executes a **USDC nanopayment** through Arc  
3. Data provider gets paid instantly  
4. User receives premium data response  
5. Transaction is recorded in a live on-chain dashboard

This enables machine-to-machine economic coordination.

---

## Circle Products Used

✅ Circle Wallets (simulated transaction settlement)  
✅ USDC for micropayments  
✅ Arc for low-cost settlement  
✅ Circle Nanopayments concept  
✅ Circle Programmable Payments logic (simulated)

---

## Core Use Case

Example flow:

User asks:

```text
What is the USD/EUR exchange rate?
```

Agent flow:

```text
User Query
→ Gemini decides ExchangeRate API
→ 0.0018 USDC paid to API provider
→ Premium data retrieved
→ 0.0035 USDC user fee settled
→ Response returned
```

Two machine transactions occur for one query.

---

## Features

- AI routing layer using Gemini
- Dynamic API selection
- Simulated USDC nanopayments
- Transaction ledger explorer
- Real-time settlement dashboard
- Batch demo generator
- Arc-cost efficiency comparison

---

## Tech Stack

Frontend
- React 19
- Vite
- TypeScript
- TailwindCSS
- Motion
- Lucide Icons

Backend
- Express
- Node.js
- Gemini 1.5 Flash
- UUID Transaction Simulator

Infrastructure
- Arc
- USDC
- Circle Payment Simulation

---

## Architecture

```text
User
 ↓
Gemini Decision Engine
 ↓
Premium Data API Selection
 ↓
Circle/Arc Nanopayment
 ↓
External Data Fetch
 ↓
Response Returned
 ↓
Transaction Recorded in Dashboard
```

---

## Project Structure

```bash
src/
 ├── components/
 │   ├── Header.tsx
 │   ├── Footer.tsx
 │   └── TransactionTable.tsx
 │
 ├── pages/
 │   ├── Home.tsx
 │   └── Dashboard.tsx
 │
 └── App.tsx

server/
 ├── routes/
 │   ├── ask.ts
 │   └── transactions.ts
 │
 ├── services/
 │   ├── geminiService.ts
 │   ├── dataApi.ts
 │   └── circleSimulator.ts
 │
 └── transactions.json
```

---

## Running Locally

### Prerequisites

- Node.js 20+
- Gemini API Key

Create:

```bash
.env.local
```

Add:

```env
GEMINI_API_KEY=your_key_here
```

Install dependencies:

```bash
npm install
```

Run:

```bash
npm run dev
```

App:

```bash
http://localhost:3000
```

---

## Demo Routes

### Ask Agent

```http
POST /api/ask
```

Example body:

```json
{
 "question":"Quel temps fait-il à Paris ?"
}
```

---

### Generate Demo Transactions

```http
POST /api/generate-demo
```

Creates batch micropayment activity.

---

### Transaction Explorer

```http
GET /api/transactions
```

---

## Why Arc

Traditional L1 payment:

```text
~$0.50 transaction cost
```

Arc Nanopayment:

```text
~$0.0046
```

Over 100x lower friction.

This makes autonomous API economies viable.

---

## Future Extensions

- Real Circle Wallet integration  
- Live USDC settlement on Arc  
- Agent-to-agent commerce  
- Pay-per-model inference markets  
- Premium data marketplace for autonomous agents

---

## Hackathon Thesis

We believe future AI agents will not subscribe.

They will pay each other.

This project demonstrates the payment primitive for that economy.

---

## License

MIT

import fs from 'fs';
import path from 'path';
import { v4 as uuidv4 } from 'uuid';

const TRANSACTIONS_FILE = path.join(process.cwd(), 'server', 'transactions.json');

// Ensure directory exists
const dir = path.dirname(TRANSACTIONS_FILE);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

if (!fs.existsSync(TRANSACTIONS_FILE)) {
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify([], null, 2));
}

export interface Transaction {
  txHash: string;
  action: string;
  api: string;
  amountUSDC: number;
  costTX: number;
  timestamp: string;
}

export function readTransactions(): Transaction[] {
  try {
    const data = fs.readFileSync(TRANSACTIONS_FILE, 'utf8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function saveTransaction(tx: Transaction) {
  const txs = readTransactions();
  txs.push(tx);
  fs.writeFileSync(TRANSACTIONS_FILE, JSON.stringify(txs, null, 2));
}

export async function sendPayment(amountUSDC: number, apiName: string, action: string): Promise<Transaction> {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 200 + Math.random() * 300));

  const txHash = `0x${uuidv4().replace(/-/g, '')}`;
  const timestamp = new Date().toISOString();

  const transaction: Transaction = {
    txHash,
    action,
    api: apiName,
    amountUSDC: parseFloat(amountUSDC.toFixed(4)),
    costTX: 0.0046, // Average observed cost on Arc
    timestamp,
  };

  saveTransaction(transaction);
  console.log(`[SIMULATOR] Payment ${amountUSDC} USDC -> ${apiName} (${action}) [${txHash}]`);

  return transaction;
}

export function getAllTransactions(): Transaction[] {
  return readTransactions();
}

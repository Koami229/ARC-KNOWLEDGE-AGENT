import express from 'express';
import { getAllTransactions } from '../services/circleSimulator.ts';

const router = express.Router();

router.get('/transactions', (req, res) => {
  const txs = getAllTransactions();
  
  const totalAmount = txs.reduce((sum, tx) => sum + tx.amountUSDC, 0);
  const avgCost = txs.length ? totalAmount / txs.length : 0;
  
  res.json({
    count: txs.length,
    totalAmount: parseFloat(totalAmount.toFixed(4)),
    avgCost: parseFloat(avgCost.toFixed(4)),
    transactions: [...txs].reverse(), // Most recent first
  });
});

export default router;

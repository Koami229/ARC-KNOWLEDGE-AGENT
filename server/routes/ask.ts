import express from 'express';
import { decideAPI } from '../services/geminiService';
import { fetchPremiumData, getAPICost } from '../services/dataApi';
import { sendPayment } from '../services/circleSimulator';

const router = express.Router();

router.post('/ask', async (req, res) => {
  try {
    const { question } = req.body;
    if (!question || question.trim() === '') {
      return res.status(400).json({ error: 'Question requise' });
    }

    // 1. AI agent decides which API to use
    const decision = await decideAPI(question);
    const api = decision.api;
    const params = decision.params;

    // 2. API call cost
    const apiCost = getAPICost(api);

    // 3. Nanopayment to API provider (simulated)
    const paymentTx = await sendPayment(apiCost, api, `Access ${api} for "${question}"`);

    // 4. Fetch data
    const premiumData = await fetchPremiumData(api, params);

    // 5. Agent charges user (simulated user -> platform)
    const userCost = 0.0035; // Small margin for the platform
    const userPaymentTx = await sendPayment(userCost, 'Platform', `User fee for "${question}"`);

    // 6. Final response
    res.json({
      answer: premiumData.data,
      apiUsed: api,
      apiCost,
      userCost,
      paymentTx: paymentTx.txHash,
      userPaymentTx: userPaymentTx.txHash,
      transactionCount: 2,
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({ error: error.message || 'Internal error' });
  }
});

export default router;

#!/usr/bin/env node
/**
 * Ballpark monthly cost (USD) — edit assumptions below. Not financial advice.
 *
 *   node scripts/estimate-cost.mjs
 */

const assumptions = {
  renderWebServiceUsd: 7, // e.g. starter-ish; check render.com pricing
  vercelProUsd: 20, // 0 if hobby
  mongoAtlasUsd: 9, // M0 free → 0
  cloudinaryUsd: 0, // free tier
};

const total = Object.values(assumptions).reduce((a, b) => a + b, 0);
console.log(JSON.stringify({ assumptions, totalUsdPerMonth: total }, null, 2));
console.log(
  "\nAt scale, cost grows with: DB storage/IOPS, egress, Socket.IO instances (horizontal scaling), Cloudinary bandwidth.",
);

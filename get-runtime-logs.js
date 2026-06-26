const { execSync } = require('child_process');
require('dotenv').config();
const token = process.env.VERCEL_ACCESS_TOKEN;
const dpl = "CreGYcnJinphtCLYCjhy3bqnCkYT";

async function run() {
  console.log("Fetching logs...");
  const res = await fetch(`https://api.vercel.com/v2/now/deployments/${dpl}/events?direction=backward&limit=50`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  if (Array.isArray(data)) {
    console.log(data.filter(e => e.type !== 'build').map(e => e.payload?.text || e.text).join('\n'));
  } else {
    console.log(JSON.stringify(data, null, 2));
  }
}
run();

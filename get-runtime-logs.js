const { execSync } = require('child_process');
require('dotenv').config();
const token = process.env.VERCEL_ACCESS_TOKEN;
const dpl = process.env.VERCEL_DEPLOYMENT_ID;

async function run() {
  console.log("Triggering request...");
  execSync('curl -s -I https://issues-swipe-eta.vercel.app/swipe > /dev/null');
  
  await new Promise(r => setTimeout(r, 2000));
  console.log("Fetching logs...");
  const res = await fetch(`https://api.vercel.com/v2/now/deployments/${dpl}/events?direction=backward&limit=10`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  console.log(JSON.stringify(data.filter(e => e.type !== 'build'), null, 2));
}
run();

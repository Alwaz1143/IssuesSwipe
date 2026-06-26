require('dotenv').config();
const token = process.env.VERCEL_ACCESS_TOKEN;
const dpl = process.env.VERCEL_DEPLOYMENT_ID;
async function run() {
  const res = await fetch(`https://api.vercel.com/v2/now/deployments/${dpl}/events?direction=backward&limit=1000`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  const data = await res.json();
  const errors = data.filter(e => e.type === 'stderr');
  console.log(JSON.stringify(errors, null, 2));
}
run();

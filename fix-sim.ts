import dotenv from 'dotenv';
dotenv.config();
import { db } from './src/lib/db';

async function main() {
  const count = await db.issue.deleteMany({
    where: {
      githubId: {
        startsWith: 'sim-issue'
      }
    }
  });
  console.log(`Deleted ${count.count} simulated issues.`);
  
  const repos = await db.repository.deleteMany({
    where: {
      githubId: {
        startsWith: 'sim-'
      }
    }
  });
  console.log(`Deleted ${repos.count} simulated repos.`);
}
main();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const deletedIssues = await prisma.issue.deleteMany({
    where: {
      githubId: {
        startsWith: 'sim-issue'
      }
    }
  });
  console.log(`Deleted ${deletedIssues.count} simulated issues.`);
}
main().catch(console.error).finally(() => prisma.$disconnect());

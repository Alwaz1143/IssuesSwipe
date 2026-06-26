const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
async function main() {
  const issues = await prisma.issue.findMany({ take: 5, orderBy: { createdAt: 'desc' } });
  for (const issue of issues) {
    console.log(issue.url);
  }
}
main().catch(console.error).finally(() => prisma.$disconnect());

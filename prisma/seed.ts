import "dotenv/config";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const companies = [
  {
    name: "Google",
    slug: "google",
    description:
      "Global technology company known for search, cloud and AI products.",
    website: "https://google.com",
  },
  {
    name: "Microsoft",
    slug: "microsoft",
    description:
      "Technology company focused on cloud computing, software and AI.",
    website: "https://microsoft.com",
  },
  {
    name: "Amazon",
    slug: "amazon",
    description:
      "Global technology and e-commerce company.",
    website: "https://amazon.com",
  },
  {
    name: "Meta",
    slug: "meta",
    description:
      "Technology company building social platforms and AI products.",
    website: "https://meta.com",
  },
  {
    name: "Adobe",
    slug: "adobe",
    description:
      "Software company focused on creativity and digital experience.",
    website: "https://adobe.com",
  },
  {
    name: "Atlassian",
    slug: "atlassian",
    description:
      "Enterprise software company known for Jira and Confluence.",
    website: "https://atlassian.com",
  },
];

const compensationData = [
  ["Google", "Software Engineer", "L3", "Bangalore", 1800000, 250000, 400000],
  ["Google", "Software Engineer", "L4", "Bangalore", 2800000, 400000, 700000],
  ["Google", "Software Engineer", "L5", "Bangalore", 4200000, 600000, 1200000],
  ["Google", "Software Engineer", "L4", "Hyderabad", 2600000, 400000, 650000],

  ["Microsoft", "Software Engineer", "SDE 1", "Hyderabad", 1800000, 200000, 350000],
  ["Microsoft", "Software Engineer", "SDE 2", "Hyderabad", 2600000, 350000, 700000],
  ["Microsoft", "Software Engineer", "SDE 2", "Bangalore", 2700000, 350000, 750000],
  ["Microsoft", "Senior Software Engineer", "SDE 3", "Bangalore", 3800000, 500000, 1100000],

  ["Amazon", "Software Development Engineer", "L4", "Bangalore", 1700000, 250000, 500000],
  ["Amazon", "Software Development Engineer", "L5", "Bangalore", 2500000, 350000, 850000],
  ["Amazon", "Software Development Engineer", "L6", "Bangalore", 3600000, 500000, 1400000],
  ["Amazon", "Software Development Engineer", "L5", "Hyderabad", 2400000, 350000, 800000],

  ["Meta", "Software Engineer", "E3", "Bangalore", 3000000, 500000, 1000000],
  ["Meta", "Software Engineer", "E4", "Bangalore", 4500000, 700000, 1800000],
  ["Meta", "Software Engineer", "E5", "Bangalore", 6500000, 1000000, 2800000],

  ["Adobe", "Software Engineer", "L2", "Noida", 1600000, 200000, 300000],
  ["Adobe", "Software Engineer", "L3", "Noida", 2300000, 300000, 500000],
  ["Adobe", "Senior Software Engineer", "L4", "Bangalore", 3400000, 450000, 900000],

  ["Atlassian", "Software Engineer", "P30", "Bangalore", 2800000, 400000, 800000],
  ["Atlassian", "Senior Software Engineer", "P40", "Bangalore", 4200000, 600000, 1500000],
];

function normalizeCompanyName(name: string) {
  return name.trim().toLowerCase();
}

function createFingerprint(
  company: string,
  role: string,
  level: string,
  location: string,
  baseSalary: number,
  bonus: number,
  stock: number
) {
  return [
    normalizeCompanyName(company),
    role.trim().toLowerCase(),
    level.trim().toLowerCase(),
    location.trim().toLowerCase(),
    baseSalary,
    bonus,
    stock,
  ].join("|");
}

async function main() {
  console.log("🌱 Seeding database...");

  for (const company of companies) {
    await prisma.company.upsert({
      where: {
        slug: company.slug,
      },
      update: company,
      create: company,
    });
  }

  for (const row of compensationData) {
    const [
      companyName,
      role,
      level,
      location,
      baseSalary,
      bonus,
      stock,
    ] = row as [
      string,
      string,
      string,
      string,
      number,
      number,
      number
    ];

    const company = await prisma.company.findUnique({
      where: {
        slug: companyName.toLowerCase(),
      },
    });

    if (!company) continue;

    const totalComp = baseSalary + bonus + stock;

    const fingerprint = createFingerprint(
      companyName,
      role,
      level,
      location,
      baseSalary,
      bonus,
      stock
    );

    await prisma.compensation.upsert({
      where: {
        fingerprint,
      },
      update: {
        baseSalary,
        bonus,
        stock,
        totalComp,
      },
      create: {
        companyId: company.id,
        role,
        level,
        location,
        baseSalary,
        bonus,
        stock,
        totalComp,
        source: "Demo dataset",
        fingerprint,
      },
    });
  }

  console.log("✅ Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
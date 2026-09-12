import "dotenv/config";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type Profile = {
  company: string;
  levels: string[];
  role: string;
  base: number[];
  bonus: number[];
  stock: number[];
};

const profiles: Profile[] = [
  // =========================
  // INDIAN IT SERVICES
  // =========================

  {
    company: "TCS",
    role: "Software Engineer",
    levels: [
      "Assistant Systems Engineer",
      "Systems Engineer",
      "Digital",
      "Prime",
    ],
    base: [300000, 420000, 650000, 900000],
    bonus: [40000, 50000, 80000, 100000],
    stock: [0, 0, 50000, 100000],
  },

  {
    company: "Infosys",
    role: "Software Engineer",
    levels: [
      "Systems Engineer",
      "Specialist Programmer",
      "Digital Specialist Engineer",
      "Technology Analyst",
    ],
    base: [350000, 650000, 850000, 1200000],
    bonus: [30000, 60000, 80000, 120000],
    stock: [0, 0, 50000, 100000],
  },

  {
    company: "Wipro",
    role: "Software Engineer",
    levels: [
      "Project Engineer",
      "Elite",
      "Turbo",
      "Senior Software Engineer",
    ],
    base: [350000, 550000, 800000, 1100000],
    bonus: [30000, 50000, 80000, 120000],
    stock: [0, 0, 30000, 80000],
  },

  {
    company: "HCLTech",
    role: "Software Engineer",
    levels: [
      "Graduate Engineer Trainee",
      "Software Engineer",
      "Senior Software Engineer",
      "Technical Lead",
    ],
    base: [400000, 600000, 950000, 1400000],
    bonus: [30000, 50000, 80000, 120000],
    stock: [0, 0, 30000, 70000],
  },

  {
    company: "Accenture",
    role: "Software Engineer",
    levels: [
      "Associate Software Engineer",
      "Application Development Associate",
      "Analyst",
      "Senior Analyst",
    ],
    base: [450000, 600000, 850000, 1200000],
    bonus: [40000, 60000, 80000, 120000],
    stock: [0, 0, 30000, 60000],
  },

  {
    company: "Cognizant",
    role: "Software Engineer",
    levels: [
      "Programmer Analyst Trainee",
      "Programmer Analyst",
      "Associate",
      "Senior Associate",
    ],
    base: [350000, 500000, 750000, 1050000],
    bonus: [30000, 40000, 70000, 100000],
    stock: [0, 0, 20000, 50000],
  },

  {
    company: "Capgemini",
    role: "Software Engineer",
    levels: [
      "Analyst",
      "Senior Analyst",
      "Consultant",
      "Senior Consultant",
    ],
    base: [400000, 600000, 900000, 1250000],
    bonus: [30000, 50000, 80000, 120000],
    stock: [0, 0, 30000, 60000],
  },

  {
    company: "Tech Mahindra",
    role: "Software Engineer",
    levels: [
      "Associate Software Engineer",
      "Software Engineer",
      "Senior Software Engineer",
      "Technical Lead",
    ],
    base: [350000, 550000, 850000, 1200000],
    bonus: [30000, 50000, 70000, 100000],
    stock: [0, 0, 20000, 50000],
  },

  {
    company: "LTIMindtree",
    role: "Software Engineer",
    levels: [
      "Graduate Engineer Trainee",
      "Software Engineer",
      "Senior Software Engineer",
      "Technical Lead",
    ],
    base: [400000, 600000, 900000, 1250000],
    bonus: [30000, 50000, 80000, 110000],
    stock: [0, 0, 30000, 60000],
  },

  // =========================
  // CONSULTING
  // =========================

  {
    company: "Deloitte",
    role: "Technology Consultant",
    levels: [
      "Analyst",
      "Consultant",
      "Senior Consultant",
      "Manager",
    ],
    base: [550000, 800000, 1200000, 1800000],
    bonus: [50000, 80000, 120000, 200000],
    stock: [0, 0, 50000, 100000],
  },

  {
    company: "EY",
    role: "Technology Consultant",
    levels: [
      "Associate",
      "Consultant",
      "Senior Consultant",
      "Manager",
    ],
    base: [500000, 750000, 1150000, 1700000],
    bonus: [40000, 70000, 120000, 180000],
    stock: [0, 0, 40000, 80000],
  },

  {
    company: "KPMG",
    role: "Technology Consultant",
    levels: [
      "Analyst",
      "Consultant",
      "Senior Consultant",
      "Manager",
    ],
    base: [500000, 750000, 1100000, 1650000],
    bonus: [40000, 70000, 110000, 180000],
    stock: [0, 0, 40000, 80000],
  },

  {
    company: "PwC",
    role: "Technology Consultant",
    levels: [
      "Associate",
      "Senior Associate",
      "Manager",
      "Senior Manager",
    ],
    base: [500000, 750000, 1200000, 1800000],
    bonus: [40000, 70000, 120000, 200000],
    stock: [0, 0, 40000, 80000],
  },

  // =========================
  // PRODUCT / BIG TECH
  // =========================

  {
    company: "Google",
    role: "Software Engineer",
    levels: ["L3", "L4", "L5", "L6"],
    base: [1800000, 2800000, 4200000, 5500000],
    bonus: [200000, 400000, 600000, 800000],
    stock: [450000, 700000, 1200000, 1800000],
  },

  {
    company: "Microsoft",
    role: "Software Engineer",
    levels: ["SDE 1", "SDE 2", "SDE 3", "Principal"],
    base: [1800000, 2700000, 3800000, 5200000],
    bonus: [200000, 350000, 500000, 700000],
    stock: [350000, 750000, 1100000, 1700000],
  },

  {
    company: "Amazon",
    role: "Software Development Engineer",
    levels: ["L4", "L5", "L6", "L7"],
    base: [1800000, 2600000, 3800000, 5200000],
    bonus: [200000, 350000, 500000, 700000],
    stock: [500000, 850000, 1400000, 2200000],
  },

  {
    company: "Meta",
    role: "Software Engineer",
    levels: ["E3", "E4", "E5", "E6"],
    base: [3000000, 4500000, 6500000, 8500000],
    bonus: [400000, 600000, 900000, 1200000],
    stock: [1000000, 1800000, 3000000, 4500000],
  },

  {
    company: "Apple",
    role: "Software Engineer",
    levels: ["ICT2", "ICT3", "ICT4", "ICT5"],
    base: [2500000, 3800000, 5200000, 7000000],
    bonus: [250000, 400000, 600000, 800000],
    stock: [500000, 1000000, 1800000, 2800000],
  },

  {
    company: "Nvidia",
    role: "Software Engineer",
    levels: ["IC1", "IC2", "IC3", "IC4"],
    base: [2200000, 3500000, 5000000, 6800000],
    bonus: [250000, 450000, 700000, 900000],
    stock: [600000, 1200000, 2200000, 3500000],
  },

  {
    company: "Adobe",
    role: "Software Engineer",
    levels: [
      "Software Engineer L2",
      "Software Engineer L3",
      "Senior Software Engineer L4",
      "Computer Scientist",
    ],
    base: [1600000, 2300000, 3400000, 4800000],
    bonus: [200000, 300000, 450000, 600000],
    stock: [300000, 500000, 900000, 1400000],
  },

  {
    company: "Atlassian",
    role: "Software Engineer",
    levels: ["P30", "P40", "P50", "P60"],
    base: [2950000, 5000000, 7000000, 9500000],
    bonus: [155000, 750000, 900000, 1200000],
    stock: [1350000, 1670000, 2600000, 4000000],
  },

  {
    company: "Oracle",
    role: "Software Engineer",
    levels: [
      "Member Technical Staff",
      "Software Developer",
      "Senior Member Technical Staff",
      "Principal Member Technical Staff",
    ],
    base: [1200000, 2000000, 3200000, 4800000],
    bonus: [120000, 200000, 350000, 500000],
    stock: [150000, 350000, 700000, 1200000],
  },

  {
    company: "SAP",
    role: "Software Engineer",
    levels: [
      "Developer Associate",
      "Software Developer",
      "Senior Developer",
      "Development Architect",
    ],
    base: [1200000, 2000000, 3200000, 4500000],
    bonus: [100000, 180000, 300000, 450000],
    stock: [100000, 250000, 500000, 900000],
  },

  {
    company: "Cisco",
    role: "Software Engineer",
    levels: [
      "Software Engineer I",
      "Software Engineer II",
      "Software Engineer III",
      "Technical Leader",
    ],
    base: [1400000, 2200000, 3500000, 5000000],
    bonus: [120000, 220000, 350000, 500000],
    stock: [250000, 500000, 900000, 1500000],
  },

  {
    company: "Salesforce",
    role: "Software Engineer",
    levels: [
      "MTS",
      "Software Engineer",
      "Senior MTS",
      "Lead Member Technical Staff",
    ],
    base: [1600000, 2500000, 3800000, 5200000],
    bonus: [150000, 250000, 400000, 600000],
    stock: [250000, 500000, 1000000, 1700000],
  },

  {
    company: "ServiceNow",
    role: "Software Engineer",
    levels: [
      "Software Engineer",
      "Software Engineer II",
      "Senior Software Engineer",
      "Staff Software Engineer",
    ],
    base: [1400000, 2200000, 3500000, 5000000],
    bonus: [120000, 220000, 350000, 500000],
    stock: [200000, 450000, 900000, 1500000],
  },

  {
    company: "Uber",
    role: "Software Engineer",
    levels: [
      "Software Engineer I",
      "Software Engineer II",
      "Senior Software Engineer",
      "Staff Software Engineer",
    ],
    base: [2000000, 3200000, 5000000, 7000000],
    bonus: [200000, 350000, 550000, 750000],
    stock: [500000, 1000000, 2000000, 3500000],
  },

  // =========================
  // INDIAN PRODUCT COMPANIES
  // =========================

  {
    company: "Flipkart",
    role: "Software Development Engineer",
    levels: ["SDE 1", "SDE 2", "Senior SDE", "Lead Software Engineer"],
    base: [1400000, 2200000, 3500000, 5000000],
    bonus: [100000, 200000, 350000, 500000],
    stock: [200000, 500000, 1000000, 1800000],
  },

  {
    company: "Zoho",
    role: "Software Engineer",
    levels: [
      "Member Technical Staff",
      "Software Developer",
      "Senior Developer",
      "Technical Lead",
    ],
    base: [700000, 1100000, 1800000, 2600000],
    bonus: [50000, 100000, 150000, 250000],
    stock: [0, 0, 0, 0],
  },

  {
    company: "Freshworks",
    role: "Software Engineer",
    levels: [
      "Software Engineer",
      "Senior Software Engineer",
      "Lead Software Engineer",
      "Staff Software Engineer",
    ],
    base: [1000000, 1800000, 2800000, 4000000],
    bonus: [100000, 180000, 280000, 400000],
    stock: [150000, 350000, 700000, 1200000],
  },

  {
    company: "Paytm",
    role: "Software Engineer",
    levels: [
      "Software Engineer",
      "SDE II",
      "Senior Software Engineer",
      "Lead Engineer",
    ],
    base: [900000, 1500000, 2400000, 3500000],
    bonus: [80000, 150000, 250000, 350000],
    stock: [100000, 250000, 500000, 900000],
  },

  {
    company: "PhonePe",
    role: "Software Engineer",
    levels: [
      "Software Engineer",
      "SDE II",
      "Senior Software Engineer",
      "Staff Engineer",
    ],
    base: [1200000, 2000000, 3200000, 4800000],
    bonus: [100000, 200000, 350000, 500000],
    stock: [250000, 500000, 1000000, 1800000],
  },

  // =========================
  // BANKING / FINTECH
  // =========================

  {
    company: "JPMorgan Chase",
    role: "Software Engineer",
    levels: [
      "Software Engineer I",
      "Software Engineer II",
      "Senior Software Engineer",
      "Vice President",
    ],
    base: [1200000, 1900000, 3000000, 4500000],
    bonus: [150000, 250000, 450000, 700000],
    stock: [50000, 150000, 400000, 800000],
  },

  {
    company: "Goldman Sachs",
    role: "Software Engineer",
    levels: [
      "Analyst",
      "Associate",
      "Vice President",
      "Executive Director",
    ],
    base: [1400000, 2400000, 3800000, 5500000],
    bonus: [250000, 500000, 900000, 1400000],
    stock: [50000, 150000, 400000, 800000],
  },

  {
    company: "American Express",
    role: "Software Engineer",
    levels: [
      "Engineer I",
      "Engineer II",
      "Senior Engineer",
      "Lead Engineer",
    ],
    base: [1000000, 1700000, 2700000, 4000000],
    bonus: [100000, 180000, 300000, 450000],
    stock: [50000, 150000, 350000, 700000],
  },

  // =========================
  // HARDWARE / ENGINEERING
  // =========================

  {
    company: "Qualcomm",
    role: "Software Engineer",
    levels: [
      "Engineer I",
      "Engineer II",
      "Senior Engineer",
      "Staff Engineer",
    ],
    base: [1200000, 2000000, 3200000, 4800000],
    bonus: [100000, 200000, 350000, 500000],
    stock: [200000, 450000, 900000, 1500000],
  },

  {
    company: "Samsung",
    role: "Software Engineer",
    levels: [
      "Software Engineer",
      "Senior Software Engineer",
      "Lead Engineer",
      "Principal Engineer",
    ],
    base: [800000, 1400000, 2200000, 3200000],
    bonus: [70000, 120000, 200000, 300000],
    stock: [50000, 100000, 200000, 400000],
  },

  {
    company: "Intel",
    role: "Software Engineer",
    levels: [
      "Grade 3",
      "Grade 4",
      "Grade 5",
      "Grade 6",
    ],
    base: [900000, 1500000, 2500000, 3800000],
    bonus: [80000, 150000, 250000, 400000],
    stock: [100000, 250000, 500000, 900000],
  },

  // =========================
  // OTHER MAJOR EMPLOYERS
  // =========================

  {
    company: "Walmart",
    role: "Software Engineer",
    levels: [
      "Software Engineer III",
      "Software Engineer II",
      "Senior Software Engineer",
      "Staff Software Engineer",
    ],
    base: [1500000, 2400000, 3800000, 5500000],
    bonus: [150000, 250000, 400000, 600000],
    stock: [250000, 500000, 1000000, 1800000],
  },

  {
    company: "IBM",
    role: "Software Engineer",
    levels: [
      "Associate Software Engineer",
      "Software Engineer",
      "Senior Software Engineer",
      "Staff Software Engineer",
    ],
    base: [600000, 1100000, 1800000, 2800000],
    bonus: [50000, 100000, 180000, 300000],
    stock: [0, 50000, 150000, 300000],
  },
];

const locations = [
  "Bangalore",
  "Hyderabad",
  "Pune",
  "Chennai",
  "Noida",
];

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function normalizeCompanyName(value: string) {
  return value.trim().replace(/\s+/g, " ");
}

function fingerprint(
  company: string,
  role: string,
  level: string,
  location: string,
  baseSalary: number,
  bonus: number,
  stock: number
) {
  return [
    company.toLowerCase(),
    role.toLowerCase(),
    level.toLowerCase(),
    location.toLowerCase(),
    baseSalary,
    bonus,
    stock,
  ].join("|");
}

async function main() {
  console.log("🌱 Expanding COMPINTEL salary dataset...");

  let inserted = 0;
  let skipped = 0;

  for (const profile of profiles) {
    const companyName = normalizeCompanyName(profile.company);
    const slug = slugify(companyName);

    const company = await prisma.company.upsert({
      where: {
        name: companyName,
      },
      update: {},
      create: {
        name: companyName,
        slug,
        description: `${companyName} compensation records for the COMPINTEL demo dataset.`,
      },
    });

    for (let i = 0; i < profile.levels.length; i++) {
      const level = profile.levels[i];
      const baseSalary = profile.base[i];
      const bonus = profile.bonus[i];
      const stock = profile.stock[i];
      const location = locations[i % locations.length];

      const totalComp =
        baseSalary +
        bonus +
        stock;

      const fp = fingerprint(
        companyName,
        profile.role,
        level,
        location,
        baseSalary,
        bonus,
        stock
      );

      const existing =
        await prisma.compensation.findUnique({
          where: {
            fingerprint: fp,
          },
        });

      if (existing) {
        skipped++;
        continue;
      }

      await prisma.compensation.create({
        data: {
          companyId: company.id,
          role: profile.role,
          level,
          location,
          baseSalary,
          bonus,
          stock,
          totalComp,
          source: "Demo dataset",
          fingerprint: fp,
        },
      });

      inserted++;
    }
  }

  console.log("");
  console.log("✅ Dataset expansion completed.");
  console.log(`📊 New records inserted: ${inserted}`);
  console.log(`⏭️ Duplicate records skipped: ${skipped}`);
  console.log(`🏢 Company profiles: ${profiles.length}`);
}

main()
  .catch((error) => {
    console.error("❌ Seed expansion failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
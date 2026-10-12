require("dotenv").config();
const bcrypt = require("bcryptjs");
const connectDB = require("./config/db");
const User = require("./models/User");
const Opportunity = require("./models/Opportunity");
const Application = require("./models/Application");

async function seedData() {
  console.log("Connecting to MongoDB for seeding...");
  await connectDB();

  console.log("Clearing existing sample placement data...");
  // Clear existing opportunities & applications
  await Application.deleteMany({});
  await Opportunity.deleteMany({});

  // Ensure default admin
  const adminEmail = (process.env.ADMIN_EMAIL || "admin@placementhub.com").toLowerCase();
  let admin = await User.findOne({ email: adminEmail });
  if (!admin) {
    const adminPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD || "Admin@12345", 10);
    admin = await User.create({
      name: process.env.ADMIN_NAME || "Placement Administrator",
      email: adminEmail,
      password: adminPassword,
      role: "admin"
    });
    console.log("Created default Admin account:", adminEmail);
  }

  // Pre-hash password for sample accounts
  const defaultPassword = await bcrypt.hash("Password@123", 10);

  // Seed Companies
  const companiesData = [
    {
      name: "Satya Nadella",
      email: "careers@microsoft.com",
      companyName: "Microsoft",
      role: "company",
      phone: "+91 9876543210",
      website: "https://careers.microsoft.com",
      description: "Global cloud, productivity, AI, and computing software pioneer."
    },
    {
      name: "Sundar Pichai",
      email: "recruitment@google.com",
      companyName: "Google",
      role: "company",
      phone: "+91 9876543211",
      website: "https://careers.google.com",
      description: "World leader in search, cloud systems, generative AI, and consumer tech."
    },
    {
      name: "Amazon Campus",
      email: "jobs@amazon.com",
      companyName: "Amazon",
      role: "company",
      phone: "+91 9876543212",
      website: "https://amazon.jobs",
      description: "E-commerce, cloud infrastructure (AWS), logistics, and machine learning."
    },
    {
      name: "Goldman HR",
      email: "campus@goldmansachs.com",
      companyName: "Goldman Sachs",
      role: "company",
      phone: "+91 9876543213",
      website: "https://goldmansachs.com/careers",
      description: "Premier global investment banking, securities, and financial technology."
    },
    {
      name: "TCS Early Careers",
      email: "campus@tcs.com",
      companyName: "Tata Consultancy Services",
      role: "company",
      phone: "+91 9876543214",
      website: "https://tcs.com/careers",
      description: "Leader in IT services, consulting, and enterprise digital solutions."
    }
  ];

  const companies = [];
  for (const c of companiesData) {
    let company = await User.findOne({ email: c.email });
    if (!company) {
      company = await User.create({
        ...c,
        password: defaultPassword
      });
      console.log(`Created Company: ${c.companyName} (${c.email})`);
    } else {
      company.companyName = c.companyName;
      company.website = c.website;
      company.description = c.description;
      await company.save();
    }
    companies.push(company);
  }

  // Seed Students
  const studentsData = [
    {
      name: "Aarav Sharma",
      email: "aarav.sharma@college.edu",
      role: "student",
      phone: "+91 9811122233",
      branch: "CSE",
      year: 4,
      cgpa: 9.2,
      backlogs: 0
    },
    {
      name: "Pooja Reddy",
      email: "pooja.reddy@college.edu",
      role: "student",
      phone: "+91 9822233344",
      branch: "CST",
      year: 4,
      cgpa: 8.7,
      backlogs: 0
    },
    {
      name: "Rohan Varma",
      email: "rohan.varma@college.edu",
      role: "student",
      phone: "+91 9833344455",
      branch: "ECE",
      year: 4,
      cgpa: 7.9,
      backlogs: 0
    },
    {
      name: "Sneha Patel",
      email: "sneha.patel@college.edu",
      role: "student",
      phone: "+91 9844455566",
      branch: "IT",
      year: 3,
      cgpa: 8.4,
      backlogs: 1
    },
    {
      name: "Koushik Kumar",
      email: "koushik.student@college.edu",
      role: "student",
      phone: "+91 9855566677",
      branch: "CSE",
      year: 4,
      cgpa: 9.5,
      backlogs: 0
    }
  ];

  const students = [];
  for (const s of studentsData) {
    let student = await User.findOne({ email: s.email });
    if (!student) {
      student = await User.create({
        ...s,
        password: defaultPassword
      });
      console.log(`Created Student: ${s.name} (${s.email})`);
    } else {
      student.branch = s.branch;
      student.year = s.year;
      student.cgpa = s.cgpa;
      student.backlogs = s.backlogs;
      await student.save();
    }
    students.push(student);
  }

  // Seed Placement Drives / Opportunities
  const msft = companies.find(c => c.companyName === "Microsoft");
  const google = companies.find(c => c.companyName === "Google");
  const amazon = companies.find(c => c.companyName === "Amazon");
  const gs = companies.find(c => c.companyName === "Goldman Sachs");
  const tcs = companies.find(c => c.companyName === "Tata Consultancy Services");

  const futureDeadline = (days) => new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  const opportunitiesData = [
    {
      company: msft._id,
      title: "Software Development Engineer - 1",
      description: "Build scalable cloud services on Azure, AI-driven backend APIs, and distributed architectures. Core proficiency in C++, Java, or C# along with DS & Algo is required.",
      location: "Hyderabad / Bangalore",
      package: "₹45 LPA",
      jobType: "Full Time",
      deadline: futureDeadline(20),
      eligibility: {
        minCGPA: 8.0,
        maxBacklogs: 0,
        branches: ["CSE", "CST", "IT", "ECE"],
        minYear: 4
      }
    },
    {
      company: google._id,
      title: "Associate Software Engineer",
      description: "Work on Google Cloud platform, Search infra, or Android core modules. Candidates should have solid problem-solving abilities and strong foundation in algorithms.",
      location: "Bangalore",
      package: "₹48 LPA",
      jobType: "Full Time",
      deadline: futureDeadline(25),
      eligibility: {
        minCGPA: 8.5,
        maxBacklogs: 0,
        branches: ["CSE", "CST", "IT"],
        minYear: 4
      }
    },
    {
      company: amazon._id,
      title: "Software Development Engineer (Campus)",
      description: "Design high-performance distributed systems supporting millions of customers on AWS and Prime ecosystems. Excellent OOP and system design basics required.",
      location: "Hyderabad",
      package: "₹38 LPA",
      jobType: "Full Time",
      deadline: futureDeadline(15),
      eligibility: {
        minCGPA: 7.5,
        maxBacklogs: 0,
        branches: ["CSE", "CST", "IT", "ECE", "EEE"],
        minYear: 4
      }
    },
    {
      company: amazon._id,
      title: "Summer SDE Intern 2026",
      description: "6-month high-impact summer internship program with PPO opportunity. Work directly alongside AWS platform engineers on real-world production projects.",
      location: "Bangalore / Remote",
      package: "₹80,000 / month",
      jobType: "Internship",
      deadline: futureDeadline(30),
      eligibility: {
        minCGPA: 7.0,
        maxBacklogs: 1,
        branches: ["CSE", "CST", "IT", "ECE"],
        minYear: 3
      }
    },
    {
      company: gs._id,
      title: "Quantitative Systems & FinTech Analyst",
      description: "Develop low latency trade execution engines, quantitative financial models, and analytics tools. Looking for strong math, Python/Java, and analytical skills.",
      location: "Bangalore",
      package: "₹32 LPA",
      jobType: "Full Time",
      deadline: futureDeadline(18),
      eligibility: {
        minCGPA: 8.0,
        maxBacklogs: 0,
        branches: ["CSE", "CST", "IT", "ECE", "EEE"],
        minYear: 4
      }
    },
    {
      company: tcs._id,
      title: "TCS Digital - System Engineer",
      description: "Deliver transformational enterprise software, IoT solutions, and cloud architectures for Fortune 500 clients. In-depth training and fast-track career growth.",
      location: "Pan-India",
      package: "₹9 LPA",
      jobType: "Full Time",
      deadline: futureDeadline(40),
      eligibility: {
        minCGPA: 6.5,
        maxBacklogs: 0,
        branches: ["CSE", "CST", "IT", "ECE", "EEE", "MECH", "CIVIL"],
        minYear: 4
      }
    }
  ];

  const createdOpportunities = await Opportunity.insertMany(opportunitiesData);
  console.log(`Created ${createdOpportunities.length} placement opportunities/drives.`);

  // Seed sample Applications with realistic statuses
  const oppMSFT = createdOpportunities[0];
  const oppGoogle = createdOpportunities[1];
  const oppAmazonFT = createdOpportunities[2];
  const oppAmazonIntern = createdOpportunities[3];
  const oppGS = createdOpportunities[4];
  const oppTCS = createdOpportunities[5];

  const aarav = students[0];
  const pooja = students[1];
  const rohan = students[2];
  const sneha = students[3];
  const koushik = students[4];

  const applicationsData = [
    // Koushik
    { student: koushik._id, opportunity: oppMSFT._id, status: "Selected" },
    { student: koushik._id, opportunity: oppGoogle._id, status: "Shortlisted" },
    { student: koushik._id, opportunity: oppAmazonFT._id, status: "Applied" },
    // Aarav
    { student: aarav._id, opportunity: oppMSFT._id, status: "Shortlisted" },
    { student: aarav._id, opportunity: oppAmazonFT._id, status: "Selected" },
    { student: aarav._id, opportunity: oppGS._id, status: "Applied" },
    // Pooja
    { student: pooja._id, opportunity: oppMSFT._id, status: "Applied" },
    { student: pooja._id, opportunity: oppAmazonFT._id, status: "Shortlisted" },
    { student: pooja._id, opportunity: oppGS._id, status: "Selected" },
    // Rohan
    { student: rohan._id, opportunity: oppAmazonFT._id, status: "Applied" },
    { student: rohan._id, opportunity: oppTCS._id, status: "Selected" },
    // Sneha (3rd Year Intern)
    { student: sneha._id, opportunity: oppAmazonIntern._id, status: "Shortlisted" }
  ];

  await Application.insertMany(applicationsData);
  console.log(`Created ${applicationsData.length} student placement applications.`);

  console.log("\n=======================================================");
  console.log(" PlacementHub Database Seeding Completed Successfully! ");
  console.log("=======================================================");
  console.log("Default Logins for testing:");
  console.log(" 1. Administrator : admin@placementhub.com / Admin@12345");
  console.log(" 2. Recruiter (MS) : careers@microsoft.com / Password@123");
  console.log(" 3. Recruiter (Goog) : recruitment@google.com / Password@123");
  console.log(" 4. Student (Koushik) : koushik.student@college.edu / Password@123");
  console.log(" 5. Student (Aarav) : aarav.sharma@college.edu / Password@123");
  console.log("=======================================================\n");

  process.exit(0);
}

seedData().catch(err => {
  console.error("Seeding error:", err);
  process.exit(1);
});

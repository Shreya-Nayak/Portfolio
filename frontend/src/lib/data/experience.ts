export type ExperienceEntry = {
  period: string;
  organization: string;
  role: string;
  summary: string;
  technologies: string[];
};

export const experienceEntries: ExperienceEntry[] = [
  {
    period: "Starting now",
    organization: "Accenture",
    role: "Technology / Infrastructure",
    summary:
      "Beginning an early-career role in infrastructure and technology services. Current learning areas include infrastructure, Linux, networking, AWS and cloud, ITIL, security, DevOps, and generative AI.",
    technologies: [
      "Linux",
      "AWS",
      "Networking",
      "ITIL",
      "DevOps",
      "Generative AI",
    ],
  },
  {
    period: "Jun — Jul 2025",
    organization: "Wipro",
    role: "Software Engineering Intern · Agentic QA Automation",
    summary:
      "Researched and developed an AI-assisted test-case generation approach using GraphRAG, combining document inputs, existing XRAY test cases, vector retrieval, Neo4j, Qdrant Cloud, Gemini, Python, and FastAPI.",
    technologies: [
      "GraphRAG",
      "Neo4j",
      "Qdrant",
      "Gemini",
      "Python",
      "FastAPI",
    ],
  },
  {
    period: "Third year · NIT Goa",
    organization: "Coding Club",
    role: "Web Development Lead",
    summary:
      "Guided students through web development and hackathons, contributed primarily to the React frontend of the official NIT Goa website redesign, and collaborated around MongoDB and database integration.",
    technologies: ["React", "MongoDB", "Mentoring", "Technical leadership"],
  },
];

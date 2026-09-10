export type SkillGroup = {
  label: string;
  summary: string;
  items: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    label: "Languages",
    summary: "Languages used across application, systems, and data work.",
    items: ["Python", "Java", "C++", "JavaScript", "HTML", "CSS", "SQL"],
  },
  {
    label: "Frameworks",
    summary: "Web and backend tools used in projects and institutional work.",
    items: [
      "React",
      "Node.js",
      "Express",
      "Django",
      "Django REST",
      "FastAPI",
      "MongoDB",
    ],
  },
  {
    label: "AI / ML",
    summary:
      "Project-level exposure to models, retrieval, agents, and applied AI systems.",
    items: [
      "GraphRAG",
      "RAG",
      "LLMs",
      "LSTM",
      "Scikit-learn",
      "TensorFlow",
      "PyTorch",
      "Gemini",
    ],
  },
  {
    label: "Infrastructure",
    summary:
      "Current professional learning direction across systems and operations.",
    items: [
      "AWS",
      "Linux",
      "Networking",
      "VPC",
      "IAM",
      "DNS",
      "CloudFormation",
      "DevOps",
      "ITIL",
    ],
  },
  {
    label: "Data",
    summary:
      "Databases and data tools encountered across software and AI work.",
    items: [
      "MongoDB",
      "PostgreSQL",
      "Oracle",
      "Neo4j",
      "Qdrant",
      "Pandas",
      "NumPy",
      "SciPy",
    ],
  },
  {
    label: "Tooling",
    summary: "Tools used to build, test, analyze, and collaborate.",
    items: [
      "Git",
      "GitHub",
      "Jira",
      "Jira Xray",
      "Streamlit",
      "Postman",
      "Jupyter Notebook",
    ],
  },
];

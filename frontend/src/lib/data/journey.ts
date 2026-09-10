export type JourneyMilestone = {
  stage: string;
  title: string;
  summary: string;
};

export const journeyMilestones: JourneyMilestone[] = [
  {
    stage: "01",
    title: "Mechanical → Computer Science",
    summary:
      "An early change in direction that became part of the academic story: adapting from Mechanical Engineering into Computer Science and Engineering.",
  },
  {
    stage: "02",
    title: "NIT Goa · B.Tech CSE",
    summary:
      "Completed the degree in seven semesters with a 9.13 CGPA, building foundations across systems, software, AI, data, and networks.",
  },
  {
    stage: "03",
    title: "Projects that became systems",
    summary:
      "Explored concurrency, NLP, machine learning, and financial time-series research through hands-on technical projects.",
  },
  {
    stage: "04",
    title: "Wipro · Agentic QA",
    summary:
      "Worked with GraphRAG, vector retrieval, knowledge graphs, Gemini, and automated test-case generation.",
  },
  {
    stage: "05",
    title: "Accenture · broader foundations",
    summary:
      "Now building depth across infrastructure, cloud, Linux, networking, DevOps, automation, and AI systems.",
  },
];

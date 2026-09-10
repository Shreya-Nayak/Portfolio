export type ProfileMetadata = {
  label: string;
  value: string;
};

export const profile = {
  label: "COMPUTER SCIENCE ENGINEER",
  name: "Shreya Nayak",
  heroLead: "SYSTEMS / CLOUD / AI",
  headline:
    "Building a broader technology foundation across infrastructure, automation, and AI.",
  summary:
    "A B.Tech CSE graduate from NIT Goa, beginning my professional career at Accenture after exploring software, GraphRAG, machine learning, and web systems through projects and internships.",
  primaryCta: "See selected work",
  secondaryCta: "Talk to the portfolio",
  metadata: [
    { label: "Now", value: "Accenture · Technology / Infrastructure" },
    { label: "Foundation", value: "B.Tech CSE · NIT Goa · 9.13 CGPA" },
    { label: "Direction", value: "Cloud · DevOps · Automation · AI" },
  ] satisfies ProfileMetadata[],
  identityTags: ["Infrastructure", "Cloud systems", "Agentic automation"],
};

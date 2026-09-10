export type ProjectLink = {
  label: string;
  href: string | null;
};

export type ProjectEntry = {
  number: string;
  title: string;
  category: string;
  summary: string;
  problem: string;
  solution: string;
  outcome: string;
  technologies: string[];
  layout: "feature" | "offset" | "compact";
  links: ProjectLink[];
};

export const projects: ProjectEntry[] = [
  {
    number: "01",
    title: "Shock-Aware Adaptive Drift Detection",
    category: "Financial time-series research",
    summary:
      "A cross-asset benchmark for detecting volatility regime shifts with streaming detectors and an adaptive hybrid framework.",
    problem:
      "Financial markets shift between volatility regimes, while detectors trade off detection speed, noise sensitivity, and false alarms.",
    solution:
      "Benchmarked CUSUM, Page-Hinkley, ADWIN, and PELT, then routed observations through a volatility-aware adaptive hybrid.",
    outcome:
      "Evaluated across 22 assets with statistical validation and downstream volatility forecasting.",
    technologies: ["Python", "CUSUM", "ADWIN", "River", "SciPy", "Monte Carlo"],
    layout: "feature",
    links: [{ label: "Research project", href: null }],
  },
  {
    number: "02",
    title: "C++ Parallel Download Accelerator",
    category: "Systems and concurrency",
    summary:
      "A C++ file-download system that divides files into ranges, downloads chunks concurrently, and reconstructs the result.",
    problem:
      "Sequential downloads leave room to explore throughput, latency, resource use, and network bottlenecks.",
    solution:
      "Designed a chunk manager, parallel download workers, and a file reassembler around concurrent network operations.",
    outcome:
      "A practical exploration of concurrency and performance-oriented system design.",
    technologies: ["C++", "Multithreading", "File I/O", "Networking"],
    layout: "offset",
    links: [{ label: "Technical project", href: null }],
  },
  {
    number: "03",
    title: "Conversational Text Summarization",
    category: "NLP and backend",
    summary:
      "An individual NLP project using a pre-trained Hugging Face model and FastAPI to turn conversational text into concise summaries.",
    problem:
      "Long conversations can be difficult to scan and need a concise, readable representation.",
    solution:
      "Integrated model inference with a lightweight API that accepts conversation text and returns a summary.",
    outcome:
      "Hands-on experience connecting an NLP inference pipeline to a backend service.",
    technologies: ["Python", "FastAPI", "Hugging Face", "NLP"],
    layout: "compact",
    links: [{ label: "Academic project", href: null }],
  },
];

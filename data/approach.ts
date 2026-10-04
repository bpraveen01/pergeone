// Detailed process content for the Our Approach page.
export type Step = { title: string; summary: string; actions: string[]; outcome: string };
export const STEPS: Step[] = [
  { title: "Understand", summary: "We listen to the idea, problem, goals, users and requirements before suggesting anything.",
    actions: ["Listen to your idea and the problem behind it", "Clarify goals, users and constraints", "Raise risks and open questions early", "Agree on what success looks like"],
    outcome: "A shared understanding of the idea, written in plain language." },
  { title: "Plan", summary: "We define the product direction, scope, technology and execution path.",
    actions: ["Define scope and priorities", "Choose technology that fits your budget and long-term needs", "Break the work into clear milestones", "Be upfront about timelines and cost"],
    outcome: "A clear roadmap you can review and approve before we build." },
  { title: "Build", summary: "We create the actual product with attention to usability, performance and quality.",
    actions: ["Design the experience around real users", "Build in small steps you can see and react to", "Write clean, maintainable code", "Share progress regularly"],
    outcome: "Working software you can use, not just promises." },
  { title: "Test", summary: "We test functionality, APIs, integrations, workflows and user experience.",
    actions: ["Manual and exploratory testing", "Automated checks for key flows", "API and integration testing", "Usability and edge-case review"],
    outcome: "Confidence that the product works before real users depend on it." },
  { title: "Launch", summary: "We help move the product into real-world use.",
    actions: ["Prepare hosting and deployment pipelines", "Release to production in a controlled way", "Walk you through the finished product", "Watch closely in the first days"],
    outcome: "A smooth go-live with support close at hand." },
  { title: "Sustain", summary: "We maintain, support, improve and evolve the product.",
    actions: ["Fix issues and keep everything up to date", "Monitor and support day-to-day use", "Improve based on feedback and usage", "Add new features as your needs grow"],
    outcome: "A partner who stays involved long after launch." },
];

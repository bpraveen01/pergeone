// About Us page content. Edit the words here and the page updates.
// Nothing here claims numbers, clients or years of experience, so everything stays true.
export const ABOUT = {
  story: {
    eyebrow: "OUR STORY",
    heading: "Why PergeOne exists.",
    paras: [
      "Many technology projects start with energy and lose it after launch. A product gets handed over, the team moves on, and the people who depend on it are left to work things out alone.",
      "We started PergeOne to work the other way round: to be there at the very first conversation, and still be there when the product is part of someone's daily routine.",
      "We are four directors who build, test and support digital products together. Each of us owns a clear part of the work, and we keep the team small on purpose, so the people you speak to at the start are the people who stay with your project.",
    ],
  },
  glance: [
    ["Leadership", "Four directors"],
    ["Location", "Remote-first"],
    ["What we do", "Websites, apps, AI, testing, cloud, automation and documentation"],
    ["How we work", "Build · Maintain · Grow"],
  ] as [string, string][],
  team: {
    eyebrow: "LEADERSHIP",
    heading: "Four directors. One shared direction.",
    text: "Every project has a named owner at each stage. Our roles are clear, so you always know who is responsible for what, and who to speak to.",
        members: [
      { code: "Mr. AK", role: "CEO & Managing Director", line: "Sets the direction of the company and keeps every commitment we make sound and sustainable.", photo: "" },
      { code: "Mr. PB", role: "Chief Product Officer (CPO)", line: "Owns the quality of what you see and use, from the first screen to the final test.", photo: "" },
      { code: "Mr. RSR", role: "Chief Technology Officer (CTO)", line: "Designs and builds the technology underneath, and steps in when something needs deep technical attention.", photo: "" },
      { code: "Mr. BM", role: "Chief Operating Officer (COO), Technical Operations", line: "Keeps delivery running smoothly, and keeps your product healthy after it goes live.", photo: "" },
    ] as { code: string; role: string; line: string; photo: string }[],
  },
  purpose: {
    eyebrow: "PURPOSE",
    heading: "What we are here to do.",
    items: [
      ["Our mission", "To turn ideas into dependable technology, and to stay beside the people who use it."],
      ["Our vision", "A future of smarter, simpler, better technology: products people can rely on for the long term."],
    ] as [string, string][],
  },
  beliefs: {
    eyebrow: "WHAT WE BELIEVE",
    heading: "The way we work, in six lines.",
    items: [
      ["ear", "Listen first", "The best solution starts with understanding the problem, the people and the goal. We ask before we build."],
      ["chat", "Plain words", "No jargon to hide behind. You always know what we are doing, why, and what comes next."],
      ["shield", "Quality is built in", "Testing is part of the work from the first day, not a step added at the end."],
      ["heart", "Treat it as our own", "We care about your product the way we would care about ours, and it shows in the details."],
      ["inf", "Stay after launch", "Launch is a milestone, not the finish line. We keep supporting what we build."],
      ["up", "Keep improving", "Good products keep getting better. We learn from real use and improve step by step."],
    ] as [string, string, string][],
  },
  remote: {
    eyebrow: "HOW WE WORK WITH YOU",
    heading: "Remote by design.",
    text: "We work remotely, which lets us put our time into the work and into you, rather than into travel and meetings that could have been a message. Working this way is simple when the habits are right.",
    points: [
      ["globe", "Work from anywhere", "Everything happens online, so location is never a barrier to working together."],
      ["chat", "Clear written updates", "Regular notes on progress and decisions, so nothing depends on memory."],
      ["users", "One team behind you", "A small team that knows your project from the start, not a queue of strangers."],
    ] as [string, string, string][],
  },
  video: {
    eyebrow: "THE TEAM",
    heading: "Our story, in motion.",
    text: "A short film introducing the four of us and why we started PergeOne.",
    soon: "Our team film is on its way.",
  },
};
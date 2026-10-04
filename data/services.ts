// Detailed service content. Edit text freely; slug is used in links (/services#slug).
export type Service = { slug: string; icon: string; title: string; tagline: string; intro: string; offerings: [string, string][] };
export const SERVICES: Service[] = [
  { slug: "development", icon: "code", title: "Development", tagline: "Websites, apps and custom software",
    intro: "Whether your idea is a sketch on paper or a clear specification, we turn it into a working product. We design for real users, build with maintainable code, and keep the product easy to grow.",
    offerings: [
      ["Websites & Web Apps", "Fast, responsive websites and web applications that are easy to use, easy to update and ready to grow with you."],
      ["Mobile Apps", "Mobile applications for your customers or your team, planned around how people actually use their phones."],
      ["Custom Software & Scripts", "Tailored tools and scripts that remove repetitive work and fit the way your business already operates."],
      ["E-commerce", "Online stores with clear product pages, simple checkout flows and room to expand your catalogue."],
      ["Healthcare Solutions", "Software for healthcare workflows, built with careful attention to accuracy, data privacy and reliability."],
      ["Business Dashboards", "Dashboards that bring your key numbers into one clear view so decisions become easier."]] },
  { slug: "ai-solutions", icon: "spark", title: "AI Solutions", tagline: "Practical AI for real work",
    intro: "AI is one of the tools we use, not the whole story. We apply it where it genuinely saves time or improves the experience, and we keep people in control of the result.",
    offerings: [
      ["AI Automation", "Automate repetitive tasks such as sorting, summarising and routing information, so your team can focus on higher-value work."],
      ["AI Content Tools", "Tools that help you draft, rewrite and organise content faster, with a review step so quality stays in your hands."],
      ["Custom AI Solutions", "AI features designed around your data and your problem, added to an existing product or built into a new one."]] },
  { slug: "quality-assurance", icon: "shield", title: "Quality Assurance", tagline: "Testing you can rely on",
    intro: "Testing is part of how we build, and it is also a service you can use on its own. We help teams find problems early, protect releases and build confidence in what they ship.",
    offerings: [
      ["Manual Testing", "Careful, exploratory testing of features, flows and edge cases from the point of view of a real user."],
      ["Automation Testing", "Automated test suites that run consistently, catch regressions quickly and shorten release cycles."],
      ["API Testing", "Verification of your services and integrations: responses, error handling, data contracts and reliability."],
      ["QA Consulting", "Guidance on test strategy, tooling and process, so your team can build quality into every release."]] },
  { slug: "cloud-infrastructure", icon: "cloud", title: "Cloud & Infrastructure", tagline: "Deployment, DevOps and CI/CD",
    intro: "A good product needs a dependable home. We set up cloud environments and delivery pipelines that make releasing software repeatable, safe and straightforward.",
    offerings: [
      ["Cloud Deployment", "Moving your application into the cloud with sensible structure, security basics and room to scale."],
      ["Azure", "Deployment and configuration of applications and services on Microsoft Azure."],
      ["GCP", "Deployment and configuration of applications and services on Google Cloud Platform."],
      ["DevOps", "Practical DevOps habits and tooling that bring development and operations closer together."],
      ["CI/CD", "Automated build, test and release pipelines so every change reaches production in a controlled way."],
      ["Automation", "Scripts and tooling that take routine infrastructure tasks off your plate."]] },
  { slug: "business-automation", icon: "gear", title: "Business Automation", tagline: "Less repetitive work, more focus",
    intro: "Many businesses lose hours every week to manual, repeatable tasks. We look at how work really flows, then automate the parts that slow people down.",
    offerings: [
      ["Process Automation", "Turn multi-step manual processes into reliable automated ones, with clear checks along the way."],
      ["Custom Scripts", "Small, focused scripts that connect your tools, move data and handle routine jobs."],
      ["Workflow Automation", "Automated workflows for approvals, notifications and hand-offs between people and systems."]] },
  { slug: "support-maintenance", icon: "heart", title: "Support & Maintenance", tagline: "We stay after launch",
    intro: "Launch is a milestone, not the finish line. We keep your product healthy, answer your questions and keep improving it as your needs change.",
    offerings: [
      ["Website Maintenance", "Regular updates, fixes and content changes so your website stays secure, fast and current."],
      ["Application Maintenance", "Bug fixes, dependency updates and small enhancements that keep your application running well."],
      ["Technical Support", "A clear point of contact when something needs attention, so you are never left guessing."],
      ["Continuous Improvement", "Ongoing improvements guided by real usage and feedback, so the product keeps getting better."]] },
];

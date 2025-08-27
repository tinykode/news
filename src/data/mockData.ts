import type { Article } from '../components/ProviderSection';

export const mockProviders = [
  {
    name: "Hacker News",
    articles: [
      {
        id: "hn-1",
        title: "Show HN: I built a tool to analyze code complexity",
        description: "A new approach to measuring technical debt and code maintainability using AST analysis and machine learning.",
        url: "https://news.ycombinator.com"
      },
      {
        id: "hn-2", 
        title: "The hidden costs of serverless computing",
        description: "An in-depth analysis of when serverless makes sense and when traditional architecture is more cost-effective.",
        url: "https://news.ycombinator.com"
      },
      {
        id: "hn-3",
        title: "WebAssembly is now supported in all major browsers", 
        description: "The latest milestone in web performance brings native speed to web applications across all platforms.",
        url: "https://news.ycombinator.com"
      },
      {
        id: "hn-4",
        title: "Building resilient distributed systems with Rust",
        description: "Lessons learned from migrating a high-traffic service from Node.js to Rust for better performance.",
        url: "https://news.ycombinator.com"
      },
      {
        id: "hn-5",
        title: "The future of database design in 2024",
        description: "Exploring new paradigms in data storage, from graph databases to time-series optimizations.",
        url: "https://news.ycombinator.com"
      },
      {
        id: "hn-6",
        title: "Why I switched from React to Svelte",
        description: "A developer's journey comparing modern frontend frameworks and their real-world performance.",
        url: "https://news.ycombinator.com"
      }
    ]
  },
  {
    name: "Reddit",
    articles: [
      {
        id: "reddit-1",
        title: "Advice for junior developers starting their first job",
        description: "Senior engineers share practical tips for navigating your first software development role successfully.",
        url: "https://reddit.com/r/programming"
      },
      {
        id: "reddit-2",
        title: "The best VS Code extensions for productivity in 2024",
        description: "Community recommendations for must-have extensions that will speed up your development workflow.",
        url: "https://reddit.com/r/programming"
      },
      {
        id: "reddit-3",
        title: "How to debug production issues like a pro",
        description: "Step-by-step strategies for identifying and fixing critical bugs in live applications.",
        url: "https://reddit.com/r/programming"
      },
      {
        id: "reddit-4", 
        title: "Understanding microservices architecture patterns",
        description: "Real examples of when to use microservices vs monoliths based on team size and complexity.",
        url: "https://reddit.com/r/programming"
      },
      {
        id: "reddit-5",
        title: "Machine learning for software engineers",
        description: "Getting started with ML concepts without a PhD - practical applications for everyday development.",
        url: "https://reddit.com/r/programming"
      },
      {
        id: "reddit-6",
        title: "Code review best practices that actually work",
        description: "How to give and receive constructive feedback that improves code quality and team culture.",
        url: "https://reddit.com/r/programming"
      }
    ]
  },
  {
    name: "Dev Community",
    articles: [
      {
        id: "dev-1",
        title: "Building accessible web applications from the start",
        description: "Essential techniques for creating inclusive user experiences that work for everyone.",
        url: "https://dev.to"
      },
      {
        id: "dev-2",
        title: "CSS Grid vs Flexbox: When to use which",
        description: "Visual guide to choosing the right layout method for your responsive design needs.",
        url: "https://dev.to"
      },
      {
        id: "dev-3",
        title: "API design principles for developer happiness",
        description: "Creating RESTful APIs that are intuitive, consistent, and easy to integrate with.",
        url: "https://dev.to"
      },
      {
        id: "dev-4",
        title: "Docker containers for local development",
        description: "Setting up consistent development environments across your team using containerization.",
        url: "https://dev.to"
      },
      {
        id: "dev-5",
        title: "Testing strategies for modern web applications",
        description: "Balancing unit, integration, and end-to-end tests for reliable software delivery.",
        url: "https://dev.to"
      },
      {
        id: "dev-6", 
        title: "Performance optimization techniques for React",
        description: "Practical methods to speed up your React applications and improve user experience.",
        url: "https://dev.to"
      }
    ]
  }
];
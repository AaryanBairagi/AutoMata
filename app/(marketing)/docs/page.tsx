"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft, Github, Linkedin, Instagram } from "lucide-react";

const sections = [
  {
    id: "introduction",
    title: "Introduction",
    content: `AutoMata is a full-stack AI-powered workflow automation platform designed to replace traditional no-code tools by giving developers complete control over integrations, execution logic, and data flow.

It enables users to build trigger-based, multi-step workflows across services like Google Drive, Gmail, Slack, Discord, Notion, and Google Calendar — all through a visual node-based editor.`,
  },
  {
    id: "getting-started",
    title: "Getting Started",
    content: `Install dependencies and start the development server:

1. npm install
2. npm run dev

Then navigate to http://localhost:3000 and:

• Authenticate your account  
• Connect integrations  
• Create your first workflow  
• Publish and test execution`,
  },
  {
    id: "features",
    title: "Core Features",
    content: `• Visual drag-and-drop workflow builder (infinite canvas)  
• Multi-step execution engine with dependency-aware chaining  
• AI-assisted automation nodes  
• Real-time execution with webhook triggers  
• Credit-based SaaS billing system with Stripe  
• Authentication and user management (Clerk)`,
  },
  {
    id: "integrations",
    title: "Integrations",
    content: `AutoMata directly integrates with external platforms using official APIs and custom OAuth implementations:

• Google Drive — file monitoring and trigger events  
• Gmail — email-based triggers and actions  
• Slack — bot-based messaging and notifications  
• Discord — webhook-driven messaging  
• Notion — database entry creation  
• Google Calendar — scheduling and event automation  

All integrations are built without third-party automation tools.`,
  },
  {
    id: "architecture",
    title: "Architecture",
    content: `AutoMata is built as a scalable event-driven system:

Frontend:
• Next.js 14 (App Router)
• Tailwind CSS + shadcn/ui
• Aceternity UI + XYFlow (node editor)

Backend:
• PostgreSQL + Prisma ORM
• Server Actions
• Async workflow execution engine

System Design:
• Event-driven architecture
• Asynchronous task execution
• Dependency-aware node chaining
• Partial failure handling and recovery`,
  },
  {
    id: "workflow-engine",
    title: "Workflow Engine",
    content: `The core of AutoMata is its execution engine:

• Trigger-based execution model  
• Directed node graph processing  
• Dynamic data passing between nodes  
• Ordered execution using dependency resolution  
• Supports cross-service automation pipelines  

Workflows execute in real-time or via webhook-triggered events.`,
  },
  {
    id: "oauth-security",
    title: "OAuth & Security",
    content: `All integrations use custom OAuth 2.0 implementations:

• Secure token storage  
• Access + refresh token lifecycle handling  
• Scope validation per integration  
• Token revocation support  

No third-party auth wrappers are used — everything is handled natively.`,
  },
  {
    id: "billing",
    title: "Billing System",
    content: `AutoMata uses a usage-based credit system powered by Stripe:

• Credits consumed per workflow execution  
• Subscription tiers (Developer, Startup, Enterprise)  
• Automatic execution pause when credits are exhausted  
• Stripe checkout + webhook validation  

This ensures predictable cost control for users.`,
  },
  {
    id: "real-time",
    title: "Real-time Execution",
    content: `A webhook ingestion layer enables real-time automation:

• External events trigger workflows instantly  
• Sub-second latency execution  
• Supports Google Drive changes, Gmail events, etc.  
• Event queue ensures reliable delivery and processing`,
  },
  {
    id: "tech-stack",
    title: "Tech Stack",
    content: `• Next.js 14 (App Router)  
• PostgreSQL  
• Prisma ORM  
• Clerk Authentication  
• Stripe Billing  
• Tailwind CSS  
• shadcn UI  
• Aceternity UI  
• XYFlow (visual workflow editor)`,
  },
];

const DocsPage = () => {
  return (
    <div className="min-h-screen bg-[#030014] text-white flex flex-col">

      {/* MAIN LAYOUT */}
      <div className="flex flex-1">

        {/* LEFT SIDEBAR */}
        <aside className="w-64 border-r border-white/10 p-6 hidden md:block sticky top-0 h-screen">
          <h2 className="text-sm font-semibold text-gray-400 mb-4">
            Documentation
          </h2>

          <nav className="space-y-2">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="block text-sm text-gray-400 hover:text-purple-400 transition"
              >
                {sec.title}
              </a>
            ))}
          </nav>
        </aside>

        {/* MAIN CONTENT */}
        <main className="flex-1 px-8 py-16 max-w-3xl mx-auto">

          {/* BACK BUTTON */}
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-purple-400 transition mb-6"
          >
            <ArrowLeft size={16} />
            Back
          </Link>

          <h1 className="text-4xl font-bold mb-10 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Documentation
          </h1>

          <div className="space-y-16">
            {sections.map((sec) => (
              <section key={sec.id} id={sec.id}>
                <h2 className="text-2xl font-semibold mb-3 text-purple-300">
                  {sec.title}
                </h2>

                <p className="text-gray-400 leading-relaxed whitespace-pre-line">
                  {sec.content}
                </p>

                {sec.id === "getting-started" && (
                  <div className="mt-4 p-4 rounded-xl bg-black/40 border border-white/10 text-sm text-gray-300">
                    npm install
                    <br />
                    npm run dev
                  </div>
                )}
              </section>
            ))}
          </div>
        </main>

        {/* RIGHT SIDEBAR */}
        <aside className="w-64 border-l border-white/10 p-6 hidden xl:block sticky top-0 h-screen">
          <h3 className="text-sm font-semibold text-gray-400 mb-4">
            On this page
          </h3>

          <nav className="space-y-2 text-sm">
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                className="block text-gray-500 hover:text-purple-400 transition"
              >
                {sec.title}
              </a>
            ))}
          </nav>

          <div className="mt-8 p-4 rounded-xl bg-white/5 border border-white/10">
            <p className="text-sm text-gray-300 mb-2">
              Deploy your AutoMata app
            </p>
            <button className="w-full py-2 rounded-lg bg-purple-600 hover:bg-purple-700 text-sm">
              Deploy Now
            </button>
          </div>
        </aside>

      </div>

      {/* FOOTER */}
      <footer className="mt-20 w-full border-t border-white/10 px-6 py-10 bg-[#030014]">

        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">

          {/* LEFT */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-2">AutoMata ⚡</h2>
            <p className="text-sm text-neutral-400 max-w-xs">
              Visual AI-powered workflow automation platform built for developers.
            </p>
          </div>

          {/* CENTER */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 text-sm">

            <div>
              <h3 className="text-white font-medium mb-2">Product</h3>
              <ul className="space-y-1 text-neutral-400">
                <li><a href="/pricing" className="hover:text-white transition">Pricing</a></li>
                <li><a href="/docs" className="hover:text-white transition">Docs</a></li>
                <li><a href="/enterprise" className="hover:text-white transition">Enterprise</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Developers</h3>
              <ul className="space-y-1 text-neutral-400">
                <li><a href="/docs" className="hover:text-white transition">Documentation</a></li>
                <li><a href="/docs#architecture" className="hover:text-white transition">Architecture</a></li>
                <li><a href="/docs#integrations" className="hover:text-white transition">Integrations</a></li>
              </ul>
            </div>

            <div>
              <h3 className="text-white font-medium mb-2">Company</h3>
              <ul className="space-y-1 text-neutral-400">
                <li><a href="/support" className="hover:text-white transition">Support</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms</a></li>
              </ul>
            </div>

          </div>

          {/* RIGHT */}
          <div>
            <h3 className="text-white font-medium mb-2">Follow</h3>
            <div className="flex gap-4 text-neutral-400">
              <a href="https://github.com/AaryanBairagi/AutoMata" target="_blank" className="hover:text-white transition">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com" target="_blank" className="hover:text-white transition">
                <Linkedin size={18} />
              </a>
              <a href="https://instagram.com" target="_blank" className="hover:text-white transition">
                <Instagram size={18} />
              </a>
            </div>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-10 border-t border-white/10 pt-6 text-center">

          <div className="text-neutral-400 text-sm">
            Built with <span className="text-white">🤍</span> by{" "}
            <span className="text-white font-medium">Aaryan Bairagi</span>
          </div>

          <div className="text-xs text-neutral-500 mt-2 flex items-center justify-center gap-2 flex-wrap">
            <span>AI Automation Platform · v1.0 · © {new Date().getFullYear()}</span>
            <span>•</span>
            <span>Powered by Next.js · PostgreSQL · Stripe</span>
            <span>•</span>
            <a
              href="https://github.com/AaryanBairagi/AutoMata"
              target="_blank"
              className="flex items-center gap-1 underline hover:text-white transition"
            >
              <Github size={14} strokeWidth={1.5} />
              GitHub
            </a>
          </div>

        </div>

      </footer>

    </div>
  );
};

export default DocsPage;
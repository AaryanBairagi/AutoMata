# AutoMata ⚙️ – The Visual AI SaaS Workflow Builder

**AutoMata** is an extensible, full-stack **AI-powered B2C SaaS platform** for building automation workflows across services like **Google Drive**, **Slack**, **Discord**, and **Notion** — using a **drag-and-drop node editor**. We manually set up each connection using official SDKs, avoiding no-code tools like Zapier or Make.

---

## 🚀 What AutoMata Does

- 🧠 Design **AI-assisted** automation flows on an **infinite canvas**
- 🤝 Connect Google Drive, Slack, Discord, Notion accounts
- 📦 Send messages, create database entries, and monitor file activity
- 🎯 Chain triggers and actions into **node-based workflows**
- 💳 Credit-based billing via **Stripe subscriptions**
- 🔄 Save, test, and publish flows using a clean UI
- ⚡ Fully functioning SaaS app — from landing page to billing and automation engine

---

## ✨ Features

- 🤯 **B2C SaaS** with authentication, credit system, and subscriptions
- 🌐 **Google Drive** integration with change detection listener
- 💬 **Slack & Discord**: send messages via bot/token/webhook
- 🧾 **Notion API**: dynamically create content entries
- 🛠️ **Custom OAuth** + access token storage (no libraries used)
- 🛒 **Stripe Billing** with credit deduction logic
- 📊 **Visual Flow Editor** with drag-and-drop nodes
- 🎨 Built with [shadcn/ui](https://ui.shadcn.dev) + [Aceternity UI](https://ui.aceternity.com/)
- 🗺️ Mini map, zoom, and infinite canvas
- 🌘 Light/Dark mode with theme persistence
- 🧪 Test workflows directly from the editor
- 🧩 Save local templates per service
- 🏁 Publish workflows for live automation

---

## 🧰 Tech Stack

- **Frontend:** Next.js 14 App Router, TypeScript, Tailwind CSS, shadcn UI, Aceternity UI, XYFlow
- **Backend:** Prisma ORM, PostgreSQL, Next.js Server Actions, Stripe
- **APIs Built:** Google Drive (watchers + files), Discord (webhooks), Slack (bot + messages), Notion (databases)

---

## 🔧 How I Built It

I manually set up each integration from scratch using official APIs and SDKs:

- ✅ Custom **OAuth** flows for Google, Slack, Notion, and Discord
- ✅ Manual **webhook setup** for Google Drive activity
- ✅ Used official SDKs: `@googleapis`, `@notionhq/client`, `@slack/web-api`
- ✅ Built the full **workflow engine** with Node connections, credit-based billing, and publish system using Prisma and Server Actions


---

## 🧪 Getting Started

```bash
npm install
npm run dev
```
---
Visit: http://localhost:3000
---
## 📈 Future Roadmap
-🧠 AI node suggestions using OpenAI
-👥 Team-based workflows
-🔐 OAuth token refresh cycle
-📡 Webhook delivery logging
-📦 Templates library with import/export

---

## 📄 License
MIT License

---
Built with ❤️ by Aaryan Bairagi — this is how real SaaS automation platforms are built, no abstractions, just raw engineering.


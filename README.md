#  NexSoc — Your Privacy is our Priority

**NexSoc** is a real-time, full-featured chat application built with **Next.js**, **TypeScript**, **Tailwind CSS**, and **Socket.IO**. Designed to support 1-1 chat, group chat, community interactions, and AI chatbot capabilities, NexSoc is crafted for performance, scalability, and a beautiful modern UI.

---

## Features

### Core Chat Functionality
- **One-to-One Chat** – Private real-time conversations between two users.
- **Group Chat** – Chat rooms for multiple participants with name, avatar, and group controls.
- **Communities Support** – Join or create community spaces for shared discussions.

### AI Integration
- **AI Chatbot** – Ask questions or get suggestions from an integrated AI assistant.

### User Management
- **User Profiles** – Custom profile page with avatar, bio, and recent chats.
- **Authentication** – Secure user auth with JWT/session (login, signup, logout).
- **Presence Detection** – Online/offline indicators using Socket.IO.

### Admin Panel
- **User Management** – View all users, delete accounts, or ban/unban users.
- **Community Oversight** – Moderate group chats and community spaces.

### Reusable UI Components
- Modular components designed using Tailwind CSS and utility-first patterns.

### Real-Time & Scalable
- Uses **Socket.IO** for real-time messaging and live updates.
- Built on **Next.js App Router** and server components for performance.

---
## Tech Stack

- Frontend	-> Next.js (App Router), TypeScript, Tailwind CSS

- Real-time	-> Socket.IO (client + server)

- Backend API -> Node.js (inside Next.js API routes)

- Auth	-> JWT or Session (NextAuth/custom)

- Database ->	Prisma / Mongo Db 

- AI Bot ->	OpenAI API or custom LLM model

- Admin Panel ->	Role-based protected routes
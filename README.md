# 📝 BlogApp

**BlogApp** is a full-featured, full-stack blog platform developed using the **MERN stack** — MongoDB, Express.js, React.js, and Node.js. Built from scratch with custom HTML and CSS for a unique design approach, BlogApp focuses on content creation and simplicity with style.

---

## 🚀 Project Overview

This application allows users to:
- 🖊️ Create new blog posts with a title and content
- 📚 Browse all available blog entries on the homepage
- 📝 Edit existing posts
- 🧭 Navigate easily through the app using a clean UI

> **Goal:** Build a blogging platform with end-to-end functionality and custom styling — no UI frameworks, just pure, handcrafted CSS ✨.

---

## 🛠️ Tech Stack

### 🧩 Backend:
- **Node.js** — JavaScript runtime environment
- **Express.js** — Web framework for Node.js
- **MongoDB** — NoSQL database
- **Mongoose** — MongoDB ODM for schema modeling

### 🎨 Frontend:
- **React.js** — Component-based frontend library
- **HTML5** — Markup structure
- **CSS3** — Custom styling (no frameworks)
- **JavaScript (ES6+)** — App logic and interactivity

---

## 🎨 Why I Used CSS Instead of Tailwind?

Instead of using utility-first frameworks like **Tailwind CSS**, I wrote **custom CSS** to:
- Craft a unique and **exclusive design**
- Avoid bloated class names and complexity
- Have **full creative control** over layout and visuals
- Reinforce CSS fundamentals 🎨

> 💡 Custom CSS gives BlogApp a **handmade, original look** that sets it apart from boilerplate designs.

---

## 🧱 Project Structure

```plaintext
blogApp/
│
├── client/                   # React Frontend
│   ├── public/
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   ├── pages/            # Route-based views
│   │   ├── styles/           # Custom CSS
│   │   ├── App.js
│   │   └── index.js
│   └── package.json
│
├── server/                   # Express Backend
│   ├── models/               # Mongoose schemas
│   ├── routes/               # REST API endpoints
│   ├── controllers/          # Logic for routes
│   ├── server.js             # Entry point
│   └── .env                  # Environment variables
│
└── README.md

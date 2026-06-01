# Week 19.0: Introduction to Next.js & Server-Side Rendering (SSR)

This week marks the introduction to **Next.js**, a powerful full-stack framework built on top of React. We explore the limitations of standard React applications, dive into the mechanics of Server-Side Rendering (SSR) versus Client-Side Rendering (CSR), and learn how to bootstrap a modern Next.js application.

---

## 🛑 The Shortcomings of React (CSR)

React is an incredible library with a highly efficient reconciliation process (diffing engine), but it has several notable disadvantages when building production-ready applications.

- **Separate Frontend and Backend:** React is purely a frontend library. You must maintain a separate backend project (like Node.js/Express) for your API routes.
- **No Built-in Routing:** React lacks native routing capabilities, forcing reliance on third-party libraries like `react-router-dom`.
- **Poor SEO Optimization:** Standard React apps are Client-Side Rendered, making them inherently difficult for search engines to index.
- **The Waterfalling Problem:** Sequential fetching of resources causes significant delays in initial rendering.

### The Waterfalling Problem Explained

In a standard React application, data fetching happens sequentially rather than in parallel:

1. The browser requests the website HTML.
2. The server returns a mostly empty HTML file containing a `<script>` tag.
3. The browser reads the `<script>` tag and requests the JavaScript bundle.
4. The server returns the JavaScript file.
5. The browser executes the JavaScript.
6. The executing JavaScript triggers an API call (e.g., fetching blogs).
7. The backend returns the data, and the content finally renders on the screen.

---

## 🚀 What Next.js Offers

Next.js was built to solve these exact inconsistencies by offering a unified, full-stack developer experience.

- **Server-Side Rendering (SSR):** The very first request returns a fully populated HTML document, eliminating the waterfall effect and drastically improving initial load times.
- **API Routes:** You can write backend logic and frontend code in a single repository.
- **File-Based Routing:** Creating a file or folder automatically creates a route. No `react-router-dom` is needed.
- **Built-in Optimizations:** Native optimizations for bundle sizes, images, and fonts.
- **Static Site Generation (SSG):** Pre-rendering pages at build time for maximum speed.

### Next.js vs. React (Deployment Architecture)

| Feature     | React (Client-Side Rendering)                       | Next.js (Server-Side Rendering)                  |
| ----------- | --------------------------------------------------- | ------------------------------------------------ |
| **Hosting** | Extremely cheap. Can be hosted statically on a CDN. | Requires an actively running Node.js server.     |
| **SEO**     | Poor. Crawlers receive an empty HTML file.          | Excellent. Crawlers receive fully rendered HTML. |
| **Routing** | Handled by Javascript (`react-router-dom`).         | Handled natively via the file system.            |
| **Backend** | Requires an external Express/Node server.           | Features native backend API routes.              |

> **🤖 A Note on SEO and Crawlers:** Google and Bing use bots (crawlers) to rank websites based on the HTML they receive. Traditionally, crawlers do not execute JavaScript. Because React sends an empty HTML file initially, crawlers struggle to index the actual content. Next.js solves this natively by pre-rendering the HTML on the server before sending it to the client.

---

## 🛠️ Getting Started with Next.js

Bootstrap a new Next.js application using the official CLI.

**Command:**

```bash
npx create-next-app@latest

```

**Standard Configuration Choices:**

- **TypeScript:** Yes
- **ESLint:** Yes
- **Tailwind CSS:** Yes
- **`src/` directory:** Yes
- **App Router:** Yes _(Recommended modern approach)_
- **Turbopack:** No _(For now)_
- **Import alias (`@/*`):** Yes

### File-Based Routing Structure

In the App Router, folders define the routes, and the `page.tsx` file defines the UI for that route.

```text
src/
└── app/
    ├── page.tsx          # Maps to route: '/'
    ├── users/
    │   └── page.tsx      # Maps to route: '/users'
    ├── signin/
    │   └── page.tsx      # Maps to route: '/signin'
    └── signup/
        └── page.tsx      # Maps to route: '/signup'

```

---

## ⚡ Server Components vs. Client Components

### Server Components (The Next.js Default)

By default, all components in the Next.js App Router are Server Components. They run on the server, meaning you can directly write asynchronous code and fetch data without using hooks.

```tsx
import axios from "axios";

// Fetching data securely on the server
async function getBlogs() {
  const response = await axios.get("https://api.example.com/blogs");
  return response.data;
}

// The component itself is async!
export default async function Blogs() {
  const blogs = await getBlogs();

  return <div>{JSON.stringify(blogs)}</div>;
}
```

### Client Components (The React Way)

If you use React hooks like `useState` or `useEffect`, the component must become a Client Component. **Warning:** If you fetch initial data using `useEffect`, you completely lose the benefits of Server-Side Rendering (the initial HTML will be empty).

```tsx
"use client"; // Required to use hooks
import { useState, useEffect } from "react";
import axios from "axios";

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);

  // This runs on the client AFTER the initial empty render
  useEffect(() => {
    axios.get("/api/blogs").then((res) => setBlogs(res.data));
  }, []);

  return <div>{JSON.stringify(blogs)}</div>;
}
```

---

## 🧩 Core Next.js Elements

### 1. The `<Link>` Component

Always use the Next.js `<Link>` component instead of standard `<a>` tags for internal navigation. It automatically pre-fetches the linked page in the background, making route transitions incredibly fast.

### 2. Layouts (`layout.tsx`)

Layouts allow you to share UI between multiple routes (like Navbars or Footers).

- **Root Layout:** Contains the overarching HTML structure, global fonts, and metadata (title, description for SEO).
- **Sub-Layouts:** You can nest `layout.tsx` files inside specific folders to wrap only those sub-routes.

```tsx
// Example of a shared layout wrapper
export default function AuthLayout({ children }) {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
}
```

> **💡 Side Note: Sending Emails with React**
> You can send HTML in emails, but email clients block JavaScript for security. If you build an email template in React, you can use `ReactDOMServer` on your backend to render the React component into raw, static HTML _before_ sending it out.

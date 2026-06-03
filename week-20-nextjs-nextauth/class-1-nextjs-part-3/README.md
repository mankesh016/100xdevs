# Week 20.1: Next.js Advanced Routing & Rendering (Part 3)

This week dives deeper into Next.js routing patterns and rendering strategies. We explore how to organize routes without affecting the URL structure, handle dynamic paths, and understand the core differences between Server-Side Rendering (SSR) and Static Site Generation (SSG).

---

## 🗂️ 1. Route Groups

In Next.js, enclosing a folder name in parentheses creates a **Route Group** (e.g., `(auth)`).
Route Groups allow you to organize your files logically and apply a shared `layout.tsx` to a specific group of routes **without** adding that folder's name to the public URL.

**Example Structure:**

```text
app/
├── (auth)/
│   ├── layout.tsx     # Only applies to signin & signup
│   ├── signin/
│   │   └── page.tsx   # URL: localhost:3000/signin
│   └── signup/
│       └── page.tsx   # URL: localhost:3000/signup
└── users/
    └── page.tsx       # URL: localhost:3000/users (auth layout is NOT applied here)

```

_(Note: Attempting to navigate to `localhost:3000/auth/signin` will result in a 404 error. The `(auth)` folder is invisible to the router)._

---

## 🔗 2. Dynamic Segments & Catch-all Routes

### Dynamic Routes `[slug]`

Wrap a folder name in square brackets to create a dynamic route. The value is passed to your component via the `params` prop.

```tsx
// app/blog/[postId]/page.tsx
export default async function BlogPage({
  params,
}: {
  params: { postId: string };
}) {
  // In modern Next.js, params is a Promise that must be awaited
  const { postId } = await params;

  const res = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );
  return (
    <div>
      Blog Post {postId} - {res.data.title}
    </div>
  );
}
```

### Catch-All Segments `[...slug]`

Used when you have deeply nested dynamic routes. It catches all paths following the base route.

- **Folder:** `app/courses/[...courseId]/page.tsx`
- **Matches:** `/courses/1`, `/courses/14/2/3`
- **Does NOT match:** `/courses` (the root).

### Optional Catch-All `[[...slug]]`

Using double brackets makes the segment optional, meaning it will also match the root route.

- **Folder:** `app/courses/[[...courseId]]/page.tsx`
- **Matches:** `/courses/14/2/3` AND `/courses`.

---

## ⚡ 3. Static Site Generation (SSG)

Next.js offers multiple rendering strategies:

- **CSR (Client-Side Rendering):** Standard React. Renders in the browser.
- **SSR (Server-Side Rendering):** Generates HTML dynamically on the server for _every single request_.
- **SSG (Static Site Generation):** Generates the HTML **once at build time**.

When you run `npm run build`, Next.js optimizes your pages:

- `○ (Static)`: Pages pre-rendered as static HTML. Incredibly fast because the server just serves a pre-built file without running database queries or logic.
- `ƒ (Dynamic)`: Pages rendered on-demand (SSR).

---

## 💧 4. Hydration & Client Boundaries

### The Layout Rule

If you declare `"use client"` at the top of a component, it becomes a Client Component. **Crucial Rule:** If a parent component is a Client Component, ALL of its children automatically become Client Components.

_Best Practice:_ Never make your top-level layout or page a Client Component just to add a 'Like' button. Extract the button into a small Client Component and import it into your Server Component.

### Hydration Errors

_"Hydration failed because the rendered HTML didn't match the client."_
This occurs when the Server Component generates HTML, but when the browser (Client Component) tries to attach event listeners ("hydrate" the DOM), the structure it expects doesn't match what the server actually sent.

---

## 🔗 Resources & Class Notes

- **Class Notes:** [NextJS Part 3 (Notion)](https://petal-estimate-4e9.notion.site/NextJS-Part-3-1637dfd107358090800ff3aaed7a5b3c)

```

```

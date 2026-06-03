# Week 20.2: Authentication in Next.js with NextAuth

This week focuses on implementing secure authentication in a Next.js application using **NextAuth.js** (now known as Auth.js). We cover why standard React JWT patterns fail in Next.js and how to configure OAuth and Credentials providers.

---

## 🛑 Why not LocalStorage & JWTs?

In standard React (Client-Side Rendering), a common pattern is:

1. User logs in $\rightarrow$ Server returns a JWT.
2. React stores the JWT in `LocalStorage`.
3. React attaches the JWT from `LocalStorage` to the headers of subsequent API requests.

**Why this fails in Next.js (SSR):**
When a user requests a Next.js page (e.g., `/profile`), the _very first request_ is a GET request for the HTML document. The Next.js server must generate this HTML securely based on who the user is.
However, **the server cannot access the client's browser `LocalStorage`**. If you rely on LocalStorage, the server won't know who the user is until _after_ the HTML is sent and the client-side JavaScript runs, entirely defeating the purpose of Server-Side Rendering.

**The Solution:** Next.js authentication must rely on **HTTP-Only Cookies**, which are automatically sent by the browser to the server on every initial page request. NextAuth manages these cookies flawlessly.

---

## 🛠️ Setting Up NextAuth

NextAuth is the industry standard for implementing authentication (OAuth or Credentials) in Next.js.

### 1. Installation

```bash
npm install next-auth

```

### 2. The API Route (The Core Configuration)

You must create a specific catch-all API route exactly at this path: `app/api/auth/[...nextauth]/route.ts`.

```typescript
// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    // 1. Email/Password Login
    CredentialsProvider({
      name: "Email",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Add DB logic here (e.g., prisma.user.findFirst)
        // If valid, return the user object. If invalid, return null.
        return { id: "1", name: "Alice", email: "alice@gmail.com" };
      },
    }),

    // 2. Google OAuth Login
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
});

// NextAuth requires exporting the handler for both GET and POST requests
export { handler as GET, handler as POST };
```

---

## 🔐 Accessing the Session

How you access the logged-in user's details depends on whether you are in a Client Component or a Server Component.

### 1. In a Server Component (Recommended)

Server components are highly secure and do not require any Context Providers. You simply await the session.

```tsx
// app/page.tsx
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession();

  // Protect the route
  if (!session?.user) {
    redirect("/api/auth/signin"); // Redirect to NextAuth default login page
  }

  return (
    <div>
      <h1>Welcome, {session.user.name}</h1>
    </div>
  );
}
```

### 2. In a Client Component

To use the `useSession` hook in a client component, your application must be wrapped in a `<SessionProvider>`.

**Step A: Create the Provider**

```tsx
// app/providers.tsx
"use client";
import { SessionProvider } from "next-auth/react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

_(Wrap your `layout.tsx` children in this `<Providers>` component)._

**Step B: Use the Hook**

```tsx
// app/components/Navbar.tsx
"use client";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navbar() {
  const { data: session } = useSession();

  return (
    <nav>
      {session ? (
        <button onClick={() => signOut()}>Logout {session.user?.name}</button>
      ) : (
        <button onClick={() => signIn()}>Login</button>
      )}
    </nav>
  );
}
```

---

## ⏭️ What's Next?

- **Callbacks:** Modifying the JWT and Session objects to include user IDs from the database.
- **Prisma Adapter:** Automatically saving OAuth users (like Google log-ins) directly into your PostgreSQL database.

## 🔗 Resources & Class Notes

- **Class Slides:** [Next-Auth & Routing Slides](https://projects.100xdevs.com/tracks/Next-Auth/La3EksBcKVqExEMwNAxa)

```

```

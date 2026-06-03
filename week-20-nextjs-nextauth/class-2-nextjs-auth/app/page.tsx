// "use client";
// import { SessionProvider, signIn, signOut, useSession } from "next-auth/react";
// import Image from "next/image";

import { getServerSession } from "next-auth";
import Link from "next/link";
import { redirect } from "next/navigation";

// export default function Home() {
//   return (
//     <SessionProvider>
//       <RealHome />
//     </SessionProvider>
//   );
// }

// export function RealHome() {
//   const session = useSession();
//   return (
//     <div>
//       Hi there
//       <div> home page </div>
//       {/* <div> {session.status === "authenticated" ? "Logout" : "Sign in"} </div> */}
//       {session.status === "authenticated" && (
//         <button onClick={() => signOut()}>Logout</button>
//       )}
//       {session.status === "unauthenticated" && (
//         <button onClick={() => signIn()}>Sign In</button>
//       )}
//     </div>
//   );
// }

// ---------------------------------------------------------------------------------------------------------------

export default async function Home() {
  const session = await getServerSession();
  // if (!session?.user) {
  //   return redirect("/");
  // }
  return (
    <div className="text-2xl w-screen h-screen ml-20 mt-20">
      Home Page
      <div> Current session: {JSON.stringify(session)}</div>
      <div>{<Link href="/api/auth/signin">/api/auth/signin</Link>} </div>
      <div>{<Link href="/api/auth/signout">/api/auth/signout</Link>} </div>
    </div>
  );
}

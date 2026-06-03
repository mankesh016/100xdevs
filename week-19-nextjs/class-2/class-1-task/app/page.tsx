// "use client";
import Link from "next/link";
// import { useRouter } from "next/navigation";

export default function Home() {
  // const router = useRouter();
  return (
    <div className="text-2xl flex w-screen h-screen flex-col items-center justify-center">
      Todo Application!
      <div className="border text-lg p-2 m-2 rounded-md">
        <Link href="/signin">Sign in to Todo app</Link>
      </div>
      <div className="border text-lg p-2 m-2 rounded-md">
        <Link href="/signup">Sign up to Todo app</Link>
      </div>
      {/* <button onClick={() => router.push("/signin")}>
        Sign in using useRouter
      </button> */}
    </div>
  );
}

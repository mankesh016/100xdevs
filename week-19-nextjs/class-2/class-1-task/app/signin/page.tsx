"use client";

import axios from "axios";
import { use, useReducer, useRef } from "react";

export default function SignIn() {
  const userRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);

  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="text-lg">Enter Your Credentials</div>

      <div className="border p-2 m-2 rounded-md">
        <input ref={userRef} type="text" placeholder="username" />
      </div>
      <div className="border p-2 m-2 rounded-md">
        <input ref={passwordRef} type="password" placeholder="password" />
      </div>

      <button
        className="border px-4 py-2 m-2 rounded-md bg-gray-800 text-white"
        onClick={() => {
          if (userRef.current && passwordRef.current) {
            axios.post("/api/v1/signin", {
              username: userRef.current.value,
              password: passwordRef.current.value,
            });
          }
        }}
      >
        Sign In
      </button>
    </div>
  );
}

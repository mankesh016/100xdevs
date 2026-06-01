import Image from "next/image";

export default function Home() {
  return (
    <div>
      <h1>Welcome! This is the home page.</h1>
      <div>
        Other pages are, 'auth/signin', '/auth/signup', '/users' and '/todos'
      </div>
    </div>
  );
}

import Link from "next/link";

export default function Home() {
  return (
    <div className="text-2xl w-screen h-screen ml-20 mt-20">
      Its the home page!
      <div>
        <Link href="/signin">Sign in</Link>
      </div>
      <div>
        <Link href="/signup">Sign up</Link>
      </div>
      <div>
        <Link href="/user">User</Link>
      </div>
      <div>
        <Link href="/blog/1">/blog/1</Link>
      </div>
      <div>
        <Link href="/blog/asdfg">/blog/asdfg</Link>
      </div>
      <div>
        <Link href="/blog/1/2/3/4">/blog/1/2/3/4</Link>
      </div>
      <div>
        <Link href="/blog">Blog "/blog" without id</Link>
      </div>
      <div>
        <Link href="/courses/1">/courses/1</Link>
      </div>
      <div>
        <Link href="/courses/1/2">/courses/1/2</Link>
      </div>
      <div>
        <Link href="/courses/1/2/3">/courses/1/2/3</Link>
      </div>
      <div>
        <Link href="/courses">Courses "/courses" without courseId</Link>
      </div>
    </div>
  );
}

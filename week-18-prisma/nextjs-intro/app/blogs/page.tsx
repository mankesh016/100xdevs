import axios from "axios";

async function getBlogs() {
  const posts = await axios.get("https://jsonplaceholder.typicode.com/posts");
  //   console.log(posts);
  return posts.data;
}

interface Blog {
  id: number;
  title: string;
  body: string;
}
export default async function Blogs() {
  const blogs: Blog[] = await getBlogs();

  return (
    <>
      <div>
        {blogs.map((blog: Blog) => (
          <>
            {/* typescript comes automatically */}
            <div className="font-bold">{blog.title}</div>
            <div className="italic">{blog.body}</div>
          </>
        ))}
      </div>
      {/* <div>{JSON.stringify([...blogs])}</div> */}
      <div> Learn Recoil/Redux from the best resources in the world </div>;
    </>
  );
}

import axios from "axios";

export default async function BlogPost({
  params,
}: {
  params: { postId: string };
}) {
  const { postId } = await params;
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/posts/${postId}`,
  );
  const data = response.data;

  return <div>Blog Post Page {JSON.stringify(data)}</div>;
}

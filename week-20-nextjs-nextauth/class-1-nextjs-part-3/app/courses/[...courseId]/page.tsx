import axios from "axios";

export default async function CoursePage({ params }: any) {
  const courseId = (await params).courseId;
  console.log(courseId);
  //   const response = await axios.get(
  //     `https://jsonplaceholder.typicode.com/posts/${courseId}`,
  //   );
  //   const data = response.data;

  //   return <div>Course Details {JSON.stringify(data)}</div>;
  return <div>Course Details {JSON.stringify(courseId)}</div>;
}

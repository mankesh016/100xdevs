import axios from "axios";

export default async function Users() {
  //   const res = await axios.get("https://jsonplaceholder.typicode.com/users/1");
  const res = await axios.get("http://localhost:3000/api/v1/user/details");
  const data = res.data;
  console.log(data);
  return (
    <div>
      <h1>User Details</h1>
      <div> Name: {data.name}</div>
      <div> Username: {data.username} </div>
      <div> Email: {data.email}</div>
    </div>
  );
}

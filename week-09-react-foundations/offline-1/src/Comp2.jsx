import PostComponent from "./Post";
import { useState } from "react";

function Comp2() {
  const [posts, setPosts] = useState([
    {
      image:
        "https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg",
      title: "Abhishek Sharma",
      subtitle: "connections",
      time: "5 days ago",
      text: "Yet another post",
      post: "https://images.pexels.com/photos/269077/pexels-photo-269077.jpeg",
    },
  ]);

  const postComponents = posts.map((post) => (
    <PostComponent
      image={post.image}
      title={post.title}
      subtitle={post.subtitle}
      time={post.time}
      text={post.text}
      post={post.post}
    />
  ));
  console.log(posts);
  console.log(postComponents);
  function addPost() {
    // push post to posts
    const newPost = {
      image:
        "https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg",
      title: "Abhishek Sharma",
      subtitle: "connections",
      time: "Now",
      text: "Yet another new post!",
      post: "https://www.niveeta.com/uploads/7-tips-corporate-designs-ideas.webp",
    };
    setPosts([...posts, newPost]);
  }
  return (
    <>
      <div>
        <ProfileComponent />
      </div>

      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 20,
          alignItems: "center",
        }}
      >
        {postComponents}
        <button onClick={addPost}>add post</button>
      </div>
    </>
  );
}

function ProfileComponent() {
  return (
    <div
      style={{
        width: 300,
        background: "white",
        border: "1px solid #d3d3d3",
        borderRadius: "10px",
        overflow: "hidden",
        position: "fixed",
      }}
    >
      <div
        style={{
          height: 70,
          background: "gray",
          display: "flex",
          justifyContent: "center",
          marginBottom: 50,
        }}
      >
        <div
          style={{
            width: 70,
            height: 70,
            borderRadius: 70,
            border: "3px solid white",
            overflow: "hidden",
            alignContent: "center",
            marginRight: "10px",
            position: "absolute",
            top: 35,
          }}
        >
          <img
            src="https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg"
            alt="linedin logo"
            style={{ height: "100%" }}
          />
        </div>
      </div>
      <div style={{ color: "#555", padding: 10 }}>
        <div>Followers: 5023</div>
        <div>Post impressions: 3435</div>
      </div>
    </div>
  );
}

export default Comp2;

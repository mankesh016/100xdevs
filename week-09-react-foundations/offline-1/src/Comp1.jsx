// Linkedin Posts Profile
function Comp1() {
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
        <PostComponent />
        <PostComponent />
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

function PostComponent() {
  return (
    <div
      style={{
        width: 600,
        background: "white",
        border: "1px solid #d3d3d3",
        borderRadius: "10px",
        padding: "10px",
      }}
    >
      <div style={{ margin: "10px 0px", display: "flex" }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 50,
            overflow: "hidden",
            alignContent: "center",
            marginRight: "10px",
          }}
        >
          <img
            src="https://img.freepik.com/free-photo/close-up-portrait-curly-handsome-european-male_176532-8133.jpg"
            alt="linedin logo"
            style={{ height: "100%" }}
          />
        </div>

        <div style={{ fontSize: "14px" }}>
          <div>
            <b>Linkedin</b>
          </div>
          <div>Ad linkedin for marketing</div>
          <div>2 days ago</div>
        </div>
      </div>
      <div>Linkedin for marketing...</div>

      <div
        style={{
          marginTop: 10,
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <img
          src="https://brand.linkedin.com/etc.clientlibs/settings/wcm/designs/gandalf/clientlibs/resources/images/og-social-share-image.jpg"
          alt="post"
          width="100%"
        />
      </div>
    </div>
  );
}
export default Comp1;

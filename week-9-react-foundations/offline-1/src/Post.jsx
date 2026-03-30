function PostComponent({ image, title, subtitle, time, text, post }) {
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
      <div
        style={{ margin: "10px 0px", display: "flex", alignItems: "center" }}
      >
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
          <img src={image} style={{ height: "100%" }} />
        </div>

        <div style={{ fontSize: "14px" }}>
          <div>
            <b>{title}</b>
          </div>
          <div>{subtitle}</div>
          {time !== undefined && <div>{time}</div>}
        </div>
      </div>
      <div>{text}</div>

      <div
        style={{
          marginTop: 10,
          width: "100%",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <img src={post} width="100%" />
      </div>
    </div>
  );
}

export default PostComponent;

export default function Welcome() {
  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "20px",
        paddingTop: "60px",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        textAlign: "center"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", marginBottom: "20px", marginTop: "20px"}}>
        <img
          src="logo.png" 
          alt="Summix logo"
          style={{ width: "75px", height: "auto", marginTop: "5px" }}
        />
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", marginTop: "10px"}}>summix</h1>

        <a
          href="/create"
          style={{
            padding: "10px 20px",
            backgroundColor: "#C8C8C8",
            color: "white",
            textDecoration: "none",
            borderRadius: "20px",
            textAlign: "center",
            marginTop: "20px"
          }}
        >
          Create an account
        </a>
        <a
          href="/login"
          style={{
            padding: "10px 20px",
            backgroundColor: "#78A378",
            color: "white",
            textDecoration: "none",
            borderRadius: "20px",
            textAlign: "center",
          }}
        >
          Log in
        </a>
      </div>
    </div>
  );
}

export default function Welcome() {
    return (
      <div
        style={{
          backgroundColor: "#A8CBA8",
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
        <h1 style={{ fontSize: "3rem", marginBottom: "20px", marginTop: "30px"}}>Welcome to Summix</h1>
        <h2 style={{ marginBottom: "15px" }}>Your hiking buddy!</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", marginBottom: "20px", marginTop: "20px"}}>
          <img
            src="summix.png" 
            alt="Summix logo"
            style={{ width: "75px", height: "auto", marginBottom: "10px", marginTop: "5px" }}
          />
          <a
            href="/create-account"
            style={{
              padding: "10px 20px",
              backgroundColor: "#4CAF50",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              textAlign: "center",
              fontWeight: "bold",
              marginTop: "20px"
            }}
          >
            Create an account
          </a>
          <a
            href="/login"
            style={{
              padding: "10px 20px",
              backgroundColor: "#2196F3",
              color: "white",
              textDecoration: "none",
              borderRadius: "5px",
              textAlign: "center",
              fontWeight: "bold"
            }}
          >
            Log in
          </a>
        </div>
      </div>
    );
  }
  
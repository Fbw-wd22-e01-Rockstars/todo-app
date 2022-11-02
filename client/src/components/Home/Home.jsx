import Typography from "@mui/material/Typography";
import { CssBaseline } from "@mui/material";
import Container from "@mui/material/Container";

function Home() {
  return (
    <Container component="main" maxWidth="md">
      <div className="landing_page">
        <CssBaseline />
        <Typography component="h1" variant="h2">
          Welcome to your{" "}
          <div className="h1-color">
            <span style={{ color: "#ff80ab" }}>To</span>
            <span style={{ color: "#01579b" }}>Do</span>
            -App!
          </div>
        </Typography>
        <Typography my={4} component="h2" variant="h4">
          We help you to stay organised!
        </Typography>
        <img
          src="https://media0.giphy.com/media/q6RoNkLlFNjaw/giphy.gif?cid=ecf05e472f8k7xmahc0f5a5n7j0ym9a4u17gkpva657jx75h&rid=giphy.gif&ct=g"
          alt="busy cat"
        />
      </div>
    </Container>
  );
}

export default Home;

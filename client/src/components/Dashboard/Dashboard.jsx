import Typography from "@mui/material/Typography";
import { CssBaseline } from "@mui/material";
import { Container } from "@mui/system";

function Dashboard() {
  return (
    <Container component="main" maxWidth="sm">
      <div className="landing_page">
        <CssBaseline />
        <Typography component="h1" variant="h2">
          Dashboard
        </Typography>
      </div>
    </Container>
  );
}

export default Dashboard;

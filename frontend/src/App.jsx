import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import { ProvideAuth } from "./useAuth";
import AppBar from "./AppBar";

function App(props) {
  return (
    <ProvideAuth>
      <CssBaseline />
      <AppBar />
      <Container disableGutters component="main" sx={{ pt: 8, pb: 6 }}>
        <props.element />
      </Container>
    </ProvideAuth>
  );
}

export default App;

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { useLocation } from "react-router-dom";
import { useAuth } from "./useAuth";

import { NavLink } from "react-router-dom";

import Logo from "./logo";

export default function () {
  let location = useLocation();
  const { signout } = useAuth();

  let isLogin = location.pathname === "/login";

  return (
    <AppBar
      position="static"
      color="default"
      elevation={0}
      sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
    >
      <Toolbar sx={{ flexWrap: "wrap" }}>
        <Typography
          variant="h6"
          color="inherit"
          noWrap
          sx={{ flexGrow: 1, fontSize: "0.1rem" }}
        >
          <Logo />
        </Typography>
        {!isLogin && (
          <nav>
            <Link
              variant="button"
              color="text.primary"
              component={NavLink}
              to="/tasks"
              sx={{ my: 1, mx: 1.5 }}
            >
              Tasks
            </Link>
            <Link
              variant="button"
              color="text.primary"
              component={NavLink}
              to="/users"
              sx={{ my: 1, mx: 1.5 }}
            >
              Users
            </Link>
          </nav>
        )}
        {!isLogin && (
          <Button
            href="#"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
            onClick={signout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}

//import { useMenu } from "../../hooks/useMenu.tsx";

import { Container } from "./styles";
import { useAuth } from "../../hooks/useAuth.ts";
import { Typography } from "@mui/material";
import { DashboardButton } from "../Buttons/DashboardButton.tsx";

export function Header() {
  // const { toggleState, ToggleMenu } = useMenu();
  const { auth, signOut } = useAuth();
  return (
    <>
      <Container>
        <Typography
          component="div"
          variant="h6"
          align="center"
          sx={{ margin: "10px" }}
        >
          <DashboardButton signOut={signOut} usuarioLogado={auth.usuario} />
        </Typography>
        <img
          srcSet={`${auth.image}?w=20&fit=crop&auto=format&dpr=2 2x`}
          src={`${auth.image}?w=20&fit=crop&auto=format`}
          alt={auth.usuario}
          loading="lazy"
        />
      </Container>
    </>
  );
}

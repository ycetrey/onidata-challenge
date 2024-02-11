import React from "react";

//import { useMenu } from "../../hooks/useMenu.tsx";

import { Container } from "./styles";
import { useAuth } from "../../hooks/useAuth.ts";
import { Typography } from "@mui/material";

const Header: React.FC = () => {
  // const { toggleState, ToggleMenu } = useMenu();
  const { auth } = useAuth();
  return (
    <>
      <Container>
        <Typography
          component="p"
          variant="h6"
          align="center"
          sx={{ margin: "10px" }}
        >
          {auth.usuario}
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
};

export default Header;

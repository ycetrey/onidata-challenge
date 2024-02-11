import React from "react";

//import { useMenu } from "../../hooks/useMenu.tsx";

import { Container } from "./styles";

const Header: React.FC = () => {
  // const { toggleState, ToggleMenu } = useMenu();

  return (
    <>
      <Container>
        <>Button</>
        <h3>Fulano</h3>
      </Container>
    </>
  );
};

export default Header;

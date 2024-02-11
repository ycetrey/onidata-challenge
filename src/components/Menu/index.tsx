import React from "react";

import { Container } from "./styles";

import { useMenu } from "../../hooks/useMenu";

const Menu: React.FC = () => {
  const { toggleState } = useMenu();

  return (
    <Container className={toggleState ? "active" : ""}>
      <>Menus </>
    </Container>
  );
};

export default Menu;

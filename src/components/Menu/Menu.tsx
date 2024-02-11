import { Container } from "./styles";

import { useMenu } from "../../hooks/useMenu";

export function Menu() {
  const { toggleState } = useMenu();

  return (
    <Container className={toggleState ? "active" : ""}>
      <>Menus </>
    </Container>
  );
}

export default Menu;

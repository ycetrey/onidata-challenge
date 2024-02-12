import { Container } from "./styles";
import { useNavigate } from "react-router-dom";
import { useMenu } from "../../hooks/useMenu";
import { Box, Button } from "@mui/material";
import { Image } from "../Image/";

export function Menu() {
  const navigate = useNavigate();
  const { toggleState } = useMenu();

  return (
    <Container className={toggleState ? "active" : ""}>
      <Box sx={{ margin: 2 }}>
        <Image src={"/logo.webp"} alt={"Onidata"} width={150} />
      </Box>
      <Button onClick={() => navigate("/product")}>Listar produtos</Button>
      <Button onClick={() => navigate("/product/add")}>
        Adicionar produtos
      </Button>
    </Container>
  );
}

export default Menu;

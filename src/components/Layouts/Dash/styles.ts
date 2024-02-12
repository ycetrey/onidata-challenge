import styled from "styled-components";
import { Box } from "@mui/material";
export const Grid = styled(Box)`
  display: grid;

  grid-template-columns: 250px auto;
  grid-template-rows: 64px auto;

  grid-template-areas:
    "Menu Header"
    "Menu Content";

  height: 100vh;
`;

export const Content = styled(Box)`
  height: calc(100vh - 130px);
  width: 100%;

  padding: 17px;
`;

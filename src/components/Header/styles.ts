import styled from "styled-components";
import { Box } from "@mui/material";
export const Container = styled(Box)`
  grid-area: Header;

  display: flex;
  flex-direction: row;

  background-color: ${(props) => props.theme["bg-header"]};
  width: 100%;

  align-items: center;
  position: relative;
  z-index: 3;
  justify-content: right;
  padding-right: 30px;
  //& > Button.menu {
  //  height: 64px;
  //  width: 72px;
  //  //background:;
  //  font-size: 24px;
  //  border-radius: 0;
  //  display: flex;
  //  flex-shrink: 0;
  //  align-items: center;
  //  justify-content: center;
  //}
`;

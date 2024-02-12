import styled from "styled-components";
import { Box } from "@mui/material";

export const Container = styled(Box)`
  grid-area: Menu;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${(props) => props.theme.primary};

  -webkit-box-shadow: 5px 0px 6px 0px rgba(224, 224, 224, 1);
  -moz-box-shadow: 5px 0px 6px 0px rgba(224, 224, 224, 1);
  box-shadow: 5px 0px 6px 0px rgba(224, 224, 224, 1);

  z-index: 2;
  width: 250px;
  transition: 0.5s;
  height: 100vh;
  & button {
    width: 90%;
    color: ${(props) => props.theme.background} !important;
    padding: 5px 0;
    margin: 5px 0;
    &:hover {
      color: ${(props) => props.theme.primary} !important;
      background: ${(props) => props.theme.background} !important;
    }
  }

  //&.selected {
  //  color: var(--blue);
  //  background: var(--light-gray);
  //}
  //
  //&:hover {
  //  color: var(--white);
  //  background: var(--tertiary);
  //}

  ::-webkit-scrollbar {
    display: none;
  }
`;

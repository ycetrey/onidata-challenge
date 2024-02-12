import styled from "styled-components";
import { Avatar } from "@mui/material";

export const StyledAvatar = styled(Avatar)`
  background-color: ${(props) => props.theme["red-500"]};
`;

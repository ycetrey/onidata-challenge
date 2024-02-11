import { Box, Typography } from "@mui/material";
import { defaultTheme } from "../styles/themes/default.ts";

export function Page404() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundColor: defaultTheme.primary,
      }}
    >
      <Typography variant="h5" style={{ color: "white", textAlign: "center" }}>
        Página não encontrada
        <br />
        404
      </Typography>
    </Box>
  );
}

import { TableList } from "../../../components/TableList";
import { GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Product, getProducts } from "../../../services/api.ts";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading/Loading.tsx";
import { Box, Typography } from "@mui/material";

export const PageDashProductList = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Product[]>([]);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "nome",
      headerName: "Nome",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "preco",
      headerName: "Preço",
      editable: false,
      sortable: false,
      minWidth: 150,
    },
    {
      field: "qt_estoque",
      headerName: "Qtd. Estoque",
      type: "number",
      editable: false,
      sortable: false,
      minWidth: 150,
    },
    {
      field: "actions",
      headerName: "Ações",
      type: "number",
      minWidth: 150,
      editable: false,
      renderCell: (params) => {
        const onClick = () => {
          const currentRow = params.row;
          return navigate(`/product/${currentRow.id}`);
        };

        return (
          <Stack direction="row" spacing={2}>
            <Button
              variant="outlined"
              color="warning"
              size="small"
              onClick={onClick}
            >
              Editar
            </Button>
          </Stack>
        );
      },
    },
  ];

  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getProducts();
      setRows(response);
    }
    fetchMyAPI();
  }, []);

  if (!rows.length) {
    return <Loading />;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component={"h2"} variant={"h6"}>
          Listagem de produtos
        </Typography>
        <Button>adicionar produto</Button>
      </Box>
      <TableList columns={columns} rows={rows} />
    </>
  );
};

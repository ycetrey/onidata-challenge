import { TableList } from "../../../components/TableList";
import { GridColDef } from "@mui/x-data-grid";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useNavigate } from "react-router-dom";
import { Product, getProducts } from "../../../services/api.ts";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading";
import { Box, TextField, Typography } from "@mui/material";
import { formatPrice } from "../../../helpers/price-helper.ts";
import { Image } from "../../../components/Image";

export const PageDashProductList = () => {
  const navigate = useNavigate();
  const [rows, setRows] = useState<Product[]>([]);
  const [search, setSearch] = useState("");

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "avatar",
      headerName: "Imagem",
      sortable: false,
      minWidth: 150,
      renderCell: (params) => {
        return (
          <Image src={`${params.row.avatar}`} alt={`${params.row.nome}`} />
        );
      },
    },
    {
      field: "nome",
      headerName: "Nome",
      editable: false,
      sortable: false,
      flex: 1,
    },
    {
      field: "marca",
      headerName: "Marca",
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
      field: "qt_vendas",
      headerName: "Qtd. Vendas",
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
      const response = await getProducts().then((data) =>
        data
          .map((row) => {
            return {
              ...row,
              preco: formatPrice(row.preco),
              produto: null,
            };
          })
          .filter((row) => row.id != "126"),
      );
      // foi feito o filter pois a api esta retornando mais de um produto com o mesmo ID no caso o 126
      // o produto estava gerando erros de renderização no componente
      setRows(response);
    }
    fetchMyAPI();
  }, []);

  const filteredProducts =
    search.length > 0 ? rows.filter((row) => row.nome.includes(search)) : rows;
  if (!rows.length) {
    return <Loading />;
  }

  return (
    <>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography component={"h2"} variant={"h6"}>
          Listagem de produtos
        </Typography>
        <TextField
          name="search"
          type="text"
          placeholder="Buscar por nome..."
          onChange={(e) => setSearch(e.target.value)}
          value={search}
          sx={{ width: "40vw", alignItems: "right" }}
        />
        <Button>adicionar produto</Button>
      </Box>
      <TableList columns={columns} rows={filteredProducts} />
    </>
  );
};

import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { deleteProduct, getProductId } from "../../../services/api.ts";
import { useEffect, useState } from "react";
import { Loading } from "../../../components/Loading";
import { formatPrice } from "../../../helpers/price-helper.ts";
import { Image } from "../../../components/Image";
import { formatDateBR } from "../../../helpers/date-helper.ts";

export function PageDashProductView() {
  const params = useParams();
  const navigate = useNavigate();
  const [produto, setProduto] = useState();
  // const handleDeleteProductFile = (event: Event) => {};
  useEffect(() => {
    async function fetchMyAPI() {
      const response = await getProductId(params.id as string).then((data) => {
        return {
          ...data,
          preco: formatPrice(data.preco),
          createdAt: formatDateBR(data.createdAt),
        };
      });
      setProduto(response as never);
    }
    fetchMyAPI();
  }, [setProduto]);
  if (!produto) {
    return <Loading />;
  }
  return (
    <>
      <Box>
        <Box
          sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mb: 5 }}
        >
          <LoadingButton
            variant="contained"
            color={"warning"}
            onClick={() => navigate(`/product/edit/${produto["id"]}`)}
          >
            editar produto
          </LoadingButton>
          <LoadingButton
            variant="contained"
            color={"error"}
            onClick={() => deleteProduct(produto["id"])}
          >
            deletar produto
          </LoadingButton>
        </Box>
        <Grid container spacing={2} sx={{ width: 600 }}>
          <Grid item xs={12}>
            <Image src={produto["avatar"]} alt={"Alt"} width={200} />
            <Typography component="h1" variant="body1" sx={{ marginTop: 2 }}>
              <strong>ID:</strong> {produto["id"]} <br />
              <strong>Nome:</strong> {produto["nome"]} <br />
              <strong>Marca:</strong> {produto["marca"]} <br />
              <strong>Preço:</strong> {produto["preco"]} <br />
              <strong>Quantidade de vendas:</strong> {produto["qt_vendas"]}
              <br />
              <strong>Quantidade em Estoque:</strong> {produto["qt_estoque"]}
              <br />
              <strong>Criado em:</strong> {produto["createdAt"]}
            </Typography>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

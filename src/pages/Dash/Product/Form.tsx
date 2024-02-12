import { useNavigate, useParams } from "react-router-dom";
import { Grid, Box, Typography, TextField } from "@mui/material";
import { number, object, string, TypeOf, z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { empty } from "../../../helpers";
import { Input } from "../../../components/Inputs/TextInput/Input.tsx";
import CurrencyInput from "react-currency-input-field";
import { getProductId, setProductData } from "../../../services/api.ts";
import { useEffect, useState } from "react";
import { Image } from "../../../components/Image";
import { LoadingButton } from "@mui/lab";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

const ProductSchema = object({
  id: z.any(),
  nome: string().min(1, "Nome é obrigatório"),
  avatar: z
    .any()
    .refine((files) => files?.length >= 1, { message: "Image is required." })
    .refine((files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type), {
      message: ".jpg, .jpeg, .png and .webp files are accepted.",
    })
    .refine((files) => files?.[0]?.size <= MAX_FILE_SIZE, {
      message: `Max file size is 5MB.`,
    }),
  preco: string().min(5, "Preço é obrigatório"),
  qt_estoque: number().min(
    1,
    "Quantidade de vendas tem que ser maior que zero",
  ),
  qt_vendas: number().min(1, "Quantidade de vendas tem que ser maior que zero"),
  marca: string().min(1, "Marca é obrigatório"),
});

type IProduct = TypeOf<typeof ProductSchema>;

export function PageDashProductForm() {
  const navigate = useNavigate();
  const params = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
  } = useForm<IProduct>({
    resolver: zodResolver(ProductSchema),
    defaultValues: async () => {
      if (params.id) {
        return getProductId(params?.id as string).then((data) => {
          return {
            ...data,
            preco: data.preco,
          };
        });
      } else {
        return {
          id: "",
          nome: "",
          avatar: "",
          preco: "",
          qt_estoque: 0,
          qt_vendas: 0,
          marca: "",
        } as IProduct;
      }
    },
  });

  const { avatar } = getValues();

  const onSubmitHandler: SubmitHandler<IProduct> = async (values: IProduct) => {
    const sucesso = await setProductData(values);
    if (sucesso.id) {
      window.alert("Produto criado com sucesso");
      navigate("/products");
    }
  };

  const [preview, setPreview] = useState("");

  const handleUploadedFile = (event: never) => {
    const target = event?.["target"] as HTMLInputElement;
    const file = target?.files?.[0];
    if (file) {
      const urlImage = URL.createObjectURL(file);
      setPreview(urlImage);
    }
  };

  useEffect(() => {
    reset({
      id: "",
      nome: "",
      avatar: "",
      preco: "",
      qt_estoque: 0,
      qt_vendas: 0,
      marca: "",
    });
  }, [reset, params]);

  return (
    <>
      <Box component="form" onSubmit={handleSubmit(onSubmitHandler)}>
        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 5 }}>
          <Typography component={"h2"} variant={"h6"}>
            {params.id && `Editando produto - ${params.id}`}
            {!params.id && `Adicionar produto`}
          </Typography>
          <LoadingButton type="submit" variant="contained">
            salvar produto
          </LoadingButton>
        </Box>
        <Grid container spacing={2} sx={{ width: 600 }}>
          {avatar && (
            <Grid item xs={12}>
              {params.id && <Image src={avatar} alt={"Alt"} width={100} />}
              {!params.id && <Image src={preview} alt={"Alt"} width={100} />}
            </Grid>
          )}
          <Grid item xs={12}>
            <input type="hidden" {...register("id")} />
            <Input
              margin="none"
              fullWidth
              id="nome"
              label="Nome"
              focused={true}
              {...register("nome")}
              error={!empty(errors.nome)}
              errormessage={errors.nome?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              id="preco"
              prefix="R$ "
              focused={true}
              placeholder="Preço"
              label="Preço"
              InputProps={{
                inputComponent: CurrencyInput as never,
                inputProps: {
                  fixedDecimalLength: 2,
                  prefix: "R$ ",
                  component: Input,
                },
              }}
              {...register("preco")}
            />
            <br />
            <small>a mascara será aplicada ao retirar o foco do campo</small>
          </Grid>
          <Grid item xs={12}>
            <Input
              margin="none"
              fullWidth
              type="number"
              focused={true}
              id="qt_estoque"
              label="Quantidade em estoque"
              {...register("qt_estoque", { valueAsNumber: true })}
              error={!empty(errors.qt_estoque)}
              errormessage={errors.qt_estoque?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              margin="none"
              fullWidth
              type="number"
              focused={true}
              id="qt_vendas"
              label="Quantidade de vendas"
              {...register("qt_vendas", { valueAsNumber: true })}
              error={!empty(errors.qt_vendas)}
              errormessage={errors.qt_vendas?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <Input
              margin="none"
              fullWidth
              id="marca"
              label="Marca"
              focused={true}
              autoComplete="marca"
              {...register("marca")}
              error={!empty(errors.marca)}
              errormessage={errors.marca?.message}
            />
          </Grid>
          <Grid item xs={12}>
            <input
              type="file"
              {...register("avatar")}
              onChange={handleUploadedFile}
            />
            {!empty(errors?.avatar) && (
              <Typography
                component="div"
                variant="subtitle2"
                align="right"
                sx={{ color: "red", marginTop: "10px" }}
              >
                {errors?.avatar?.message as string}
              </Typography>
            )}
          </Grid>
          {/*
          <Grid item xs={12}>
            <ImageUploader
              images={images}
              setimages={setImages}
              {...register("avatar")}
            />
          </Grid>
          */}
        </Grid>
      </Box>
    </>
  );
}

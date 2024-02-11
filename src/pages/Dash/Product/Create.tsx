import { Link, Grid, Box, Typography, Container } from "@mui/material";
import { object, string, TypeOf } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../../hooks/useAuth.ts";
import { LoadingButton } from "@mui/lab";
import { empty } from "../../../helpers";
import { Input } from "../../../components/Inputs/TextInput/Input.tsx";
import { Navigate } from "react-router-dom";

const loginSchema = object({
  usuario: string().min(1, "Usuário é obrigatório"),
  senha: string()
    .min(1, "Senha é obrigatório")
    .min(4, "Senha tem que ter mais de 4 caracteres")
    .max(32, "Senha tem que ter menos de 32 caracteres"),
});

type ILogin = TypeOf<typeof loginSchema>;

export function CreateProduct() {
  const defaultValues: ILogin = {
    usuario: "",
    senha: "",
  };

  const { auth, error: authError, signIn } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ILogin>({
    resolver: zodResolver(loginSchema),
    defaultValues,
  });
  if (auth.usuario) return <Navigate to="/product" />;

  const onSubmitHandler: SubmitHandler<ILogin> = async (values: ILogin) => {
    await signIn(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingTop: "50%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          sx={{ mt: 2, width: 400 }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Input
            margin="normal"
            fullWidth
            id="usuario"
            label="Usuário"
            autoComplete="usuario"
            autoFocus
            {...register("usuario")}
            error={!empty(errors.usuario)}
            errormessage={errors.usuario?.message}
          />
          <Input
            margin="normal"
            fullWidth
            label="Senha"
            type="password"
            id="senha"
            {...register("senha")}
            error={!empty(errors.senha)}
            errormessage={errors.senha?.message}
          />
          {!empty(authError.error) && (
            <Typography
              component="p"
              variant="subtitle2"
              align="center"
              sx={{ color: "red", marginTop: "10px" }}
            >
              {authError?.error as string}
            </Typography>
          )}
          <LoadingButton
            type="submit"
            variant="contained"
            sx={{
              m: 2,
              width: "100%",
              marginInline: "auto",
            }}
          >
            Login
          </LoadingButton>
          <Grid container sx={{ justifyContent: "center" }}>
            <Grid item>
              <Link href="#" variant="body2">
                {"Não tem uma conta? cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

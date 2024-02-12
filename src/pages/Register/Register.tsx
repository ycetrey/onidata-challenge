import {
  Box,
  Typography,
  Container,
  TextField,
  CircularProgress,
} from "@mui/material";
import { object, string, TypeOf } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "../../hooks/useAuth.ts";
import { LoadingButton } from "@mui/lab";
import { empty } from "../../helpers";
import { Input } from "../../components/Inputs/TextInput/Input.tsx";
import { Navigate } from "react-router-dom";
import { IMaskInput } from "react-imask";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/pt-br.js";
import { ChangeEvent, forwardRef, useState } from "react";
import CheckIcon from "@mui/icons-material/Check";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { buscarCepJson } from "../../services/api.ts";
import { validarCPF } from "../../helpers/cpf-helper.ts";
const registerSchema = object({
  senha: string()
    .min(1, "Senha é obrigatório")
    .min(4, "Senha tem que ter mais de 4 caracteres")
    .max(32, "Senha tem que ter menos de 32 caracteres"),
  nome: string().min(2, "Nome é obrigatório"),
  sobrenome: string().min(1, "Sobrenome é obrigatório"),
  email: string().min(1, "Email é obrigatório"),
  sexo: string().min(2, "Sexo é obrigatório"),
  cidade: string().min(1, "Cidade é obrigatória"),
  estado: string().min(1, "Estado é obrigatório"),
  logradouro: string().min(1, "Logradouro é obrigatório"),
  bairro: string().min(1, "Bairro é obrigatório"),
  complemento: string().min(1, "Complemento é obrigatório"),
  dataNascimento: string(),
  cpf: string(),
  cep: string(),
});

type IRegister = TypeOf<typeof registerSchema>;

interface CustomProps {
  name: string;
  onChange: (target: object) => void;
  mask: string;
}

const CpfMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    const [loading, setLoading] = useState(false);
    return (
      <>
        <IMaskInput
          {...other}
          mask="000.000.000-00"
          definitions={{
            "#": /[1-9]/,
          }}
          inputRef={ref}
          onAccept={(value: any) => {
            const isValidCPF = value?.length == 14 ? validarCPF(value) : false;
            setLoading(isValidCPF);
            if (value?.length == 14 && !isValidCPF) {
              alert("CPF Invalido");
              value = "";
            }
            return onChange({ target: { name: props.name, value } });
          }}
          overwrite
        />
        {loading && <CheckIcon />}
        {!loading && <ErrorOutlineIcon color={"error"} />}
      </>
    );
  },
);

const CepMaskCustom = forwardRef<HTMLInputElement, CustomProps>(
  function TextMaskCustom(props, ref) {
    const { onChange, ...other } = props;
    const [loading, setLoading] = useState(false);
    return (
      <>
        <IMaskInput
          {...other}
          mask="00000-000"
          definitions={{
            "#": /[1-9]/,
          }}
          inputRef={ref}
          onAccept={(value: any) => {
            setLoading(value?.length == 9 ? true : false);
            return onChange({ target: { name: props.name, value } });
          }}
          overwrite
        />
        {loading && <CircularProgress />}
      </>
    );
  },
);

export function PageRegister() {
  const defaultValues: IRegister = {
    nome: "",
    sobrenome: "",
    cpf: "",
    cep: "",
    email: "",
    senha: "",
    sexo: "",
    dataNascimento: "",
    cidade: "",
    estado: "",
    logradouro: "",
    bairro: "",
    complemento: "",
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    reset,
  } = useForm<IRegister>({
    resolver: zodResolver(registerSchema),
    defaultValues,
  });

  const [values, setValues] = useState({});
  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
    if (event.target.name == "cep") {
      if (event.target.value.length == 9) {
        buscarCep(event.target.value);
      }
    }
  };

  const buscarCep = async (cep: string) => {
    async function fetchMyAPI() {
      if (cep) {
        const response = await buscarCepJson(cep);
        setValue("bairro", response.bairro);
        setValue("cidade", response.localidade);
        setValue("estado", response.uf);
        setValue("logradouro", response.logradouro);
        setValue("complemento", response.complemento);
      }
    }
    fetchMyAPI();
  };
  const { auth, error: authError, signUp } = useAuth();
  if (auth.usuario) return <Navigate to="/product" />;

  const onSubmitHandler = async () => {
    const values = getValues();
    await signUp(values);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          paddingY: "20px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Cadastre-se
        </Typography>
        <Box
          component="form"
          sx={{ mt: 2, width: 400 }}
          onSubmit={handleSubmit(onSubmitHandler)}
        >
          <Input
            margin="normal"
            fullWidth
            id="nome"
            label="Nome"
            autoComplete="nome"
            focused={true}
            {...register("nome")}
            error={!empty(errors.nome)}
            errormessage={errors.nome?.message}
          />
          <Input
            margin="normal"
            fullWidth
            label="Sobrenome"
            id="sobrenome"
            focused={true}
            {...register("sobrenome")}
            error={!empty(errors.sobrenome)}
            errormessage={errors.sobrenome?.message}
          />
          <TextField
            margin="normal"
            fullWidth
            focused={true}
            label={"CPF"}
            id="cpf"
            {...register("cpf")}
            onChange={handleChange}
            InputProps={{
              inputComponent: CpfMaskCustom as never,
            }}
          />
          <Input
            margin="normal"
            fullWidth
            label="Email"
            id="email"
            focused={true}
            {...register("email")}
            error={!empty(errors.email)}
            errormessage={errors.email?.message}
          />
          <Input
            margin="normal"
            fullWidth
            label="Senha"
            id="senha"
            focused={true}
            type={"password"}
            {...register("senha")}
            error={!empty(errors.senha)}
            errormessage={errors.senha?.message}
          />
          <Input
            margin="normal"
            fullWidth
            label="Sexo"
            id="sexo"
            focused={true}
            {...register("sexo")}
            error={!empty(errors.sexo)}
            errormessage={errors.sexo?.message}
          />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <DemoContainer components={["DatePicker"]}>
              <DatePicker
                label="Data Nascimento"
                sx={{ overflowX: "hidden", width: "100%" }}
              />
            </DemoContainer>
          </LocalizationProvider>
          <TextField
            margin="normal"
            fullWidth
            {...register("cep")}
            onChange={handleChange}
            focused={true}
            label={"Cep"}
            id="cep"
            InputProps={{
              inputComponent: CepMaskCustom as never,
            }}
          />
          <Input
            margin="normal"
            fullWidth
            label="Cidade"
            id="cidade"
            focused={true}
            {...register("cidade")}
            error={!empty(errors.cidade)}
            errormessage={errors.cidade?.message}
          />
          <Input
            margin="normal"
            fullWidth
            label="Estado"
            focused={true}
            id="estado"
            {...register("estado")}
            error={!empty(errors.estado)}
            errormessage={errors.estado?.message}
          />
          <Input
            margin="normal"
            fullWidth
            label="Logradouro"
            id="logradouro"
            focused={true}
            {...register("logradouro")}
            error={!empty(errors.logradouro)}
            errormessage={errors.logradouro?.message}
          />
          <Input
            margin="normal"
            fullWidth
            label="Bairro"
            id="bairro"
            focused={true}
            {...register("bairro")}
            error={!empty(errors.bairro)}
            errormessage={errors.bairro?.message}
          />
          <Input
            margin="normal"
            fullWidth
            label="Complemento"
            id="complemento"
            focused={true}
            {...register("complemento")}
            error={!empty(errors.complemento)}
            errormessage={errors.complemento?.message}
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
            Criar conta
          </LoadingButton>
          <LoadingButton
            variant="contained"
            sx={{
              m: 2,
              width: "100%",
              marginInline: "auto",
            }}
            onClick={() => reset()}
          >
            limpar form
          </LoadingButton>
        </Box>
      </Box>
    </Container>
  );
}

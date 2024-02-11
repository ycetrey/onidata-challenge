import { useCallback, useState } from "react";
import { empty } from "../helpers";
import { api } from "../configs/axios.ts";
import axios from "axios";
export interface ErrorProps {
  error?: string | unknown;
  usuario?: boolean;
  senha?: boolean;
}

interface AuthState {
  token: string;
  usuario: string;
}

interface signInProps {
  usuario: string;
  senha: string;
}

export const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState<ErrorProps>({
    error: "",
    usuario: false,
    senha: false,
  });

  const [auth, setAuth] = useState<AuthState>(() => {
    const storagedUser = localStorage.getItem("@RAuth:user") || "";
    const storagedToken = localStorage.getItem("@RAuth:token") || "";
    if (!empty(storagedUser) && !empty(storagedToken)) {
      return {
        token: storagedToken,
        usuario: storagedUser,
      };
    }
    return {} as AuthState;
  });

  const signIn = useCallback(
    async (values: signInProps) => {
      let response;
      let mensagem = undefined;
      setError({
        error: "Aguarde...",
      });
      try {
        response = await api.get(
          `https://6256fc506ea7037005434e84.mockapi.io/api/v1/user?search=` +
            values.usuario,
        );
        if (response.data.length === 1) {
          response.data = response.data[0];
          if (values.senha !== response.data.senha) {
            throw new Error("Usuário ou senha invalidos.");
          }
        }
        if (response.data.length > 1) {
          throw new Error("Revise os dados e tente novamente");
        }
      } catch (e) {
        mensagem = "";
        if (axios.isAxiosError(e)) {
          switch (e?.response?.status) {
            case 404:
              mensagem = "Nenhum usuário encontrado";
              break;
            default:
              mensagem = "Revise os dados e tente novamente";
          }
        } else {
          mensagem = (e as object).toString();
        }
        setError({
          error: mensagem,
        });
        return setAuth({ token: "", usuario: "" });
      }
      const { token, nome: usuario } = response.data;
      setAuth({ token, usuario });
      localStorage.setItem("@RAuth:user", usuario);
      localStorage.setItem("@RAuth:token", token);
      window.location.href = "/product";
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [setError, user, setAuth],
  );

  const signOut = useCallback(() => {
    localStorage.removeItem("@RAuth:user");
    localStorage.removeItem("@RAuth:token");
    setUser(null);

    document.location.reload();
  }, []);
  return { auth, error, signIn, signOut };
};

import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth.ts";

export function PageRegister() {
  const { auth } = useAuth();
  if (auth.usuario) return <Navigate to="/product" />;
  return <div>Register Page</div>;
}

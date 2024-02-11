import { Routes, Route } from "react-router-dom";

import { PageLogin } from "../pages/Login";
import { PageRegister } from "../pages/Register";
import { DefaultLayout } from "../components/Layouts/Default";
import { DashLayout } from "../components/Layouts/Dash";
import { PrivateRoute } from "./PrivateRoute.tsx";
import { PageDashProductList } from "../pages/Dash/Product";
import { PageDashProductEdit } from "../pages/Dash/Product/Edit.tsx";
import { Page404 } from "../pages/Page404.tsx";

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route path="" element={<PageLogin />} />
        <Route path="login" element={<PageLogin />} />
        <Route path="register" element={<PageRegister />} />
        <Route path="/product" element={<DashLayout />}>
          <Route
            path=""
            element={<PrivateRoute Component={PageDashProductList} />}
          />
          <Route
            path=":id"
            element={<PrivateRoute Component={PageDashProductEdit} />}
          />
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

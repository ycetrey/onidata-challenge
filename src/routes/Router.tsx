import { Routes, Route } from "react-router-dom";

import { PageLogin } from "../pages/Login";
import { PageRegister } from "../pages/Register";
import { DefaultLayout } from "../components/Layouts/Default";
import { DashLayout } from "../components/Layouts/Dash";
import { PrivateRoute } from "./PrivateRoute.tsx";
import {
  PageDashProductForm,
  PageDashProductList,
} from "../pages/Dash/Product";
import { Page404 } from "../pages/Page404.tsx";
import { PageDashProductView } from "../pages/Dash/Product/View.tsx";

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
            path="add"
            element={<PrivateRoute Component={PageDashProductForm} />}
          />
          <Route
            path=":id"
            element={<PrivateRoute Component={PageDashProductView} />}
          />
          <Route
            path="edit/:id"
            element={<PrivateRoute Component={PageDashProductForm} />}
          />
        </Route>
      </Route>
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}

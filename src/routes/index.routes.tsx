import { createHashRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import Loader from "../components/Loader";
import ErrorPage from "../pages/errors/ErrorPage";

const routes = createRoutesFromElements(
  <Route errorElement={<ErrorPage />}>
    <Route
      path="/"
      lazy={async () => {
        const { IndexPage } = await import('../pages/index.page');
        return { Component: IndexPage };
      }}
    />
    <Route path="home" element={<Navigate to="/" />} />
    <Route
      path="*"
      lazy={async () => {
        const { FourByFour } = await import('../pages/errors/FourByFour');
        return { Component: FourByFour };
      }}
    />
  </Route>
);
const router = createHashRouter(routes);
export const Routes = () => (
  <RouterProvider
    router={router}
    fallbackElement={
      <Suspense>
        <Loader />
      </Suspense>
    }
  />
)
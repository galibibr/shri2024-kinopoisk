import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { FilmPage } from "./pages/filmpage/component";
import { Home } from "./pages/home/component";
import { Layout } from "./components/layout/component";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <h1>Server dosn't response!</h1>,
      },
      {
        path: "movie/:id",
        element: <FilmPage />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

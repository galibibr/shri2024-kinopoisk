import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Film } from "./pages/film/component";
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
      },
      {
        path: ":id",
        element: <Film />,
      },
    ],
  },
]);

export const App = () => {
  return <RouterProvider router={router} />;
};

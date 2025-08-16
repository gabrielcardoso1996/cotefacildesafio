import { createBrowserRouter } from "react-router-dom";
import { TodoList } from "../pages/toDoList";
import { SearchImage } from "../pages/searchImage";
import { ImageDetail } from "../pages/searchImage/components/ImageDetail";
import App from "../App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <TodoList />,
      },
      {
        path: "gallery",
        element: <SearchImage />,
      },
      {
        path: "image/:id",
        element: <ImageDetail />,
      },
    ],
  },
]);

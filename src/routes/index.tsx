import { createBrowserRouter } from "react-router-dom";
import { TodoList } from "../page/toDoList";
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
      // Aqui você pode adicionar mais rotas no futuro
      // {
      //   path: "about",
      //   element: <About />,
      // },
    ],
  },
]);

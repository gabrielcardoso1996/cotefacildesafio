import "./global.css";
import style from "./App.module.css";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";
import { TaskProvider } from "./contexts/TaskContext";

function App() {
  return (
    <TaskProvider>
      <div>
        <Header />
        <div className={style.wrapper}>
          <main>
            <Outlet />
          </main>
        </div>
      </div>
    </TaskProvider>
  );
}

export default App;

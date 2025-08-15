import "./global.css";
import style from "./App.module.css";
import { Header } from "./components/Header";
import { Outlet } from "react-router-dom";

function App() {
  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default App;

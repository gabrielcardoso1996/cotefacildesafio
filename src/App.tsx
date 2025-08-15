import { Header } from "./components/Header";
import "./global.css";
import  style from "./App.module.css";
import { TodoList } from "./components/TodoList";


function App() {


  return (
    <div>
      <Header />
      <div className={style.wrapper}>
        <main>
          <TodoList />
        </main>
      </div>
    </div>
  );
}

export default App;

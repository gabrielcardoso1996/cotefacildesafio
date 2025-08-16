import { CountHeader } from "./components/CountHeader";
import styles from "./TodoList.module.css";
import clipBoard from "../../assets/clipboard.svg";
import { Card } from "./components/Card";
import { SubmitAction } from "../../components/SubmitAction";
import { useState, useEffect } from "react";

interface ITask {
  id: number;
  task: string;
  completed: boolean;
}

const STORAGE_KEY = "todo-tasks";

export function TodoList() {
  const [tasks, setTasks] = useState<ITask[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      try {
        const parsedTasks = JSON.parse(savedTasks);
        setTasks(parsedTasks);
      } catch (error) {
        console.error("Erro ao carregar tarefas do localStorage:", error);
      }
    }
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    }
  }, [tasks, isInitialized]);

  const completedTasks = tasks.filter((task) => task.completed).length;

  const addTask = (task: string) => {
    const newTask = {
      id: Math.random(),
      task,
      completed: false,
    };
    setTasks([...tasks, newTask]);
  };

  const removeTask = (id: number) => {
    const updatedTasks = tasks.reduce((acc, task) => {
      if (task.id !== id) {
        acc.push(task);
      }
      return acc;
    }, [] as ITask[]);
    setTasks(updatedTasks);
  };

  const completeTask = (id: number) => {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    updatedTasks.sort((a, b) => {
      if (a.completed && !b.completed) {
        return 1;
      }
      if (!a.completed && b.completed) {
        return -1;
      }
      return 0;
    });
    setTasks(updatedTasks);
  };

  return (
    <>
      <SubmitAction add={addTask} />
      <CountHeader totalTasks={tasks.length} completedTasks={completedTasks} />
      <div className={styles.wrapper}>
        {tasks.length === 0 && (
          <div className={styles.empty}>
            <img src={clipBoard} alt="Clipboard" />
            <h5>Você ainda não tem tarefas cadastradas</h5>
            <label>Crie tarefas e organize seus itens a fazer</label>
          </div>
        )}
        {tasks.map((task) => (
          <Card
            key={task.id}
            task={task}
            removeTask={removeTask}
            completeTask={completeTask}
          />
        ))}
      </div>
    </>
  );
}

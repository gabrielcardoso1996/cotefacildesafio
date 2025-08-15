import { useState, FormEvent } from "react";
import styles from "./SubmitAction.module.css";
import { PlusCircle } from "@phosphor-icons/react";

interface ISubmitActionProps {
  addTask: (task: string) => void;
}

export function SubmitAction({ addTask }: ISubmitActionProps) {
  const [description, setDescription] = useState("");

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (description.trim() === "") {
      return;
    }
    addTask(description);
    setDescription("");
  }

  return (
    <form onSubmit={handleAddTask} className={styles.wrapper}>
      <input
        className={styles.input}
        type="text"
        placeholder="Adicione uma nova tarefa"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button type="submit" className={styles.button}>
        Criar
        <PlusCircle size={20} />
      </button>
    </form>
  );
}

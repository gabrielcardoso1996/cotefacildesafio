import styles from "./Card.module.css";
import { Trash } from "@phosphor-icons/react";

interface ICard {
  id: number;
  task: string;
  completed: boolean;
}
interface ICardProps {
  task: ICard;
  removeTask: (id: number) => void;
  completeTask: (id: number) => void;
}
export function Card({ task, removeTask, completeTask }: ICardProps) {
  const handleRemoveTask = (id: number) => {
    removeTask(id);
  };
  return (
    <div className={styles.wrapper}>
      <input
        type="checkbox"
        className={styles.checkbox}
        checked={task.completed}
        onChange={() => completeTask(task.id)}
      />
      <label className={styles.label}>{task.task}</label>
      <button
        type="button"
        className={styles.button}
        onClick={() => handleRemoveTask(task.id)}
      >
        <Trash size={20} />
      </button>
    </div>
  );
}

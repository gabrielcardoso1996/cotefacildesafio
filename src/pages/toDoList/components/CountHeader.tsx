import styles from "./CountHeader.module.css";

interface ICountHeaderProps {
  totalTasks: number;
  completedTasks: number;
}

export function CountHeader({ totalTasks, completedTasks }: ICountHeaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.count}>
        <h5 className={styles.toDo}>Tarefas Criadas</h5>
        <div>
          <span>{totalTasks}</span>
        </div>
      </div>

      <div className={styles.count}>
        <h5 className={styles.finished}>Concluídas</h5>
        <div>
          <span>{`${completedTasks} de ${totalTasks}`}</span>
        </div>
      </div>
    </div>
  );
}

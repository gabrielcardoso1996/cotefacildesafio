import { Plus } from "@phosphor-icons/react";
import styles from "./DashboardHeader.module.css";

interface DashboardHeaderProps {
  onAddTask: () => void;
}

export function DashboardHeader({ onAddTask }: DashboardHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.headerContent}>
        <div className={styles.titleSection}>
          <h1>Dashboard de Tarefas</h1>
          <p>Gerencie suas tarefas com um sistema visual intuitivo</p>
        </div>
        
        <button onClick={onAddTask} className={styles.addTaskButton}>
          <Plus size={20} />
          Nova Tarefa
        </button>
      </div>
    </div>
  );
}

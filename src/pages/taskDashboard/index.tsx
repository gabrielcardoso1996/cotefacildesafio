import { useState, useEffect } from "react";
import { TaskColumn } from "./components/TaskColumn";
import { useTaskContext } from "../../contexts/TaskContext";
import { TaskStatus } from "../../contexts/TaskContext";
import styles from "./TaskDashboard.module.css";
import { DashboardHeader } from "./components/DashboardHeader";
import { TaskStats } from "./components/TaskStats";
import { AddTaskModal } from "./components/AddTaskModal";

export function TaskDashboard() {
  const { getTaskStats, getTasksByStatus } = useTaskContext();
  const [isAddTaskOpen, setIsAddTaskOpen] = useState(false);
  const [stats, setStats] = useState({ pending: 0, inProgress: 0, completed: 0 });

  useEffect(() => {
    setStats(getTaskStats());
  }, [getTaskStats]);

  const columns: { id: TaskStatus; title: string; color: string }[] = [
    { id: 'pending', title: 'PENDENTE', color: 'var(--yellow-500)' },
    { id: 'in-progress', title: 'EM PROGRESSO', color: 'var(--blue-500)' },
    { id: 'completed', title: 'CONCLUÍDA', color: 'var(--green-500)' },
  ];

  return (
    <div className={styles.container}>
      <DashboardHeader onAddTask={() => setIsAddTaskOpen(true)} />
      
      <TaskStats stats={stats} />
      
      <div className={styles.board}>
        {columns.map((column) => (
          <TaskColumn
            key={column.id}
            status={column.id}
            title={column.title}
            color={column.color}
            tasks={getTasksByStatus(column.id)}
          />
        ))}
      </div>

      <AddTaskModal
        open={isAddTaskOpen}
        onOpenChange={setIsAddTaskOpen}
      />
    </div>
  );
}

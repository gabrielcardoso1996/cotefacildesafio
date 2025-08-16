import { DragEvent, useRef } from "react";
import { useTaskContext, TaskStatus } from "../../../contexts/TaskContext";
import styles from "./TaskColumn.module.css";
import { TaskCard } from "./TaskCard";

interface TaskColumnProps {
  status: TaskStatus;
  title: string;
  color: string;
  tasks: any[];
}

export function TaskColumn({ status, title, color, tasks }: TaskColumnProps) {
  const { setDraggedTask, moveTask } = useTaskContext();
  const columnRef = useRef<HTMLDivElement>(null);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    if (columnRef.current) {
      columnRef.current.style.backgroundColor = 'var(--gray-600)';
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    if (columnRef.current) {
      columnRef.current.style.backgroundColor = 'var(--gray-700)';
    }
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    if (columnRef.current) {
      columnRef.current.style.backgroundColor = 'var(--gray-700)';
    }

    const draggedTaskId = e.dataTransfer.getData('taskId');
    if (draggedTaskId) {
      moveTask(draggedTaskId, status);
      setDraggedTask(null);
    }
  };

  return (
    <div
      ref={columnRef}
      className={styles.column}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className={styles.columnHeader}>
        <h3 className={styles.columnTitle} style={{ color }}>
          {title}
        </h3>
        <span className={styles.taskCount}>{tasks.length}</span>
      </div>
      
      <div className={styles.columnContent}>
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
        
        {tasks.length === 0 && (
          <div className={styles.emptyColumn}>
            <p>Nenhuma tarefa</p>
          </div>
        )}
      </div>
    </div>
  );
}

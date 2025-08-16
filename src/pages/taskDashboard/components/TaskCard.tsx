import { DragEvent, useState } from "react";
import { Trash, PencilSimpleLine, Calendar, User } from "@phosphor-icons/react";
import { useTaskContext, ITask, TaskPriority } from "../../../contexts/TaskContext";
import styles from "./TaskCard.module.css";
import { EditTaskModal } from "./EditTaskModal";

interface TaskCardProps {
  task: ITask;
}

export function TaskCard({ task }: TaskCardProps) {
  const { deleteTask, setDraggedTask } = useTaskContext();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDragStart = (e: DragEvent) => {
    setDraggedTask(task);
    e.dataTransfer.setData('taskId', task.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
  };

  const getPriorityColor = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'var(--red-500)';
      case 'medium':
        return 'var(--yellow-500)';
      case 'low':
        return 'var(--green-500)';
      default:
        return 'var(--gray-500)';
    }
  };

  const getPriorityLabel = (priority: TaskPriority) => {
    switch (priority) {
      case 'high':
        return 'Alta';
      case 'medium':
        return 'Média';
      case 'low':
        return 'Baixa';
      default:
        return 'N/A';
    }
  };

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('pt-BR');
  };

  return (
    <>
      <div
        className={styles.card}
        draggable
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className={styles.cardHeader}>
          <div className={styles.priority}>
            <span
              className={styles.priorityDot}
              style={{ backgroundColor: getPriorityColor(task.priority) }}
            />
            <span className={styles.priorityLabel}>
              {getPriorityLabel(task.priority)}
            </span>
          </div>
          
          <div className={styles.cardActions}>
            <button
              onClick={() => setIsEditModalOpen(true)}
              className={styles.actionButton}
              title="Editar tarefa"
            >
              <PencilSimpleLine size={16} />
            </button>
            <button
              onClick={() => deleteTask(task.id)}
              className={`${styles.actionButton} ${styles.deleteButton}`}
              title="Excluir tarefa"
            >
              <Trash size={16} />
            </button>
          </div>
        </div>

        <div className={styles.cardContent}>
          <h4 className={styles.taskTitle}>{task.title}</h4>
          {task.description && (
            <p className={styles.taskDescription}>{task.description}</p>
          )}
        </div>

        <div className={styles.cardFooter}>
          {task.assignee && (
            <div className={styles.assignee}>
              <User size={14} />
              <span>{task.assignee}</span>
            </div>
          )}
          
          {task.dueDate && (
            <div className={styles.dueDate}>
              <Calendar size={14} />
              <span>{formatDate(task.dueDate)}</span>
            </div>
          )}
          
          <div className={styles.createdAt}>
            <span>Criada em {formatDate(task.createdAt)}</span>
          </div>
        </div>
      </div>

      <EditTaskModal
        task={task}
        open={isEditModalOpen}
        onOpenChange={setIsEditModalOpen}
      />
    </>
  );
}

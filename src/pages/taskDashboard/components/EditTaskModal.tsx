import { useState, useEffect, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { X, Check } from "@phosphor-icons/react";
import { useTaskContext, ITask, TaskStatus, TaskPriority } from "../../../contexts/TaskContext";
import styles from "./EditTaskModal.module.css";

interface EditTaskModalProps {
  task: ITask;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditTaskModal({ task, open, onOpenChange }: EditTaskModalProps) {
  const { updateTask } = useTaskContext();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "pending" as TaskStatus,
    priority: "medium" as TaskPriority,
    assignee: "",
    dueDate: "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assignee || "",
        dueDate: task.dueDate ? task.dueDate.toISOString().split('T')[0] : "",
      });
    }
  }, [task]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) return;

    updateTask(task.id, {
      title: formData.title.trim(),
      description: formData.description.trim(),
      status: formData.status,
      priority: formData.priority,
      assignee: formData.assignee.trim() || undefined,
      dueDate: formData.dueDate ? new Date(formData.dueDate) : undefined,
    });

    onOpenChange(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Content className={styles.content}>
          <div className={styles.header}>
            <Dialog.Title className={styles.title}>
              <Check size={24} />
              Editar Tarefa
            </Dialog.Title>
            <Dialog.Close asChild>
              <button className={styles.closeButton}>
                <X size={20} />
              </button>
            </Dialog.Close>
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <label htmlFor="edit-title">Título *</label>
              <input
                id="edit-title"
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                placeholder="Digite o título da tarefa"
                required
                className={styles.input}
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor="edit-description">Descrição</label>
              <textarea
                id="edit-description"
                value={formData.description}
                onChange={(e) => handleInputChange("description", e.target.value)}
                placeholder="Descreva a tarefa (opcional)"
                rows={3}
                className={styles.textarea}
              />
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-status">Status</label>
                <select
                  id="edit-status"
                  value={formData.status}
                  onChange={(e) => handleInputChange("status", e.target.value)}
                  className={styles.select}
                >
                  <option value="pending">Pendente</option>
                  <option value="in-progress">Em Progresso</option>
                  <option value="completed">Concluída</option>
                </select>
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="edit-priority">Prioridade</label>
                <select
                  id="edit-priority"
                  value={formData.priority}
                  onChange={(e) => handleInputChange("priority", e.target.value)}
                  className={styles.select}
                >
                  <option value="low">Baixa</option>
                  <option value="medium">Média</option>
                  <option value="high">Alta</option>
                </select>
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="edit-assignee">Responsável</label>
                <input
                  id="edit-assignee"
                  type="text"
                  value={formData.assignee}
                  onChange={(e) => handleInputChange("assignee", e.target.value)}
                  placeholder="Nome do responsável"
                  className={styles.input}
                />
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="edit-dueDate">Data de Vencimento</label>
                <input
                  id="edit-dueDate"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => handleInputChange("dueDate", e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.formActions}>
              <Dialog.Close asChild>
                <button type="button" className={styles.cancelButton}>
                  Cancelar
                </button>
              </Dialog.Close>
              <button type="submit" className={styles.submitButton}>
                <Check size={20} />
                Salvar Alterações
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

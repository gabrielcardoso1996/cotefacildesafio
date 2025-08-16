import { useState, FormEvent } from "react";
import { PlusCircle } from "@phosphor-icons/react";
import { FormWrapper, FormInput, FormButton } from "../Form";

interface ISubmitActionProps {
  add: (description: string) => void;
  placeholder?: string;
  buttonText?: string;
  buttonIcon?: React.ReactNode;
}

export function SubmitAction({ 
  add, 
  placeholder = "Adicione uma nova tarefa",
  buttonText = "Criar",
  buttonIcon = <PlusCircle size={20} />
}: ISubmitActionProps) {
  const [description, setDescription] = useState("");

  function handleAddTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (description.trim() === "") {
      return;
    }
    add(description);
    setDescription("");
  }

  return (
    <FormWrapper onSubmit={handleAddTask}>
      <FormInput
        type="text"
        placeholder={placeholder}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <FormButton type="submit">
        {buttonText}
        {buttonIcon}
      </FormButton>
    </FormWrapper>
  );
}

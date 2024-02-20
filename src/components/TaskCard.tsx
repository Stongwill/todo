import { useState } from "react";

import { Id, Task } from "../types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
interface Props {
  task: Task;
  delTask: (id: Id) => void;
  updTask: (id: Id, content: string) => void;
}

function TaskCard({ task, delTask, updTask }: Props) {
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [editMode, setEditMode] = useState(true);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  const editModeToggle = () => {
    setEditMode((prev) => !prev);
    setIsMouseOver(false);
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="tasl-ref" />
    );
  }

  if (editMode) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        <input
          className="input-edit input-edit-val"
          value={task.content}
          autoFocus
          placeholder="Task content here"
          onBlur={editModeToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" ) {
              editModeToggle();
            }
          }}
          onChange={(e) => updTask(task.id, e.target.value)}
        />
      </div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={editModeToggle}
      className="pre-card"
      onMouseEnter={() => {
        setIsMouseOver(true);
      }}
      onMouseLeave={() => {
        setIsMouseOver(false);
      }}
    >
      {task.label && <div className="task-label">{task.label}</div>}
      {task.image && <div className="block-image">
         <img className="task-image" src={task.image} alt={task.content} />
         </div>}
      
        {task.content}
       
    </div>
  );
}

export default TaskCard;

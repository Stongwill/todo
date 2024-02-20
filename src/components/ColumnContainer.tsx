import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import { useMemo, useState } from "react";
import PlusIcon from "../icons/PlusIcon";
import TaskCard from "./TaskCard";
import EditIcon from "../icons/EditIcon";

interface Props {
  column: Column;
  delColumn: (id: Id) => void;
  updColumn: (id: Id, title: string) => void;

  createTask: (columnId: Id) => void;
  updTask: (id: Id, content: string) => void;
  delTask: (id: Id) => void;
  tasks: Task[];
}

const ColumnContainer = ({ column,delColumn, updColumn, createTask, tasks, delTask, updTask
}: Props) => {
  const [editMode, setEditMode] = useState(false);

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id);
  }, [tasks]);

  const {
    setNodeRef,
    attributes,
    listeners,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
    disabled: editMode,
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="
        column-container
      "
      ></div>
    );
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="
      card
  "
    >
      <div
        {...attributes}
        {...listeners}
        onClick={() => {
          setEditMode(true);
        }}
        className="cart-r"
      >
        <div className="title">
          {!editMode && column.title}
          
          {editMode && (
            <div className="edit-enter">
            <input
              className="edit-input"
              value={column.title}
              onChange={(e) => updColumn(column.id, e.target.value)}
              autoFocus
              placeholder="Добавить задачу ..."
              onBlur={() => {
                setEditMode(false);
              }}
              onKeyDown={(e) => {
                if (e.key !== "Enter") return;
                setEditMode(false);
              }}
            />
             </div>
          )}
        </div>
        <button
          onClick={() => {
            delColumn(column.id);
          }}
          className="
        edit-task
        "
        >
          <EditIcon />
        </button>
      </div>
      <button
        className="btn-added"
        onClick={() => {
          createTask(column.id);
        }}
      >
        <PlusIcon />
        Добавить задачу
      </button>
      <div className="container-cl">
        <SortableContext items={tasksIds}>
          {tasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              delTask={delTask}
              updTask={updTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}

export default ColumnContainer;

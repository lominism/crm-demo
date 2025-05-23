"use client";

import { useState } from "react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
} from "@dnd-kit/core";
import { KanbanColumn } from "@/components/KanbanColumn";

type Task = {
  id: string;
  title: string;
};

type Column = {
  id: string;
  title: string;
  tasks: Task[];
};

const columnOrder = ["To Do", "In Progress", "Done"];
const defaultColumns: Column[] = [
  { id: "todo", title: "To Do", tasks: [] },
  { id: "in-progress", title: "In Progress", tasks: [] },
  { id: "done", title: "Done", tasks: [] },
];

export default function KanbanPage() {
  const [columns, setColumns] = useState<Column[]>(defaultColumns);
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const sensors = useSensors(useSensor(PointerSensor));

  // Add a new card
  const handleAddCard = async (columnId: string): Promise<string> => {
    const newTask = {
      id: `task-${Date.now()}`,
      title: "New Task",
    };

    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId ? { ...col, tasks: [...col.tasks, newTask] } : col
      )
    );
    return Promise.resolve(newTask.id);
  };

  // Edit an existing card
  const handleEditCard = async (
    columnId: string,
    taskId: string,
    newTitle: string
  ): Promise<void> => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.map((task) =>
                task.id === taskId ? { ...task, title: newTitle } : task
              ),
            }
          : col
      )
    );
    return Promise.resolve();
  };

  // Delete a card
  const handleDeleteCard = async (
    columnId: string,
    taskId: string
  ): Promise<void> => {
    setColumns((prev) =>
      prev.map((col) =>
        col.id === columnId
          ? {
              ...col,
              tasks: col.tasks.filter((task) => task.id !== taskId),
            }
          : col
      )
    );
    return Promise.resolve();
  };

  // Handle drag start
  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const sourceColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === active.id)
    );
    const task = sourceColumn?.tasks.find((task) => task.id === active.id);
    if (task) setActiveTask(task);
  };

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over || active.id === over.id) return;

    const sourceColumn = columns.find((col) =>
      col.tasks.some((task) => task.id === active.id)
    );
    const destinationColumn = columns.find((col) => col.id === over.id);

    if (!sourceColumn || !destinationColumn) return;

    const taskToMove = sourceColumn.tasks.find((task) => task.id === active.id);
    if (!taskToMove) return;

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id === sourceColumn.id) {
          return {
            ...col,
            tasks: col.tasks.filter((task) => task.id !== taskToMove.id),
          };
        }
        if (col.id === destinationColumn.id) {
          return {
            ...col,
            tasks: [...col.tasks, taskToMove],
          };
        }
        return col;
      })
    );
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Kanban Board (Demo)</h1>
      <p className="mb-4">
        The cards will not save after refreshing the page because it's not
        connected to a DB.
      </p>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="flex gap-4">
          {columns.map((column) => (
            <KanbanColumn
              key={column.id}
              column={column}
              onAddCard={handleAddCard}
              onEditCard={handleEditCard}
              onDeleteCard={handleDeleteCard}
            />
          ))}
        </div>
        <DragOverlay>
          {activeTask ? (
            <div className="bg-white p-2 rounded shadow">
              {activeTask.title}
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}

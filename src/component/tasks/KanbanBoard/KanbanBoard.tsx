import { DragDropContext } from "@hello-pangea/dnd";
import Column from "./Column";
import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { mockGetTasks, mockUpdateTask } from "../../../services/mockApi";

export default function KanbanBoard() {
  const [columns, setColumns] = useState<any>({
    to_do: [],
    in_progress: [],
    review: [],
    done: []
  });

  const loadTasks = async () => {
    const tasks = await mockGetTasks();
    setColumns({
      to_do: tasks.filter((t: any) => t.status === "to_do"),
      in_progress: tasks.filter((t: any) => t.status === "in_progress"),
      review: tasks.filter((t: any) => t.status === "review"),
      done: tasks.filter((t: any) => t.status === "done")
    });
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const onDragEnd = async (result: any) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    const from = source.droppableId;
    const to = destination.droppableId;

    if (from === to) return;

    await mockUpdateTask(draggableId, { status: to });

    loadTasks();
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Box sx={{ display: "flex" }}>
        <Column columnId="to_do" title="To Do" tasks={columns.to_do} />
        <Column columnId="in_progress" title="In Progress" tasks={columns.in_progress} />
        <Column columnId="review" title="Review" tasks={columns.review} />
        <Column columnId="done" title="Done" tasks={columns.done} />
      </Box>
    </DragDropContext>
  );
}

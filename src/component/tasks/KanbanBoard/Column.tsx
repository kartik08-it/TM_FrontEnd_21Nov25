import { Droppable } from "@hello-pangea/dnd";
import { Box, Typography } from "@mui/material";
import TaskCard from "../TaskCard";


interface Props {
  columnId: string;
  title: string;
  tasks: any[];
}

export default function Column({ columnId, title, tasks }: Props) {
  return (
    <Box sx={{ width: 280, background: "#f7f7f7", borderRadius: 2, p: 2, mr: 3 }}>
      <Typography variant="h6" sx={{ mb: 2, fontWeight: 700 }}>
        {title}
      </Typography>

      <Droppable droppableId={columnId}>
        {(provided) => (
          <Box
            ref={provided.innerRef}
            {...provided.droppableProps}
            sx={{
              minHeight: "80vh",
              background: "#fff",
              borderRadius: 2,
              p: 1
            }}
          >
            {tasks.map((task, index) => (
              <TaskCard task={task} index={index} key={task.id} />
            ))}

            {provided.placeholder}
          </Box>
        )}
      </Droppable>
    </Box>
  );
}

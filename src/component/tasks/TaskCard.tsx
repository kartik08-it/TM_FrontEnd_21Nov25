import { Card, CardContent, Typography } from "@mui/material";
import { Draggable } from "@hello-pangea/dnd";

interface Props {
  task: any;
  index: number;
}

export default function TaskCard({ task, index }: Props) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {(provided) => (
        <Card
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          sx={{
            p: 1,
            mb: 1,
            cursor: "grab",
            borderRadius: 2,
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent sx={{ p: "6px !important" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              {task.title}
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {task.description}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Draggable>
  );
}

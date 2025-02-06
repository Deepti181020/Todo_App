import { Box, Typography, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
interface ActiveTodoProps {
  id: number;
  todo: string;
  dateTime: string;
  completed: boolean;
  markCompleted: (id: number) => void;
  deletedTodo: (id: number) => void;
}

const ActiveTodo = (props: ActiveTodoProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        marginBottom: "16px",
        boxShadow: "0px 2px 4px rgba(0,0,0,0.1)",
        flexWrap: "wrap",
      }}
    >
      {/* Todo details */}
      <Box>
        <Typography
          variant="h6"
          component="div"
          sx={{ fontWeight: "bold", marginBottom: "8px" }}
        >
          {props.todo}
        </Typography>
        <Typography
          variant="body2"
          color="textSecondary"
          sx={{ fontSize: "14px" }}
        >
          {props.dateTime}
        </Typography>
      </Box>

      {/* Action buttons */}
      <Box
        sx={{
          display: "flex",
          gap: "8px",
          marginTop: { xs: "16px", sm: "0" },
        }}
      >
        <Button
          onClick={() => props.markCompleted(props.id)}
          disabled={props.completed} 
          variant="contained"
          color="success"
        >
          {props.completed ? "Completed" : "Mark Complete"}
        </Button>

        <Button
          variant="outlined"
          size="small"
          startIcon={<DeleteIcon />}
          sx={{
            color: "#000",
            borderColor: "#b3b3b3",
            fontWeight: "bold",
            "&:hover": {
              borderColor: "#a6a6a6",
              backgroundColor: "#f2f2f2",
            },
          }}
          onClick={() => props.deletedTodo(props.id)}
        >
          Delete
        </Button>
      </Box>
    </Box>
  );
};

export default ActiveTodo;


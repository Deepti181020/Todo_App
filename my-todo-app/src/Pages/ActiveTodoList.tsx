import { Box, TextField, Button, Typography } from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import ActiveTodo from "../Components/TodList/ActiveTodo";
import { useEffect, useState } from "react";
import { ApiConstants } from "../api/ApiConstants";
import custom_axios from "../axios/AxiosSetup";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";

interface TodoModel {
  completed: boolean,
  title: string;
  date: string;
  id: number;
}

const ActiveTodoList = () => {
  const [todos, setTodos] = useState<TodoModel[]>([]);
  const [title, setTitle] = useState<string>("");

  // Fetch all not completed todos
  const getAllNotCompletedTodos = async () => {
    try {
      const userId = getLoginInfo()?.userId;

      if (!userId) {
        toast.info("User is not authenticated");
        return;
      }

      const response = await custom_axios.get(ApiConstants.TODO.FIND_NOT_COMPLETED(userId));
      setTodos(response.data);
    } catch (error: any) {
      toast.error("Error fetching todos");
    }
  };

  // Add a new todo
  const AddTodo = async () => {
    const userId = getLoginInfo()?.userId;

    if (!userId) {
      toast.info("User is not authenticated");
      return;
    }

    if (!title.trim()) {
      toast.error("Title cannot be empty");
      return;
    }

    try {
      const response = await custom_axios.post(ApiConstants.TODO.ADD(userId), {
        title,
      });

      setTodos([...todos, response.data]);
      setTitle(""); // Clear input after adding
      toast.success("Todo added successfully!");
    } catch (error: any) {
      toast.error("Cannot submit, please try again");
    }
  };

  useEffect(() => {
    getAllNotCompletedTodos();
  }, []);

  return (
    <Box sx={{ maxWidth: "600px", margin: "auto", padding: "16px", marginTop: "80px" }}>
      {/* Input Field */}
      <Box sx={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "24px" }}>
        <TextField
          label="Enter Todo"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          variant="outlined"
          fullWidth
          size="small"
        />
        <Button
          onClick={AddTodo}
          variant="contained"
          startIcon={<SaveIcon />}
          sx={{
            background: "linear-gradient(45deg, #b3b3b3, #e6e6e6)",
            color: "#000",
            fontWeight: "bold",
            "&:hover": { background: "linear-gradient(45deg, #a6a6a6, #d9d9d9)" },
          }}
        >
          Save
        </Button>
      </Box>

      {/* Title */}
      <Typography variant="h5" component="h2" gutterBottom sx={{ textAlign: "center", marginBottom: "16px" }}>
        Active Tasks
      </Typography>

      {/* Todo Items */}
      <Box>
        {todos.length > 0 ? (
          todos.map((todo) => (
            <ActiveTodo
              key={todo.id}
              id={todo.id}
              todo={todo.title}
              dateTime={todo.date}
              completed={todo.completed} 

              // Mark complete
              markCompleted={async () => {
                try {
                  await custom_axios.patch(ApiConstants.TODO.MARK_COMPLETE(todo.id));

                  setTodos((prevTodos) =>
                    prevTodos.map((t) =>
                      t.id === todo.id ? { ...t, completed: true } : t)
                  );

                  toast.success("Todo marked as completed!");
                } catch (error) {
                  toast.error("Error marking todo as completed");
                }
              }}

              // Delete todo
              deletedTodo={async () => {
                try {
                  await custom_axios.delete(ApiConstants.TODO.DELETE(todo.id));
                  setTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
                  toast.success("Todo deleted successfully");
                } catch (error) {
                  toast.error("Error deleting todo");
                }
              }}
            />

          ))
        ) : (
          <Typography sx={{ textAlign: "center", marginTop: "20px" }}>No active todos found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default ActiveTodoList;

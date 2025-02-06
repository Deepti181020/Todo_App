import CompletedTodo from "../Components/TodList/CompletedTodo";
import { Box, Container, Typography, List } from '@mui/material';
import { useEffect, useState } from "react";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";

interface TodosModel {
  title: string;
  date: string;
  id: number;
}

const CompltetedTodoList = () => {

  const [completedTodos, setCompletedTodos] = useState<TodosModel[]>([]);

  //fetch all completed todos of an authenticated user
  const getAllCompletedTodos = async () => {
    try {
      const userId = getLoginInfo()?.userId;
      if (!userId) {
        toast.info("User is not authenticated");
        return;
      }

      const response = await custom_axios.get(ApiConstants.TODO.FIND_COMPLETED(userId));
      setCompletedTodos(response.data);
    } catch (error) {
      toast.error("Error fetching completed todos");
      console.error(error);
    }
  };

  useEffect(() => {
    getAllCompletedTodos();
  }, []);

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        Completed Tasks
      </Typography>
      <Box className="task-lists">
        <List>
          {completedTodos.length > 0 ? (
            completedTodos.map((todo) => (
              <CompletedTodo
                key={todo.id}
                id={todo.id}
                dateTime={todo.date}
                deletedTodo={ async () =>{
                  try {
                    await custom_axios.delete(ApiConstants.TODO.DELETE(todo.id));
                  setCompletedTodos((prevTodos) => prevTodos.filter((t) => t.id !== todo.id));
                  toast.success("Todo deleted successfully");
                    
                  } catch (error) {
                    toast.error("Can not delete todos");
                  }
                }}
                todo={todo.title}
              />
            ))
          ) : (
            <Typography variant="body1" align="center">
              No completed tasks found.
            </Typography>
          )}
        </List>
      </Box>
    </Container>
  );
};

export default CompltetedTodoList;

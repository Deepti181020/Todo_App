import { Button, Card, CardContent, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

interface CompletedTodo {
  id: number;
  todo: string;
  dateTime: string;
  deletedTodo: (id: number) => void;
}

const CompletedTodo = (props: CompletedTodo) => {
  return (
    <Card sx={{ marginBottom: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: 1 }}>
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{props.todo}</Typography>
        <Typography variant="body2" color="text.secondary">
          {props.dateTime}
        </Typography>
      </CardContent>
      <Button
        onClick={() => props.deletedTodo(props.id)}
        variant="outlined"
        startIcon={<DeleteIcon />}
        sx={{
          backgroundColor: '#d3d3d3', // Light black shade
          color: '#000', // Text color
          borderColor: '#000', // Border color
          '&:hover': {
            backgroundColor: '#b3b3b3', // Slightly darker shade on hover
            borderColor: '#000',
          },
        }}
      >
        Delete
      </Button>
    </Card>
  );
};

export default CompletedTodo;

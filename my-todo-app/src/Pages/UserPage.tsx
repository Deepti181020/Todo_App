import { useEffect, useState } from "react";
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getLoginInfo } from "../utils/LoginInfo";
import { toast } from "react-toastify";
import custom_axios from "../axios/AxiosSetup";
import { ApiConstants } from "../api/ApiConstants";

interface UserModel {
  firstName: string;
  lastName: string;
  email: string;
  id: number;
}

const UserPage = () => {
  const [userDetails, setUserDetails] = useState<UserModel[]>([]);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null); // To track if the user is authorized
  const [loading, setLoading] = useState<boolean>(false); // To manage loading state

  const getAllAuthUsers = async () => {
    try {
      setLoading(true); // Set loading to true while fetching data
      const role = getLoginInfo()?.role;
      if (role === "ADMIN") {
        const response = await custom_axios.get(ApiConstants.USER.FIND_ALL);
        setUserDetails(response.data);
      } else {
        setIsAuthorized(false); // If the role is not ADMIN, mark unauthorized
      }
    } catch (error) {
      toast.error("Error fetching Users Details");
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  // DELETE THE USER
  const deleteUser = async (userId: number) => {
    try {
      const currentUserId = getLoginInfo()?.userId;
      if (!currentUserId) {
        toast.info("User cannot delete");
        return;
      }

      await custom_axios.delete(ApiConstants.USER.USER_DELETE(userId));
      setUserDetails((prevUsers) => prevUsers.filter((user) => user.id !== userId)); // Remove deleted user from the state
      toast.success("User deleted successfully");
    } catch (error) {
      toast.error("Error deleting user");
    }
  };

  useEffect(() => {
    const role = getLoginInfo()?.role;
    if (role === "ADMIN") {
      setIsAuthorized(true); // Mark as authorized
      getAllAuthUsers(); // Fetch users on mount
    } else {
      setIsAuthorized(false); // Mark as unauthorized
    }
  }, []); // This effect will run only once when the component mounts

  // Only show the toast if the authorization state is false and it hasn't been shown yet
  useEffect(() => {
    if (isAuthorized === false) {
      toast.info("You are not authorized");
    }
  }, [isAuthorized]); // This runs only if the `isAuthorized` state changes

  return (
    <Container maxWidth="md" sx={{ paddingTop: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        User Management
      </Typography>
      {loading ? (
        <Typography align="center">Loading...</Typography> // Show loading state while data is being fetched
      ) : (
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell align="center">FirstName</TableCell>
                <TableCell align="center">LastName</TableCell>
                <TableCell align="center">Email</TableCell>
                <TableCell align="center">Activity</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {userDetails.length > 0 ? (
                userDetails.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell align="center">{user.firstName}</TableCell>
                    <TableCell align="center">{user.lastName}</TableCell>
                    <TableCell align="center">{user.email}</TableCell>
                    <TableCell align="center">
                      <Button
                        onClick={() => deleteUser(user.id)}
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        sx={{
                          backgroundColor: "#d3d3d3",
                          color: "#000",
                          borderColor: "#000",
                          "&:hover": {
                            backgroundColor: "#b3b3b3",
                            borderColor: "#000",
                          },
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={4} align="center">
                    No users found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default UserPage;

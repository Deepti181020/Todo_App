import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./Components/Navbar/Navbar";
import Login from "./Pages/Login";
import SignUp from "./Pages/SignUp";
import ActiveTodoList from "./Pages/ActiveTodoList";
import UserPage from "./Pages/UserPage";
import ForgotPassword from "./Pages/ForgotPassword";
import ProtectedRoute from "./ProtectedRoute";
import CompltetedTodoList from "./Pages/CompltetedTodoList";
import UnauthorizedPage from "./Pages/UnauthorizedPage";

const App = () => {
  const location = useLocation();
  const token = localStorage.getItem("token");

  // Hide Navbar on specific pages OR if user is unauthorized and trying to access an unknown URL
  const hideNavbarPaths = ["/login", "/signup", "/forgot-password"];
  const isUnknownPath = ![
    "/",
    "/active",
    "/completed",
    "/users",
    "/login",
    "/signup",
    "/forgot-password",
  ].includes(location.pathname);

  const shouldHideNavbar = hideNavbarPaths.includes(location.pathname) || (!token && isUnknownPath);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <ActiveTodoList />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />

        <Route
          path="/active"
          element={
            <ProtectedRoute>
              <ActiveTodoList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/completed"
          element={
            <ProtectedRoute>
              <CompltetedTodoList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <UserPage />
            </ProtectedRoute>
          }
        />

        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* If unauthorized user tries unknown URLs, hide navbar and show Unauthorized Page */}
        <Route path="*" element={<UnauthorizedPage />} />
      </Routes>
    </>
  );
};

// Wrap App with BrowserRouter
const AppWrapper = () => (
  <BrowserRouter>
    <ToastContainer autoClose={3000} position="top-center" hideProgressBar />
    <App />
  </BrowserRouter>
);

export default AppWrapper;

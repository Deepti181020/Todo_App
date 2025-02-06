import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProtectedRoute = (props: any) => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token, navigate]);

  if (!token) return null;

  return props.children;
};

export default ProtectedRoute;

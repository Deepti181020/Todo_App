import { jwtDecode } from "jwt-decode";

interface UserInfo {
    userId: number;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
}

// Decoding the token of an authenticated user
export const getLoginInfo = (): UserInfo | null => {
    const token = localStorage.getItem("token");

    if (token) {
        try {
            const userInfo = jwtDecode<UserInfo>(token); // ✅ Explicit type
            return userInfo;
        } catch (error) {
            console.error("Error decoding token:", error);
            return null;
        }
    }

    return null;
};

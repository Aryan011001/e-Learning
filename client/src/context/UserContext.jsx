import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { server } from "../main";
import toast, { Toaster } from "react-hot-toast";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState([]);
    const [isAuth, setIsAuth] = useState(false);
    const [btnLoading, setBtnLoading] = useState(false);
    const [loading, setLoading] = useState(true);

    async function loginUser(email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/login`, {
                email,
                password,
            });

            toast.success(data.message);
            localStorage.setItem("token", data.token);
            setUser(data.user);
            setIsAuth(true);
            setBtnLoading(false);
            navigate("/");
            fetchMyCourse();
        } catch (error) {
            setBtnLoading(false);
            setIsAuth(false);
            toast.error(error.response.data.message);
        }
    }

    async function registerUser(name, email, password, navigate) {
        setBtnLoading(true);
        try {
            const { data } = await axios.post(`${server}/api/user/register`, {
                name,
                email,
                password,
            });

            toast.success(data.message);
            localStorage.setItem("activationToken", data.activationToken);
            setBtnLoading(false);
            navigate("/verify");
        } catch (error) {
            setBtnLoading(false);
            toast.error(error.response.data.message);
        }
    }

    async function verifyOtp(otp, navigate) {
        setBtnLoading(true);
        const activationToken = localStorage.getItem("activationToken");
        try {
            const { data } = await axios.post(`${server}/api/user/verify`, {
                otp,
                activationToken,
            });

            toast.success(data.message);
            navigate("/login");
            localStorage.clear();
            setBtnLoading(false);
        } catch (error) {
            toast.error(error.response.data.message);
            setBtnLoading(false);
        }
    }

    async function fetchUser() {
        try {
            // Retrieve token from localStorage
            const token = localStorage.getItem("token");

            if (!token) {
                // Handle case where token is not present (e.g., user not logged in)
                console.warn("Token not found in localStorage. User might not be logged in.");
                setLoading(false);
                return; // Exit the function if no token is available
            }

            const { data } = await axios.get(`${server}/api/user/me`, {
                headers: {
                    Authorization: `Bearer ${token}`, // Ensure correct format
                },
            });

            setIsAuth(true);
            setUser(data.user);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    async function fetchMyCourse() {
        try {
            const { data } = await axios.get(`${server}/api/mycourse`, {
                headers: {
                    token: localStorage.getItem("token"),
                },
            });

            setMyCourse(data.courses);
        } catch (error) {
            console.log(error);
        }
    }


    useEffect(() => {
        fetchUser();
    }, []);
    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                setIsAuth,
                isAuth,
                loginUser,
                btnLoading,
                loading,
                registerUser,
                verifyOtp,
                // fetchUser,
            }}
        >
            {children}
            <Toaster />
        </UserContext.Provider>
    );
};

export const UserData = () => useContext(UserContext);
import axios from "axios";
import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";

import {UserRole} from "types/enums";
import {User, AuthService, UserService} from "entities/user";
import {Department, DepartmentService} from "entities/department";


interface AuthContextType {
    accessToken: string | null;
    user: User | null;
    department: Department | null;
    isAdmin: boolean;
    isLoading: boolean;
    refreshToken: () => Promise<void>;
    setAccessToken: (newAccessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    user: null,
    department: null,
    isAdmin: false,
    isLoading: true,
    refreshToken: async () => {

    },
    setAccessToken: () => {

    },
    logout: () => {

    }
});


const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [accessToken, setAccessToken_] = useState<string | null>(localStorage.getItem("access_token"));
    const [user, setUser] = useState<User | null>(null);
    const [department, setDepartment] = useState<Department | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const setAccessToken = (newAccessToken: string) => {
        setAccessToken_(newAccessToken);
    };

    const logout = async () => {
        const authService = new AuthService();
        await authService.logout();
        setAccessToken_(null);
        setUser(null);
        setDepartment(null);
        setIsAdmin(false);
        localStorage.removeItem("access_token");
    };


    const refreshToken = useCallback(async () => {
        try {
            const authService = new AuthService();
            const response = await authService.refreshToken();
            const newAccessToken = response.data["access_token"];
            setAccessToken_(newAccessToken);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await logout();
                }
            } else {
                console.error(err);
            }
        }
    }, []);

    const fetchUser = useCallback(async () => {
        try {
            if (!accessToken) {
                await logout();
                return;
            }

            const departmentService = new DepartmentService();
            const userService = new UserService();

            const userData = await userService.getCurrentUser();
            setUser(userData || null);
            setIsAdmin(userData.role === UserRole.ADMIN);
            if (userData && userData.department_id) {
                const departmentData = await departmentService.getDepartmentById(userData.department_id);
                setDepartment(departmentData || null);
            }
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                const status = err.response.status;
                if (status === 401) {
                    refreshToken().then();
                } else {
                    setUser(null);
                }
            } else {
                console.error(err);
            }
        }
    }, [accessToken, refreshToken]);

    useEffect(() => {
        if (accessToken) {
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            localStorage.setItem("access_token", accessToken);
            fetchUser().finally(() => setIsLoading(false));
        } else {
            delete axios.defaults.headers.common.Authorization;
            localStorage.removeItem("access_token");
            setIsLoading(false);
        }
    }, [accessToken, fetchUser]);

    const contextValue = useMemo(
        () => ({
            accessToken,
            user,
            department,
            isAdmin,
            isLoading,
            refreshToken,
            setAccessToken,
            logout
        }), [accessToken, user, department, isAdmin, isLoading, refreshToken]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};

export default AuthProvider;

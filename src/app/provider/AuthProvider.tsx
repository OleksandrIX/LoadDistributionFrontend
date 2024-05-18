import axios from "axios";
import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";

import {User} from "entities/user/types/user.type";
import {UserRole} from "types/enums";
import {Department} from "entities/department/types/department.type";

import authService from "entities/user/services/auth.service";
import userService from "entities/user/services/user.service";
import departmentService from "entities/department/services/department.service";


interface AuthContextType {
    accessToken: string | null;
    user: User | null;
    department: Department | null;
    isAdmin: boolean | null;
    isLoading: boolean;
    setAccessToken: (newAccessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    user: null,
    department: null,
    isAdmin: null,
    isLoading: true,
    setAccessToken: () => null,
    logout: () => null
});


const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [accessToken, setAccessToken_] = useState<string | null>(localStorage.getItem("access_token"));
    const [user, setUser] = useState<User | null>(null);
    const [department, setDepartment] = useState<Department | null>(null);
    const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const setAccessToken = (newAccessToken: string) => {
        setAccessToken_(newAccessToken);
    };

    const logout = async () => {
        await authService.logout();
        setAccessToken_(null);
        setUser(null);
        localStorage.removeItem("access_token");
    };


    const refreshToken = useCallback(async () => {
        try {
            const response = await authService.refreshToken();
            const newAccessToken = response.data["access_token"];
            setAccessToken_(newAccessToken);
        } catch (err: unknown) {
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

            userService.setAuthorizationToken(accessToken);
            authService.setAuthorizationToken(accessToken);
            departmentService.setAuthorizationToken(accessToken);


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
            setAccessToken,
            logout
        }), [accessToken, user, department, isAdmin, isLoading]
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

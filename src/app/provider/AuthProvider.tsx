import axios from "axios";
import {createContext, FC, ReactNode, useCallback, useContext, useEffect, useMemo, useState} from "react";

import {User} from "types/user.type";
import authService from "services/auth.service";
import userService from "services/user.service";


interface AuthContextType {
    accessToken: string | null;
    user: User | null;
    isLoading: boolean;
    setAccessToken: (newAccessToken: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
    accessToken: null,
    user: null,
    isLoading: true,
    setAccessToken: () => null,
    logout: () => null
});


const AuthProvider: FC<{ children: ReactNode }> = ({children}) => {
    const [accessToken, setAccessToken_] = useState<string | null>(localStorage.getItem("access_token"));
    const [user, setUser] = useState<User | null>(null);
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

    useEffect(() => {
        if (accessToken) {
            axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
            localStorage.setItem("access_token", accessToken);

            (async () => {
                try {
                    if (!accessToken) {
                        await logout();
                        return;
                    }

                    userService.setAuthorizationToken(accessToken);
                    authService.setAuthorizationToken(accessToken);
                    const userData = await userService.getCurrentUser();
                    setUser(userData || null);
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
                } finally {
                    setIsLoading(false);
                }
            })();
        } else {
            delete axios.defaults.headers.common.Authorization;
            localStorage.removeItem("access_token");
            setIsLoading(false);
        }
    }, [accessToken, refreshToken]);

    const contextValue = useMemo(
        () => ({
            accessToken,
            user,
            isLoading,
            setAccessToken,
            logout
        }), [accessToken, user, isLoading]
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

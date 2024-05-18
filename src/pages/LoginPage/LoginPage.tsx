import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "app/provider";
import {LoginForm} from "components/AuthComponents";

import "./LoginPage.scss";

const LoginPage: FC = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        user && navigate("/");
    }, [user, navigate]);

    return (
        <div className="login-page">
            <LoginForm/>
        </div>
    );
};

export default LoginPage;

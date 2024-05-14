import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "app/provider/AuthProvider";
import {RegistrationForm} from "components/Auth";

import "./RegistrationPage.scss";

const RegistrationPage: FC = () => {
    const {user} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        user && navigate("/");
    }, [user, navigate]);


    return (
        <div className="registration-page">
            <RegistrationForm/>
        </div>
    );
};

export default RegistrationPage;

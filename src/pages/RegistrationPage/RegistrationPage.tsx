import {FC, useEffect} from "react";
import {useNavigate} from "react-router-dom";

import {useAuth} from "app/provider";
import {RegistrationForm} from "components/AuthComponents";

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

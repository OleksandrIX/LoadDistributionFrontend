import {Link} from "react-router-dom";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Button, FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";

import {handleAxiosError} from "utils/error.handlers";
import {useAuth} from "app/provider";
import authService from "entities/user/services/auth.service";

import "./LoginForm.scss";


const LoginForm: FC = () => {
    const idLoginToast = "login-toast";
    const loginToast = useToast({id: idLoginToast});
    const {setAccessToken} = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authService.login({username: username, password: password})
            .then((res) => {
                const accessToken = res.data["access_token"];
                setAccessToken(accessToken);
                loginToast.closeAll();
            })
            .catch((err) => {
                handleAxiosError(err, loginToast, idLoginToast, {
                    400: "Не вірний пароль",
                    404: "Користувача не знайдено"
                });
            });
    };

    return (
        <div className="login-form__content">
            <h3 className="login-form__title">Увійти</h3>
            <form className="login-form__form" onSubmit={handleSubmitForm}>
                <FormControl isRequired>
                    <FormLabel>Ім&apos;я користувача:</FormLabel>
                    <Input
                        type="text"
                        placeholder="Введіть ім'я користувача..."
                        value={username}
                        onChange={handleChangeUsername}
                        minLength={3} maxLength={30}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Пароль:</FormLabel>
                    <Input
                        type="password"
                        placeholder="Введіть пароль..."
                        value={password}
                        onChange={handleChangePassword}
                        minLength={8} maxLength={32}
                    />
                </FormControl>

                <Button
                    type="submit"
                    width="full"
                    colorScheme="gray"
                    variant="solid"
                    border="2px"
                    borderColor="black"
                >
                    Увійти
                </Button>
            </form>
            <p className="login-form__text">
                <span className="text__content">Немає облікового запису?</span>
                <Link className="text__link" to="/registration"> Зареєструватися</Link>
            </p>
        </div>
    );
};

export {LoginForm};

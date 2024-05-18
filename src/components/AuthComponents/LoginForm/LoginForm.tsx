import {Link} from "react-router-dom";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Button, FormControl, FormLabel, Input, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import authService from "entities/user/services/auth.service";

import "./LoginForm.scss";


const LoginForm: FC = () => {
    const {setAccessToken} = useAuth();

    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const idLoginToast = "login-toast";
    const toast = useToast({id: idLoginToast});

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);

    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        authService.login({username: username, password: password})
            .then((res) => {
                const accessToken = res.data["access_token"];
                setAccessToken(accessToken);
                toast.closeAll();
            })
            .catch((err) => {
                const status = err.message === "Network Error" ? 503 : err.response.status;
                const errorMessages: Record<number, string> = {
                    400: "Не вірний пароль",
                    404: "Користувача не знайдено",
                    503: "503 - Сервер недоступний"
                };

                const errorMessage = errorMessages[status] || "Невідома помилка";
                toast.isActive(idLoginToast)
                    ? toast.update(idLoginToast, {title: errorMessage, status: "error"})
                    : toast({title: errorMessage, status: "error"});
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

import {Link, useNavigate} from "react-router-dom";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Button, FormControl, FormLabel, HStack, Input, useToast} from "@chakra-ui/react";

import {displayToast} from "utils/toast";
import {AuthService} from "entities/user";
import {handleAxiosError} from "utils/error.handlers";

import "./RegistrationForm.scss";


const RegistrationForm: FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");

    const idErrorRegistrationToast = "error-registration-toast";
    const idSuccessRegistrationToast = "success-registration-toast";
    const errorToast = useToast({id: idErrorRegistrationToast});
    const successToast = useToast({id: idSuccessRegistrationToast});

    const handleChangeUsername = (event: ChangeEvent<HTMLInputElement>) => setUsername(event.target.value);
    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) => setEmail(event.target.value);
    const handleChangePassword = (event: ChangeEvent<HTMLInputElement>) => setPassword(event.target.value);
    const handleChangeConfirmPassword = (event: ChangeEvent<HTMLInputElement>) => setConfirmPassword(event.target.value);

    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const emailValidRegex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!emailValidRegex.test(email)) {
            displayToast(errorToast, idErrorRegistrationToast, {
                title: "Не вірний формат елекроной пошти",
                status: "error"
            });
        } else if (password !== confirmPassword) {
            displayToast(errorToast, idErrorRegistrationToast, {
                title: "Паролі не співпадають",
                status: "error"
            });
        } else {
            const authService = new AuthService();
            authService.registration({username: username, email: email, password: password})
                .then(() => {
                    errorToast.closeAll();
                    displayToast(successToast, idSuccessRegistrationToast, {
                        title: "Успішео зараєструвалися",
                        status: "success"
                    });
                    navigate("/login");
                })
                .catch((err) => {
                    handleAxiosError(err, errorToast, idErrorRegistrationToast, {
                        409: "Користувач з тим іменем чи поштою вже існує",
                        422: "Дані не валідні"
                    });
                });
        }
    };

    return (
        <div className="registration-form__content">
            <h3 className="registration-form__title">Реєстрація</h3>
            <form className="registration-form__form" onSubmit={handleSubmitForm}>
                <FormControl isRequired>
                    <FormLabel>Ім&apos;я користувача</FormLabel>
                    <Input
                        type="text"
                        placeholder="Введіть ім'я користувача..."
                        value={username}
                        onChange={handleChangeUsername}
                        minLength={3} maxLength={30}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Електрона пошта</FormLabel>
                    <Input
                        type="email"
                        placeholder="Введіть електронук пошту..."
                        value={email}
                        onChange={handleChangeEmail}
                    />
                </FormControl>

                <HStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Пароль</FormLabel>
                        <Input
                            type="password"
                            placeholder="Введіть пароль..."
                            value={password}
                            onChange={handleChangePassword}
                            minLength={8} maxLength={32}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Підтвердіть пароль</FormLabel>
                        <Input
                            type="password"
                            placeholder="Введіть пароль..."
                            value={confirmPassword}
                            onChange={handleChangeConfirmPassword}
                            minLength={8} maxLength={32}
                        />
                    </FormControl>
                </HStack>

                <Button
                    type="submit"
                    width="full"
                    colorScheme="gray"
                    variant="solid"
                    border="2px"
                    borderColor="black"
                >
                    Зареєструватися
                </Button>
            </form>
            <p className="registration-form__text">
                <span className="text__content">Вже є обліковий запис?</span>
                <Link className="text__link" to="/login"> Увійти</Link>
            </p>
        </div>
    );
};

export {RegistrationForm};

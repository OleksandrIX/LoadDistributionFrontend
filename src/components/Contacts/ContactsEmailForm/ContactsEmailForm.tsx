import {ReactSVG} from "react-svg";
import {ChangeEvent, FC, FormEvent, useState} from "react";
import {Button, FormControl, FormErrorMessage, FormLabel, HStack, Input, Textarea, VStack} from "@chakra-ui/react";
import {sendIcon} from "assets/media/svg-icon";
import {ContactImage} from "assets/media/images";
import "./ContactsEmailForm.scss";


const ContactsEmailForm: FC = () => {
    const [firstName, setFirstName] = useState<string>("");
    const [lastName, setLastName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const [validated, setValidate] = useState<boolean>(false);

    const handleSubmitForm = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setValidate(true);
    };

    const handleChangeFirstName = (event: ChangeEvent<HTMLInputElement>) =>
        setFirstName(event.target.value);

    const handleChangeLastName = (event: ChangeEvent<HTMLInputElement>) =>
        setLastName(event.target.value);

    const handleChangeEmail = (event: ChangeEvent<HTMLInputElement>) =>
        setEmail(event.target.value);

    const handleChangeMessage = (event: ChangeEvent<HTMLTextAreaElement>) =>
        setMessage(event.target.value);

    return (
        <div className="contacts__email-wrapper">
            <img className="map-image" src={ContactImage} alt="img"/>

            <form noValidate onSubmit={handleSubmitForm} className="email-form">
                <VStack spacing="4" align="start">
                    <h3 className="email-form__title">Надіслати повідомлення</h3>

                    <HStack spacing="4">
                        <FormControl id="firstName" isRequired isInvalid={validated && !firstName}>
                            <FormLabel>Ім&apos;я</FormLabel>
                            <Input
                                type="text"
                                placeholder="Введіть ім'я..."
                                value={firstName}
                                onChange={handleChangeFirstName}
                                minLength={2} maxLength={30}
                            />
                            <FormErrorMessage>
                                Будь ласка, введіть ім&apos;я.
                                <br/>
                                (від 2 до 30 літер)
                            </FormErrorMessage>
                        </FormControl>

                        <FormControl id="lastName" isRequired isInvalid={validated && !lastName}>
                            <FormLabel>Прізвище</FormLabel>
                            <Input
                                type="text"
                                placeholder="Введіть прізвище..."
                                value={lastName}
                                onChange={handleChangeLastName}
                                minLength={2} maxLength={30}
                            />
                            <FormErrorMessage>
                                Будь ласка, введіть прізвище.
                                <br/>
                                (від 2 до 30 літер)
                            </FormErrorMessage>
                        </FormControl>
                    </HStack>

                    <FormControl id="email" isRequired isInvalid={validated && !email}>
                        <FormLabel>Пошта</FormLabel>
                        <Input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={handleChangeEmail}
                        />
                        <FormErrorMessage>
                            Будь ласка, введіть правильну адресу електронної пошти.
                        </FormErrorMessage>
                    </FormControl>

                    <FormControl id="message" isRequired isInvalid={validated && !message}>
                        <FormLabel>Повідомлення</FormLabel>
                        <Textarea
                            className="email-form__textarea"
                            placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                            value={message}
                            onChange={handleChangeMessage}
                            minLength={10} maxLength={1024}
                        />
                        <FormErrorMessage>
                            Будь ласка, введіть повідомлення.
                            <br/>
                            (від 10 до 1024 знаків)
                        </FormErrorMessage>
                    </FormControl>

                    <div className="email-form__btn-wrapper">
                        <Button type="submit" colorScheme="blue" variant="solid">
                            <ReactSVG src={sendIcon}/> Відправити
                        </Button>
                    </div>
                </VStack>
            </form>
        </div>
    );
};

export {
    ContactsEmailForm
};

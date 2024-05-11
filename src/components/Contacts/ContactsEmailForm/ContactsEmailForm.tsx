import {Button, Col, Form, Row} from "react-bootstrap";
import {ReactSVG} from "react-svg";

import {ChangeEvent, FC, FormEvent, useState} from "react";
import {sendIcon} from "assets/media/svg-icon";
import mapImage from "assets/media/images/contacts-image.png";

import "bootstrap/dist/css/bootstrap.min.css";
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

    const handleChangeMessage = (event: ChangeEvent<HTMLInputElement>) =>
        setMessage(event.target.value);

    return (
        <div className="contacts__email-wrapper">
            <img className="map-image" src={mapImage} alt="img"/>

            <Form
                noValidate validated={validated}
                className="email-form" onSubmit={handleSubmitForm}
            >
                <h3 className="email-form__title">Надіслати повідомлення</h3>

                <Row className="mb-3">
                    <Form.Group controlId="firstName" as={Col}>
                        <Form.Label className="mb-2">Ім&apos;я</Form.Label>
                        <Form.Control
                            required minLength={2} maxLength={30}
                            value={firstName} onChange={handleChangeFirstName}
                            type="text" placeholder="Введіть ім'я..."
                        />
                        <Form.Control.Feedback type="invalid">
                            Будь ласка, введіть ім&apos;я.
                            <br/>
                            (від 2 до 30 літер)
                        </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="lastName" as={Col}>
                        <Form.Label className="mb-2">Прізвище</Form.Label>
                        <Form.Control
                            required minLength={2} maxLength={30}
                            value={lastName} onChange={handleChangeLastName}
                            type="text" placeholder="Введіть прізвище..."
                        />
                        <Form.Control.Feedback type="invalid">
                            Будь ласка, введіть прізвище.
                            <br/>
                            (від 2 до 30 літер)
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="email">
                    <Form.Label className="mb-2">Пошта</Form.Label>
                    <Form.Control
                        required
                        value={email} onChange={handleChangeEmail}
                        type="email" placeholder="name@example.com"
                    />
                    <Form.Control.Feedback type="invalid">
                        Будь ласка, введіть правильну адресу електронної пошти.
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group controlId="message">
                    <Form.Label className="mb-2">Повідомлення</Form.Label>
                    <Form.Control
                        required minLength={10} maxLength={1024}
                        value={message} onChange={handleChangeMessage}
                        rows={3} as="textarea" className="email-form__textarea"
                        placeholder="Lorem ipsum dolor sit amet, consectetur adipisicing elit."
                    />
                    <Form.Control.Feedback type="invalid">
                        Будь ласка, введіть повідомлення.
                        <br/>
                        (від 10 до 1024 знаків)
                    </Form.Control.Feedback>
                </Form.Group>

                <div className="email-form__btn-wrapper">
                    <Button
                        className="email-form__btn-submit"
                        type="submit"
                    >
                        <ReactSVG src={sendIcon}/> Відправити
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export {ContactsEmailForm};

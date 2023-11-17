import { FC } from "react";
import { ContactsEmailForm, ContactsSocialMedia } from "components/Contacts";
import "./ContactsPage.scss";

const ContactsPage: FC = () => {
    return (
        <div className="contacts">
            <ContactsSocialMedia />
            <ContactsEmailForm />
        </div>
    );
};

export { ContactsPage };

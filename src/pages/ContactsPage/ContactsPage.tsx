import {FC} from "react";
import {ContactsEmailForm, ContactsSocialMedia} from "components/ContactsComponents";
import "./ContactsPage.scss";

const ContactsPage: FC = () => {
    return (
        <div className="contacts">
            <ContactsSocialMedia/>
            <ContactsEmailForm/>
        </div>
    );
};

export default ContactsPage;

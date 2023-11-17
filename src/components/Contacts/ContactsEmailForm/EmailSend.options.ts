import * as process from "process";

interface EmailSendOptions{
    SERVICE_ID: string,
    TEMPLATE_ID: string,
    PUBLIC_KEY: string,
}

const emailSendOptions: EmailSendOptions = {
    "SERVICE_ID": process.env.REACT_APP_SERVICE_ID || "",
    "TEMPLATE_ID": process.env.REACT_APP_TEMPLATE_ID || "",
    "PUBLIC_KEY": process.env.REACT_APP_PUBLIC_KEY || ""
};

export {emailSendOptions};

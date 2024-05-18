import {displayToast} from "./toast";

const handleAxiosError = (err: any, toast: any, toastId: string, additionalErrorMessages: Record<number, string>) => {
    const status = err.message === "Network Error" ? 503 : err.response.status;
    const errorMessages: Record<number, string> = {...additionalErrorMessages, 503: "503 - Сервер недоступний"};

    displayToast(toast, toastId, {
        title: errorMessages[status] || "Невідома помилка",
        status: "error"
    });
};

export {handleAxiosError};

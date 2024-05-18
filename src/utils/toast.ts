    interface CustomToastOptions {
    title?: string;
    description?: string;
    status: "default" | "success" | "error" | "warning" | "info" | "loading";
}

const displayToast = (toast: any, toastId: string, options: CustomToastOptions) => {
    toast.isActive(toastId)
        ? toast.update(toastId, options)
        : toast(options);
};

export {displayToast};

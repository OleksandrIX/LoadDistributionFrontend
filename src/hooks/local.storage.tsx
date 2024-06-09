import {useEffect} from "react";

type StorageChangeCallback = () => void;

export const useLocalStorageWatcher = (callback: StorageChangeCallback): void => {
    useEffect(() => {
        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "distribution_session") {
                callback();
            }
        };

        window.addEventListener("storage", handleStorageChange);

        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, [callback]);
};

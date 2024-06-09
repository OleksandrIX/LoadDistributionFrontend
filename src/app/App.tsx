import {FC} from "react";
import {RouterProvider} from "react-router-dom";
import {ChakraProvider, extendTheme} from "@chakra-ui/react";

import {AuthProvider, router} from "./provider";

import "./styles/app.scss";


const theme = extendTheme({
    breakpoints: {
        sm: "30em", // 480px
        md: "48em", // 768px
        lg: "62em", // 992px
        xl: "80em", // 1280px
        custom1: "62.5em", // 1000px
        custom2: "93.75em" // 1500px
    },
    colors: {
        dark: {
            50: "#000000",
            100: "#0a0a0a",
            200: "#141414",
            300: "#1e1e1e",
            400: "#282828",
            500: "#323232",
            600: "#3c3c3c",
            700: "#464646",
            800: "#505050",
            900: "#5a5a5a"
        },
        brand: {
            50: "#F3F4F6",
            100: "#E5E7EB",
            200: "#D1D5DB",
            300: "#9CA3AF",
            400: "#6B7280",
            500: "#374151",
            600: "#1F2937",
            700: "#111827",
            800: "#000000",
            900: "#000000"
        }
    }
});

const App: FC = () => {
    return (
        <ChakraProvider theme={theme}
                        toastOptions={{defaultOptions: {position: "bottom-right", duration: 5000, isClosable: true}}}>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </ChakraProvider>
    );
};

export {App};

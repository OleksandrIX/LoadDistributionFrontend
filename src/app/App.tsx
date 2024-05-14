import {FC} from "react";
import {RouterProvider} from "react-router-dom";
import {ChakraProvider} from "@chakra-ui/react";

import AuthProvider from "./provider/AuthProvider";
import {router} from "./provider/BrowserRouter";

import "./styles/app.scss";

const App: FC = () => {
    return (
        <ChakraProvider toastOptions={{defaultOptions: {position: "bottom-right", duration: 10000, isClosable: true}}}>
            <AuthProvider>
                <RouterProvider router={router}/>
            </AuthProvider>
        </ChakraProvider>
    );
};

export {App};

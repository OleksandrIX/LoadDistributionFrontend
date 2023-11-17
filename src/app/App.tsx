import {FC, StrictMode} from "react";
import {RouterProvider} from "react-router-dom";
import {router} from "./provider/BrowserRouter";
import "./styles/app.scss";

const App: FC = () => {
    return (
        <StrictMode>
            <RouterProvider router={router}/>
        </StrictMode>
    );
};

export {App};

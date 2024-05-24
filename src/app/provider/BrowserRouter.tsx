import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";

import Layout from "pages/LayoutPage/Layout";
import HomePage from "pages/HomePage/HomePage";
import RegulationsPage from "pages/RegulationsPage/RegulationsPage";
import ContactsPage from "pages/ContactsPage/ContactsPage";
import LoginPage from "pages/LoginPage/LoginPage";
import RegistrationPage from "pages/RegistrationPage/RegistrationPage";
import {ErrorBoundary, NotFoundPage} from "pages/ErrorPage";


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="regulations" element={<RegulationsPage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="contacts" element={<ContactsPage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="login" element={<LoginPage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="registration" element={<RegistrationPage/>}/>
        <Route path="*" element={<NotFoundPage/>}/>
    </Route>
));

export {router};

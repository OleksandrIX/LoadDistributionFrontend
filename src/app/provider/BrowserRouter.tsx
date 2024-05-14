import {createBrowserRouter, createRoutesFromElements, Route} from "react-router-dom";

import Layout from "pages/LayoutPage/Layout";
import HomePage from "pages/HomePage/HomePage";
import RegulationsPage from "pages/RegulationsPage/RegulationsPage";
import DepartmentsPage, {departmentsLoader} from "pages/DepartmentsPage/DepartmentsPage";
import ContactsPage from "pages/ContactsPage/ContactsPage";
import LoginPage from "pages/LoginPage/LoginPage";
import RegistrationPage from "pages/RegistrationPage/RegistrationPage";

import {NotFoundPage} from "pages/NotFound";
import {DepartmentList} from "components/Department";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>} errorElement={<NotFoundPage/>}>
        <Route index element={<HomePage/>}/>
        <Route path="regulations" element={<RegulationsPage/>}/>
        <Route path="contacts" element={<ContactsPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="registration" element={<RegistrationPage/>}/>
        <Route path="departments" element={<DepartmentsPage/>}>
            <Route index element={<DepartmentList/>} loader={departmentsLoader}/>
        </Route>
    </Route>
));

export {router};

import {FC} from "react";
import {createBrowserRouter, createRoutesFromElements, Outlet, Route} from "react-router-dom";

import {useAuth} from "./AuthProvider";
import Layout from "pages/LayoutPage/Layout";
import HomePage from "pages/HomePage/HomePage";
import RegulationsPage from "pages/RegulationsPage/RegulationsPage";
import DepartmentsPage, {departmentsLoader} from "pages/DepartmentsPage/DepartmentsPage";
import ContactsPage from "pages/ContactsPage/ContactsPage";
import LoginPage from "pages/LoginPage/LoginPage";
import RegistrationPage from "pages/RegistrationPage/RegistrationPage";
import {ErrorBoundary, ForbiddenPage, NotFoundPage} from "pages/ErrorPage";
import {DepartmentList} from "components/DepartmentComponents";


const ProtectedRoutes: FC = () => {
    const {user} = useAuth();
    if (!user)
        return <ForbiddenPage/>;
    return <Outlet/>;
};


const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="regulations" element={<RegulationsPage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="contacts" element={<ContactsPage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="login" element={<LoginPage/>} errorElement={<ErrorBoundary/>}/>
        <Route path="registration" element={<RegistrationPage/>}/>
        <Route element={<ProtectedRoutes/>} errorElement={<ErrorBoundary/>}>
            <Route path="departments" element={<DepartmentsPage/>}>
                <Route index element={<DepartmentList/>} loader={departmentsLoader}/>
            </Route>
        </Route>
        <Route path="*" element={<NotFoundPage/>}/>
    </Route>
));

export {router};

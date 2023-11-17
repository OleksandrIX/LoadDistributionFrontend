import {
    createBrowserRouter,
    createRoutesFromElements,
    Route
} from "react-router-dom";

import {Layout} from "pages/LayoutPage/Layout";
import {NotFoundPage} from "pages/NotFound";
import {HomePage} from "pages/HomePage/HomePage";
import {AboutPage} from "pages/AboutPage/AboutPage";
import {RegulationsPage} from "pages/RegulationsPage/RegulationsPage";
import {DepartmentsPage, departmentsLoader} from "pages/DepartmentsPage/DepartmentsPage";
import {ContactsPage} from "pages/ContactsPage/ContactsPage";

import {DepartmentList, DepartmentSingle} from "components/Department";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path="/" element={<Layout/>} errorElement={<NotFoundPage/>}>
        <Route index element={<HomePage/>}/>
        <Route path="about" element={<AboutPage/>}/>
        <Route path="regulations" element={<RegulationsPage/>}/>
        <Route path="departments" element={<DepartmentsPage/>}>
            <Route index element={<DepartmentList/>} loader={departmentsLoader}/>
            <Route path=":departmentId" element={<DepartmentSingle/>}/>
        </Route>
        <Route path="contacts" element={<ContactsPage/>}/>
    </Route>
));

export {router};

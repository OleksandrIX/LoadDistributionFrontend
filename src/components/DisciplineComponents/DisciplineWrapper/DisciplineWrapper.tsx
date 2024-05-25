import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Box, Heading, Stack, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {Loader} from "components/UI";
import {DepartmentService, DepartmentWithRelationships} from "entities/department";
import {ResponseEducationComponentWithRelationships} from "entities/discipline";
import DisciplineAdminWrapper from "./DisciplineAdminWrapper/DisciplineAdminWrapper";
import DisciplineUserWrapper from "./DisciplineUserWrapper/DisciplineUserWrapper";

const DisciplineWrapper: FC = () => {
    const idEducationComponentToast = "education-component-toast";
    const educationComponentToast = useToast({id: idEducationComponentToast});

    const {isAdmin, department, refreshToken} = useAuth();
    const [departmentsWithDisciplines, setDepartmentsWithDisciplines] = useState<DepartmentWithRelationships[]>([]);
    const [disciplines, setDisciplines] = useState<ResponseEducationComponentWithRelationships[]>([]);
    const [isLoadingEducationComponent, setIsLoadingEducationComponent] = useState<boolean>(true);

    const fetchDisciplines = useCallback(async () => {
        try {
            const departmentService = new DepartmentService();
            if (isAdmin) {
                const departmentsWithEducationComponents = await departmentService
                    .getAllDepartmentsWithEducationComponents();
                setDepartmentsWithDisciplines(departmentsWithEducationComponents);
            } else {
                if (department) {
                    const departmentWithEducationComponents = await departmentService
                        .getDepartmentByIdWithEducationComponents(department.id);
                    setDisciplines(prevState =>
                        [...prevState, ...departmentWithEducationComponents.education_components]
                    );
                }
            }
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, educationComponentToast, idEducationComponentToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        } finally {
            setIsLoadingEducationComponent(false);
        }
    }, [isAdmin, department, educationComponentToast, refreshToken]);

    useEffect(() => {
        isLoadingEducationComponent && fetchDisciplines().then();
    }, [isLoadingEducationComponent, fetchDisciplines]);

    if (isLoadingEducationComponent) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    if (isAdmin) return <DisciplineAdminWrapper departmentsWithDisciplines={departmentsWithDisciplines}/>;

    if (!department) {
        return (
            <Box
                h="100%"
                mt="10%"
                display="flex"
                alignItems="start"
                justifyContent="center"
            >
                <Heading
                    px={5} py={1}
                    size="md"
                    textAlign="center"
                    borderWidth="1px"
                    borderColor="brand.200"
                    borderStyle="solid"
                    borderRadius="lg"
                    fontStyle="italic"
                >Вам ще не призначили кафедру</Heading>
            </Box>
        );

    }

    return <DisciplineUserWrapper department={department} disciplines={disciplines}/>;
};

export default DisciplineWrapper;

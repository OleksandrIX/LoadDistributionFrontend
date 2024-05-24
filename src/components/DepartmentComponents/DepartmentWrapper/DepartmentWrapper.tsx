import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Box, Heading, IconButton, Stack, useToast} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {DepartmentService, DepartmentWithTeachers} from "entities/department";
import {Loader} from "components/UI";
import DepartmentTable from "../DepartmentTable/DepartmentTable";

const DepartmentWrapper: FC = () => {
    const idDepartmentToast = "department-toast";
    const departmentToast = useToast({id: idDepartmentToast});

    const {refreshToken} = useAuth();
    const [departments, setDepartments] = useState<DepartmentWithTeachers[]>([]);
    const [isDepartmentLoading, setIsDepartmentLoading] = useState<boolean>(true);

    const fetchDepartments = useCallback(async () => {
        try {
            const departmentService = new DepartmentService();
            const departmentsData = await departmentService.getAllDepartmentsWithTeachers();
            setDepartments(departmentsData);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, departmentToast, idDepartmentToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        } finally {
            setIsDepartmentLoading(false);
        }
    }, [departmentToast, refreshToken]);

    useEffect(() => {
        isDepartmentLoading && fetchDepartments().then();
    }, [isDepartmentLoading, fetchDepartments]);

    if (isDepartmentLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    return (
        <Stack spacing={2}>
            <IconButton aria-label="Додати кафедру" icon={<AddIcon/>} colorScheme="brand"/>

            {departments.length > 0
                ? <DepartmentTable departments={departments}/>
                : <Box
                    h="100%"
                    mt="10%"
                    display="flex"
                    alignItems="start"
                    justifyContent="center"
                >
                    <Heading
                        px={10} py={1}
                        size="md"
                        textAlign="center"
                        borderWidth="1px"
                        borderColor="brand.200"
                        borderStyle="solid"
                        borderRadius="lg"
                        fontStyle="italic"
                    >Кафедр немає</Heading>
                </Box>}
        </Stack>
    );
};

export default DepartmentWrapper;

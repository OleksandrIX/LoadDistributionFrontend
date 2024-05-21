import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Box, Heading, IconButton, Stack, useToast} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {Department, DepartmentService} from "entities/department";
import {Loader} from "components/UI";
import DepartmentTable from "../DepartmentTable/DepartmentTable";

const DepartmentWrapper: FC = () => {
    const idDepartmentToast = "department-toast";
    const departmentToast = useToast({id: idDepartmentToast});

    const {refreshToken} = useAuth();
    const [departments, setDepartments] = useState<Department[]>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState<boolean>(true);

    const fetchDepartments = useCallback(async () => {
        try {
            setIsDepartmentLoading(true);
            const departmentService = new DepartmentService();
            const departmentsData = await departmentService.getAllDepartments();
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
        !departments && fetchDepartments().then();
    }, [departments, fetchDepartments]);

    if (isDepartmentLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    if (!departments) {
        return <Box
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
        </Box>;
    }

    return (
        <Stack spacing={2}>
            <IconButton aria-label="Додати кафедру" icon={<AddIcon/>} colorScheme="brand"/>
            <DepartmentTable
                departments={departments}
            />
        </Stack>
    );
};

export default DepartmentWrapper;

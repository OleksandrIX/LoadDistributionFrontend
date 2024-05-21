import axios from "axios";
import {FC, useCallback, useEffect, useMemo, useState} from "react";
import {Box, Heading, IconButton, Stack, Tooltip, useToast} from "@chakra-ui/react";
import {AddIcon} from "@chakra-ui/icons";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {Department, DepartmentService, DepartmentTableData} from "entities/department";
import {Loader} from "components/UI";
import DepartmentTable from "../DepartmentTable/DepartmentTable";
import {Column} from "react-table";
import {Td} from "@chakra-ui/table";

const DepartmentWrapper: FC = () => {
    const idDepartmentToast = "department-toast";
    const departmentToast = useToast({id: idDepartmentToast});

    const {refreshToken} = useAuth();
    const [departments, setDepartments] = useState<Department[]>();
    const [isDepartmentLoading, setIsDepartmentLoading] = useState<boolean>(true);

    const columns: Column<DepartmentTableData>[] = useMemo(() => [
        {
            Header: "Номер кафедри",
            accessor: "department_code",
            Cell: ({value}: { value: string }) => <Td textAlign="center">{value}</Td>,
            width: "15%"
        },
        {
            Header: "Назва кафедри",
            accessor: "department_name",
            Cell: ({value}: { value: string }) => (
                <Td overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    <Tooltip label={value}>
                        <span>{value}</span>
                    </Tooltip>
                </Td>
            ),
            width: "50%"
        },
        {
            Header: "Всього НПП",
            accessor: "total_teachers",
            Cell: ({value}: { value: number }) => <Td textAlign="center">{value}</Td>,
            width: "15%"
        },
        {
            Header: "Навчальне навантаження",
            accessor: "academic_workload",
            Cell: ({value}: { value: number }) => <Td textAlign="center">{value}</Td>,
            width: "20%"
        }
    ], []);

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
                departments={departments.map((department, index) => ({
                    department_code: department.department_code,
                    department_name: department.department_name,
                    total_teachers: index + 1,
                    academic_workload: index + 1
                }))}
                columns={columns}
            />
        </Stack>
    );
};

export default DepartmentWrapper;

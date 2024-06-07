import {ChangeEvent, FC, useEffect, useState} from "react";
import {
    Box,
    Button,
    Flex,
    Heading,
    Select,
    SimpleGrid,
    Stack,
    Tooltip,
    useDisclosure
} from "@chakra-ui/react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";

import {DepartmentWithRelationships} from "entities/department";
import DisciplineTable from "../../DisciplineTable/DisciplineTable";

interface DisciplineAdminWrapperProps {
    departmentsWithDisciplines: DepartmentWithRelationships[];
}

const DisciplineAdminWrapper: FC<DisciplineAdminWrapperProps> = ({departmentsWithDisciplines}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentWithRelationships>(departmentsWithDisciplines[0]);
    const [dataOfYearsArray, setDataOfYearsArray] = useState<string[]>([]);
    const [selectedDataOfYears, setSelectedDataOfYears] = useState<string>("");

    const handleSelectDepartment = (departmentIndex: number) => {
        setSelectedDepartment(departmentsWithDisciplines[departmentIndex]);
        onClose();
    };

    const handleSelectDataOfYears = (event: ChangeEvent<HTMLSelectElement>) =>
        setSelectedDataOfYears(event.target.value);

    useEffect(() => {
        const possibleDataOfYears: string[] = [];
        for (const department of departmentsWithDisciplines) {
            for (const discipline of department.disciplines) {
                !possibleDataOfYears.includes(discipline.data_of_years)
                && possibleDataOfYears.push(discipline.data_of_years);
            }
        }
        possibleDataOfYears.sort((a, b) => {
            const startYear = parseInt(a.split("-")[0]);
            const endYear = parseInt(b.split("-")[1]);
            return startYear - endYear;
        });
        setDataOfYearsArray(possibleDataOfYears);
        setSelectedDataOfYears(possibleDataOfYears[0]);
    }, []);

    return (
        <Box>
            <Button w="100%" colorScheme="brand" onClick={onOpen}>Вибрати кафедру</Button>
            <Stack spacing={4}>
                <Flex my={2} align="center">
                    <Select w="fit-content" defaultValue={selectedDataOfYears} onChange={handleSelectDataOfYears}>
                        {dataOfYearsArray.map((dataOfYear) =>
                            <option key={dataOfYear} value={dataOfYear}>{dataOfYear}</option>
                        )}
                    </Select>
                    <Heading size="sm" textAlign="center" flex={1}>
                        {selectedDepartment.department_code} {selectedDepartment.department_name}
                    </Heading>
                </Flex>

                <DisciplineTable
                    disciplines={selectedDepartment.disciplines.filter((discipline) =>
                        discipline.data_of_years === selectedDataOfYears && discipline
                    )}
                />
            </Stack>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay/>
                <ModalContent>
                    <ModalHeader>Кафедри</ModalHeader>
                    <ModalCloseButton/>
                    <ModalBody>
                        <SimpleGrid columns={{sm: 2, md: 3, lg: 4}} spacing={2}>
                            {departmentsWithDisciplines.map((department, index) =>
                                <Button
                                    p={5}
                                    colorScheme="blue"
                                    key={department.id}
                                    onClick={() => handleSelectDepartment(index)}
                                >
                                    <Tooltip label={department.department_name}>
                                        <span>{department.department_code} кафедра</span>
                                    </Tooltip>
                                </Button>
                            )}
                        </SimpleGrid>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </Box>
    );
};

export default DisciplineAdminWrapper;

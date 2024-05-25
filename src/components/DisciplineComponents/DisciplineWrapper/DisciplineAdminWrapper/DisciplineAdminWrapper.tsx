import {FC, useState} from "react";
import {Button, Heading, SimpleGrid, Stack, Tooltip, useDisclosure} from "@chakra-ui/react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";

import {DepartmentWithRelationships} from "entities/department";
import DisciplineTable from "../../DisciplineTable/DisciplineTable";

interface DisciplineAdminWrapperProps {
    departmentsWithDisciplines: DepartmentWithRelationships[];
}

const DisciplineAdminWrapper: FC<DisciplineAdminWrapperProps> = ({departmentsWithDisciplines}) => {
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedDepartment, setSelectedDepartment] = useState<DepartmentWithRelationships>(departmentsWithDisciplines[0]);

    const handleSelectDepartment = (departmentIndex: number) => {
        setSelectedDepartment(departmentsWithDisciplines[departmentIndex]);
        onClose();
    };

    return (
        <Stack spacing={4}>
            <Button colorScheme="brand" onClick={onOpen}>Вибрати кафедру</Button>
            <Stack spacing={4}>
                <Heading size="sm" textAlign="center">
                    {selectedDepartment.department_code} {selectedDepartment.department_name}
                </Heading>
                <DisciplineTable disciplines={selectedDepartment.education_components}/>
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
        </Stack>
    );
};

export default DisciplineAdminWrapper;

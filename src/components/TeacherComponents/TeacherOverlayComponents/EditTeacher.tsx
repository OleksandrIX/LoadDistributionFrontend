import {FC, FormEvent, useRef, useState} from "react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";

import {Teacher} from "entities/teacher";
import TeacherForm from "../TeacherForm/TeacherForm";

interface EditTeacherProps {
    teacher: Teacher;
    isOpen: boolean;
    onClose: () => void;
    onEdit: (updatedTeacher: Teacher) => void;
}

const EditTeacher: FC<EditTeacherProps> = ({teacher, isOpen, onClose, onEdit}) => {
    const initialRef = useRef<HTMLInputElement>(null);
    const [updatedTeacher, setUpdatedTeacher] = useState<Teacher>({...teacher});

    const handleSubmitUpdatedTeacher = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const teacherData: Teacher = {
            ...teacher,
            "military_rank": updatedTeacher.military_rank ? updatedTeacher.military_rank : undefined,
            "academic_rank": updatedTeacher.academic_rank ? updatedTeacher.academic_rank : undefined,
            "scientific_degree": updatedTeacher.scientific_degree ? updatedTeacher.scientific_degree : undefined,
            "years_of_service": updatedTeacher.years_of_service ? updatedTeacher.years_of_service : undefined
        };
        onEdit(teacherData);
    };

    return (
        <Modal
            isCentered
            size="xl"
            scrollBehavior="inside"
            initialFocusRef={initialRef}
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Редагувати викладача</ModalHeader>
                <ModalCloseButton/>
                <ModalBody pb={6}>
                    <TeacherForm
                        initialRef={initialRef}
                        teacher={updatedTeacher}
                        onChange={setUpdatedTeacher}
                        onSubmit={handleSubmitUpdatedTeacher}
                        onClose={onClose}
                    />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default EditTeacher;

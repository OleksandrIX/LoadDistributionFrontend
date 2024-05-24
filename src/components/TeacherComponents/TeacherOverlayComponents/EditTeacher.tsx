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
            ...updatedTeacher,
            "military_rank": updatedTeacher.military_rank ? updatedTeacher.military_rank : null,
            "academic_rank": updatedTeacher.academic_rank ? updatedTeacher.academic_rank : null,
            "scientific_degree": updatedTeacher.scientific_degree ? updatedTeacher.scientific_degree : null,
            "years_of_service": updatedTeacher.years_of_service ? updatedTeacher.years_of_service : null
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
                        isEdit={true}
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

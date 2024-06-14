import {FC} from "react";
import {
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay
} from "@chakra-ui/modal";

import TeacherCard from "../TeacherCard/TeacherCard";
import {ResponseTeacher} from "entities/teacher";

interface ViewTeacherProps {
    isOpen: boolean;
    onClose: () => void;
    teacher: ResponseTeacher;
}

const ViewTeacher: FC<ViewTeacherProps> = ({isOpen, onClose, teacher}) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Інформація про викладача</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <TeacherCard teacher={teacher}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ViewTeacher;

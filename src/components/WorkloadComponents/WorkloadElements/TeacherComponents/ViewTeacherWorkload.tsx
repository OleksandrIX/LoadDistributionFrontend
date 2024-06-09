import {FC} from "react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";

import {TeacherDistributionWorkload} from "entities/teacher";
import TeacherElement from "./TeacherElement";
import {Stack} from "@chakra-ui/react";

interface ViewTeacherWorkloadProps {
    isOpen: boolean;
    onClose: () => void;
    teachers: TeacherDistributionWorkload[];
}

const ViewTeacherWorkload: FC<ViewTeacherWorkloadProps> = ({isOpen, onClose, teachers}) => {
    return (
        <Modal
            size="5xl"
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Навчальне навантаження викладчів</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <Stack spacing={4} mb={4}>
                        {teachers.map((teacher) =>
                            <TeacherElement
                                key={teacher.id}
                                teacher={teacher}
                            />
                        )}
                    </Stack>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ViewTeacherWorkload;

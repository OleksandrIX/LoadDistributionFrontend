import {FC} from "react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";

import {DisciplineDistributionWorkload} from "entities/discipline";
import EducationComponentList from "./EducationComponentList";
import {TeacherDistributionWorkload} from "../../../../../../entities/teacher";

interface ViewWorkloadDistributionModalProps {
    isOpen: boolean;
    onClose: () => void;
    discipline: DisciplineDistributionWorkload;
    teachers: TeacherDistributionWorkload[];
}

const ViewWorkloadDistributionModal: FC<ViewWorkloadDistributionModalProps> = (
    {isOpen, onClose, discipline, teachers}
) => {
    return (
        <Modal
            size="full"
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Розподіл навантаження для &quot;{discipline.discipline_name}&quot;</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <EducationComponentList discipline={discipline} teachers={teachers}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ViewWorkloadDistributionModal;

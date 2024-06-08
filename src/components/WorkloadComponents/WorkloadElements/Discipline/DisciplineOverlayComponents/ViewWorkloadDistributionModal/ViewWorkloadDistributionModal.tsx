import {FC} from "react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";

import {ResponseDiscipline} from "entities/discipline";
import EducationComponentList from "./EducationComponentList";

interface ViewWorkloadDistributionModalProps {
    isOpen: boolean;
    onClose: () => void;
    discipline: ResponseDiscipline;
}

const ViewWorkloadDistributionModal: FC<ViewWorkloadDistributionModalProps> = ({isOpen, onClose, discipline}) => {
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
                    <EducationComponentList educationComponents={discipline.education_components}/>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ViewWorkloadDistributionModal;

import {FC} from "react";
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton} from "@chakra-ui/modal";

import {ParsedCurriculum} from "entities/curriculum";
import CurriculumError from "./CurriculumError";
import CurriculumSpreadsheetTable from "./CurriculumSpreadsheetTable";
import {Stack, StackDivider} from "@chakra-ui/react";

interface ViewParsedCurriculumProps {
    isOpen: boolean;
    onClose: () => void;
    parsedCurriculum: ParsedCurriculum;
}

const ViewParsedCurriculum: FC<ViewParsedCurriculumProps> = ({isOpen, onClose, parsedCurriculum}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="full"
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Дані з файлу {parsedCurriculum.curriculum_file.filename}</ModalHeader>
                <ModalCloseButton/>
                <Stack px={4} py={2} divider={<StackDivider h="1px" bg="gray.300"/>}>
                    {parsedCurriculum.curriculum_errors &&
                        <CurriculumError
                            curriculumErrors={parsedCurriculum.curriculum_errors}
                        />}
                    <CurriculumSpreadsheetTable
                        curriculumSpreadsheetBlocks={parsedCurriculum.curriculum_spreadsheet_blocks}
                    />
                </Stack>
            </ModalContent>
        </Modal>
    );
};

export default ViewParsedCurriculum;

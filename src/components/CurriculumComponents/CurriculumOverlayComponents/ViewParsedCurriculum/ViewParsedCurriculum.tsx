import axios from "axios";
import {FC} from "react";
import {Button, Stack, StackDivider, useDisclosure, useToast} from "@chakra-ui/react";
import {Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton} from "@chakra-ui/modal";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {ParsedCurriculum, CurriculumService} from "entities/curriculum";
import CurriculumError from "./CurriculumError";
import CurriculumSpreadsheetTable from "./CurriculumSpreadsheetTable";
import DataOfYearsModal from "./DataOfYearsModal";

interface ViewParsedCurriculumProps {
    isOpen: boolean;
    onClose: () => void;
    parsedCurriculum: ParsedCurriculum;
}

const ViewParsedCurriculum: FC<ViewParsedCurriculumProps> = ({isOpen, onClose, parsedCurriculum}) => {
    const idSavedCurriculumToast = "curriculum-toast";
    const savedCurriculumPromiseToast = useToast();
    const savedCurriculumToast = useToast({id: idSavedCurriculumToast});
    const {
        isOpen: isOpenDataOfYearsModal,
        onOpen: onOpenDataOfYearsModal,
        onClose: onCloseDataOfYearsModal
    } = useDisclosure();

    const {refreshToken} = useAuth();

    const handleSaveCurriculumData = (daatOfYears: string) => {
        const savedCurriculumPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const curriculumService = new CurriculumService();
                await curriculumService.saveCurriculumData(
                    {curriculum_spreadsheet_blocks: parsedCurriculum.curriculum_spreadsheet_blocks},
                    daatOfYears
                );
                onClose();
                resolve();
            } catch (err) {
                if (err && axios.isAxiosError(err) && err.response) {
                    if (err.response.status === 401) {
                        await refreshToken();
                    } else {
                        handleAxiosError(err, savedCurriculumToast, idSavedCurriculumToast, {
                            401: "Ви не авторизовані",
                            403: "Відмовлено у доступі"
                        });
                    }
                } else {
                    console.error(err);
                }
                reject();
            }
        });

        savedCurriculumPromiseToast.promise(savedCurriculumPromise, {
            success: {
                title: "Дані успішно збереженно",
                description: `Дані з файлу ${parsedCurriculum.curriculum_file.filename} успішно збереженно`
            },
            error: {
                title: "Помилка при збереженні даних",
                description: `Помилка при збереженні даних файлу ${parsedCurriculum.curriculum_file.filename}`
            },
            loading: {
                title: "Дані зберігаються"
            }
        });
    };

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
                    {parsedCurriculum.curriculum_errors.length > 0 &&
                        <CurriculumError
                            curriculumErrors={parsedCurriculum.curriculum_errors}
                        />}
                    <CurriculumSpreadsheetTable
                        curriculumSpreadsheetBlocks={parsedCurriculum.curriculum_spreadsheet_blocks}
                    />
                    <Button colorScheme="brand" onClick={onOpenDataOfYearsModal}>Зберегти</Button>

                    <DataOfYearsModal
                        isOpen={isOpenDataOfYearsModal}
                        onClose={onCloseDataOfYearsModal}
                        onSave={handleSaveCurriculumData}
                    />
                </Stack>
            </ModalContent>
        </Modal>
    );
};

export default ViewParsedCurriculum;

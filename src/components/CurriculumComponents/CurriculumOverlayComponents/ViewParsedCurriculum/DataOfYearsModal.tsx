import {ChangeEvent, FC, FormEvent, useRef, useState} from "react";
import {Modal, ModalBody, ModalCloseButton, ModalContent, ModalHeader, ModalOverlay} from "@chakra-ui/modal";
import {Button, ButtonGroup, FormControl, FormErrorMessage, Input} from "@chakra-ui/react";

interface DataOfYearsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (daatOfYears: string) => void;
}

const DataOfYearsModal: FC<DataOfYearsModalProps> = ({isOpen, onClose, onSave}) => {
    const [dataOfYears, setDataOfYears] = useState<string>("");
    const [error, setError] = useState<string>("");
    const initialRef = useRef<HTMLInputElement>(null);

    const currentYear = new Date().getFullYear();

    const handleChangeDataOfYears = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.replace(/\D/g, "");
        if (value.length <= 4) {
            setDataOfYears(value);
        } else if (value.length <= 8) {
            setDataOfYears(value.slice(0, 4) + "-" + value.slice(4));
        }
        setError("");
    };

    const validateDataOfYears = (data: string): string | null => {
        const regex = /^\d{4}-\d{4}$/;
        if (!regex.test(data)) {
            return "Формат повинен бути таким: 2023-2024";
        }

        const [startYear, endYear] = data.split("-").map(Number);

        if (endYear - startYear !== 1) {
            return "Різниця між роками повинна бути 1, тобто 2022-2023, 2023-2024";
        }

        if (endYear > currentYear + 1) {
            return `Другий рік не повинен бути більше ніж поточний рік на 1, тобто максимальні можливі роки це ${currentYear}-${currentYear + 1}`;
        }

        return null;
    };

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const validationError = validateDataOfYears(dataOfYears);
        if (validationError) {
            setError(validationError);
        } else {
            onClose();
            onSave(dataOfYears);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalOverlay/>
            <ModalContent>
                <ModalHeader>Введіть навчальний рік</ModalHeader>
                <ModalCloseButton/>
                <ModalBody>
                    <form onSubmit={handleSubmit}>
                        <FormControl isRequired isInvalid={!!error}>
                            <Input
                                ref={initialRef}
                                type="text"
                                placeholder="2023-2024"
                                value={dataOfYears}
                                onChange={handleChangeDataOfYears}
                                minLength={9}
                                maxLength={9}
                            />
                            {error && <FormErrorMessage>{error}</FormErrorMessage>}
                        </FormControl>
                        <ButtonGroup colorScheme="brand" w="100%" justifyContent="flex-end" mt={4} spacing={2}>
                            <Button type="submit">Зберегти</Button>
                        </ButtonGroup>
                    </form>
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default DataOfYearsModal;

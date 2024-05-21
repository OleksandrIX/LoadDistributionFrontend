import {FC, useRef} from "react";
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogCloseButton,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogOverlay,
    Button
} from "@chakra-ui/react";

interface DeleteCurriculumProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteCurriculum: FC<DeleteCurriculumProps> = ({isOpen, onClose, onDelete}) => {
    const cancelRef = useRef<HTMLButtonElement>(null);

    return (
        <AlertDialog
            isCentered
            isOpen={isOpen}
            onClose={onClose}
            leastDestructiveRef={cancelRef}
        >
            <AlertDialogOverlay/>
            <AlertDialogContent>
                <AlertDialogHeader>Видалити файл?</AlertDialogHeader>
                <AlertDialogCloseButton/>
                <AlertDialogBody>
                    Ви впевнені, що хочете видалити цей файл?
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={onClose}>
                        Ні
                    </Button>
                    <Button colorScheme="red" ml={3} onClick={onDelete}>
                        Так
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
};

export default DeleteCurriculum;

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


interface DeleteTeacherProps {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
}

const DeleteTeacher: FC<DeleteTeacherProps> = ({isOpen, onClose, onDelete}) => {
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
                <AlertDialogHeader>Видалити викладача?</AlertDialogHeader>
                <AlertDialogCloseButton/>
                <AlertDialogBody>
                    Ви впевнені, що хочете видалити викладача?
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

export default DeleteTeacher;

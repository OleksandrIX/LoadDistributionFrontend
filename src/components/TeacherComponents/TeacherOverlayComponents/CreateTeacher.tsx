import axios from "axios";
import {FC, FormEvent, useRef, useState} from "react";
import {Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay} from "@chakra-ui/react";
import {useToast} from "@chakra-ui/toast";

import {displayToast} from "utils/toast";
import {handleAxiosError} from "utils/error.handlers";
import {MilitaryRank, Position} from "types/enums";
import {RequestTeacher, TeacherService} from "entities/teacher";
import TeacherForm from "../TeacherForm/TeacherForm";


interface CreateTeacherProps {
    departmentId: string;
    isOpen: boolean;
    onClose: () => void;
    onCreate: (teacherId: string) => void;
}

const CreateTeacher: FC<CreateTeacherProps> = ({departmentId, isOpen, onClose, onCreate}) => {
    const initialRef = useRef<HTMLInputElement>(null);
    const idCreateTeacher = "create-teacher-toast";
    const createToast = useToast({id: idCreateTeacher});

    const [teacher, setTeacher] = useState<RequestTeacher>({
        first_name: "",
        last_name: "",
        middle_name: "",
        position: Position.LECTURER,
        military_rank: MilitaryRank.MAJOR,
        academic_rank: undefined,
        scientific_degree: undefined,
        years_of_service: 10,
        teacher_rate: 1.00,
        is_civilian: false,
        department_id: departmentId
    });

    const handleSubmitCreatedTeacher = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            if (departmentId) {
                const teacherService = new TeacherService();
                const teacherData: RequestTeacher = {
                    ...teacher,
                    "military_rank": teacher.military_rank ? teacher.military_rank : undefined,
                    "academic_rank": teacher.academic_rank ? teacher.academic_rank : undefined,
                    "scientific_degree": teacher.scientific_degree ? teacher.scientific_degree : undefined,
                    "years_of_service": teacher.years_of_service ? teacher.years_of_service : undefined
                };
                const teacherId = await teacherService.createTeacher(teacherData);
                onCreate(teacherId);
                onClose();
                displayToast(createToast, idCreateTeacher, {
                    title: "Викладача успішно додано",
                    description: `Викладач '${teacherData.first_name} ${teacherData.last_name}' успішно створено`,
                    status: "success"
                });
            }
        } catch (err) {
            if (axios.isAxiosError(err) && err.response) {
                handleAxiosError(err, createToast, idCreateTeacher, {
                    404: "Такої кафедри не існує",
                    409: "Викладач з такими даними вже існує",
                    422: "Не валідні дані"
                });
            } else {
                console.error(err);
            }
        }
    };

    return (
        <Drawer
            size="md"
            placement="right"
            isOpen={isOpen}
            onClose={onClose}
            initialFocusRef={initialRef}
        >
            <DrawerOverlay/>
            <DrawerContent>
                <DrawerCloseButton/>
                <DrawerHeader>Додати викладача</DrawerHeader>
                <DrawerBody>
                    <TeacherForm
                        teacher={teacher}
                        onChange={setTeacher}
                        onSubmit={handleSubmitCreatedTeacher}
                        onClose={onClose}
                    />
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );
};

export default CreateTeacher;

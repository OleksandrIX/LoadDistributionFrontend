import {FC} from "react";
import {Box, Heading} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {WorkloadStepperElement} from "./workload.stepper";
import WorkloadStepper from "./WorkloadStepper";
import {WorkloadDiscplineWrapper} from "../WorkloadElements";
import {DisciplineWrapper} from "components/DisciplineComponents";
import {TeacherWrapper} from "components/TeacherComponents";

const steps: WorkloadStepperElement[] = [
    {
        title: "Викладачі",
        description: "Перегляд викладів кафедри",
        element: <TeacherWrapper/>
    },
    {
        title: "Дисципліни",
        description: "Перегляд дисциплін кафедри",
        element: <DisciplineWrapper/>
    },
    {
        title: "Розподіл навантаження",
        description: "Розподіл навчального навантаження",
        element: <WorkloadDiscplineWrapper/>
    },
    {
        title: "Збереження",
        description: "Збереження",
        element: <>Збереження</>
    }
];

const WorkloadWrapper: FC = () => {
    const {department} = useAuth();

    if (!department) {
        return (
            <Box
                h="100%"
                mt="10%"
                display="flex"
                alignItems="start"
                justifyContent="center"
            >
                <Heading
                    px={5} py={1}
                    size="md"
                    textAlign="center"
                    borderWidth="1px"
                    borderColor="brand.200"
                    borderStyle="solid"
                    borderRadius="lg"
                    fontStyle="italic"
                >Вам ще не призначили кафедру</Heading>
            </Box>
        );
    }

    return <WorkloadStepper steps={steps}/>;
};


export default WorkloadWrapper;

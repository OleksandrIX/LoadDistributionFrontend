import {FC, useEffect} from "react";
import {Box, Heading} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import WorkloadStepper from "./WorkloadStepper";

const WorkloadWrapper: FC = () => {
    const {department} = useAuth();

    useEffect(() => {
        return () => {
            alert("Ви покинули сесію розподілу");
        };
    }, []);

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

    return <WorkloadStepper/>;
};


export default WorkloadWrapper;

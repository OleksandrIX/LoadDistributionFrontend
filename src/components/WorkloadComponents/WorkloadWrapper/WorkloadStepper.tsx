import {FC} from "react";
import {Box, ButtonGroup, Flex, IconButton} from "@chakra-ui/react";
import {CheckCircleIcon, ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";
import {
    Step,
    StepIcon,
    StepIndicator,
    StepNumber,
    Stepper,
    StepSeparator,
    StepStatus,
    StepTitle,
    useSteps
} from "@chakra-ui/stepper";


import {WorkloadStepperElement} from "./workload.stepper";

interface WorkloadStepperProps {
    steps: WorkloadStepperElement[];
}

const WorkloadStepper: FC<WorkloadStepperProps> = ({steps}) => {
    const {activeStep, setActiveStep} = useSteps({
        index: 0,
        count: steps.length
    });

    return (
        <Flex alignItems="start" gap={2}>
            <Box style={{
                position: "sticky",
                top: 0
            }}>
                <Stepper index={activeStep} orientation="vertical">
                    {steps.map((step, index) => (
                        <Step key={`step_${step.title}_${index}`}>
                            <StepIndicator>
                                <StepStatus
                                    complete={<StepIcon/>}
                                    incomplete={<StepNumber/>}
                                    active={<StepNumber/>}
                                />
                            </StepIndicator>

                            <Box flexShrink="0">
                                <StepTitle>{step.title}</StepTitle>
                            </Box>

                            <StepSeparator/>
                        </Step>
                    ))}
                </Stepper>
                <ButtonGroup colorScheme="brand" px={2} justifyContent="space-between">
                    <IconButton
                        w="100%"
                        isDisabled={activeStep === 0}
                        onClick={() => setActiveStep(activeStep - 1)}
                        aria-label="Попередній крок"
                        icon={<ChevronLeftIcon h={6} w={6}/>}
                    />

                    <IconButton
                        w="100%"
                        onClick={() => steps.length - 1 === activeStep
                            ? alert("FINISHED")
                            : setActiveStep(activeStep + 1)}
                        aria-label={steps.length - 1 === activeStep
                            ? "Завершити"
                            : "Наступний крок"}
                        icon={steps.length - 1 === activeStep
                            ? <CheckCircleIcon h={6} w={6}/>
                            : <ChevronRightIcon h={6} w={6}/>}
                    />
                </ButtonGroup>
            </Box>

            <Box flex={1}>
                {steps[activeStep].element}
            </Box>
        </Flex>
    );
};

export default WorkloadStepper;

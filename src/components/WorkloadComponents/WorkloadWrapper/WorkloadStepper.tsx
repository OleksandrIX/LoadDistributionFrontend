import {FC} from "react";
import {Box, Button, ButtonGroup, Stack} from "@chakra-ui/react";
import {
    Step,
    StepDescription,
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
        <Stack spacing={4}>
            <Stepper index={activeStep}>
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
                            <StepDescription>{step.description}</StepDescription>
                        </Box>

                        <StepSeparator/>
                    </Step>
                ))}
            </Stepper>

            <ButtonGroup colorScheme="brand" px={10} justifyContent="space-between">
                <Button
                    isDisabled={activeStep === 0}
                    onClick={() => setActiveStep(activeStep - 1)}
                >
                    Попередній крок
                </Button>

                <Button
                    onClick={() =>
                        steps.length - 1 === activeStep
                            ? alert("FINISHED")
                            : setActiveStep(activeStep + 1)
                    }
                >
                    {steps.length - 1 === activeStep ? "Завершити" : "Наступний крок"}
                </Button>
            </ButtonGroup>

            {steps[activeStep].element}
        </Stack>
    );
};

export default WorkloadStepper;

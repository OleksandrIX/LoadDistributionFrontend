import {FC} from "react";
import {Box, Heading, ListItem, UnorderedList} from "@chakra-ui/react";

interface CurriculumErrorProps {
    curriculumErrors: string[][];
}

const CurriculumError: FC<CurriculumErrorProps> = ({curriculumErrors}) => {
    return (
        <Box>
            <Heading size="sm" color="orange.800">Помилки під час зчитування даних з файлу</Heading>
            <UnorderedList py={2}>
                {curriculumErrors.map((error, index) =>
                    <ListItem key={`error-text-${index}`}>{error[0]}</ListItem>
                )}
            </UnorderedList>
        </Box>
    );
};

export default CurriculumError;

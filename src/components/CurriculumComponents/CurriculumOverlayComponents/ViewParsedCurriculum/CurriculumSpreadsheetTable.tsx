import {FC, useState} from "react";
import {Box, IconButton, Stack, Text} from "@chakra-ui/react";
import {ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";

import {CurriculumSpreadsheetBlock} from "entities/curriculum";
import CurriculumSpreadsheetTableBlock from "./CurriculumSpreadsheetTableBlock";

interface CurriculumSpreadsheetTableProps {
    curriculumSpreadsheetBlocks: CurriculumSpreadsheetBlock[];
}

const CurriculumSpreadsheetTable: FC<CurriculumSpreadsheetTableProps> = ({curriculumSpreadsheetBlocks}) => {
    const [currentPage, setCurrentPage] = useState<number>(0);

    const handlePrevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevState => prevState - 1);
        }
    };
    const handleNextPage = () => {
        if (currentPage < curriculumSpreadsheetBlocks.length - 1) {
            setCurrentPage(prevState => prevState + 1);
        }
    };

    return (
        <Box>
            <Text textAlign="center">Сторінка {currentPage + 1} з {curriculumSpreadsheetBlocks.length}</Text>
            <Stack direction="row" alignItems="center" spacing={4}>
                <IconButton
                    colorScheme="brand"
                    aria-label="Попередня сторінка"
                    icon={<ChevronLeftIcon h={6} w={6}/>}
                    isDisabled={currentPage === 0}
                    onClick={handlePrevPage}
                />

                <CurriculumSpreadsheetTableBlock
                    curriculumSpreadsheetBlock={curriculumSpreadsheetBlocks[currentPage]}
                />

                <IconButton
                    colorScheme="brand"
                    aria-label="Наступна сторінка"
                    icon={<ChevronRightIcon/>}
                    isDisabled={currentPage === curriculumSpreadsheetBlocks.length - 1}
                    onClick={handleNextPage}
                />
            </Stack>
        </Box>
    );
};

export default CurriculumSpreadsheetTable;

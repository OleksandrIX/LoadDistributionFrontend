import {FC} from "react";
import {IconButton, Stack, Text, Tooltip} from "@chakra-ui/react";
import {ArrowLeftIcon, ArrowRightIcon, ChevronLeftIcon, ChevronRightIcon} from "@chakra-ui/icons";

interface TablePaginationLayoutProps {
    pageIndex: number;
    pageCount: number;
    canNextPage: boolean;
    canPreviousPage: boolean;
    nextPage: () => void;
    previousPage: () => void;
    gotoPage: (page: number) => void;
}

const TablePaginationLayout: FC<TablePaginationLayoutProps> = (
    {
        pageIndex,
        pageCount,
        canNextPage,
        canPreviousPage,
        nextPage,
        previousPage,
        gotoPage
    }
) => {
    return (
        <Stack mt={3} direction="row" w="100%" justifyContent="center" alignItems="center">
            <Tooltip label="Перша сторінка">
                <IconButton
                    aria-label="Перша сторінка"
                    isDisabled={!canPreviousPage}
                    onClick={() => gotoPage(0)}
                    icon={<ArrowLeftIcon/>}
                />
            </Tooltip>

            <Tooltip label="Попередня сторінка">
                <IconButton
                    aria-label="Попередня сторінка"
                    isDisabled={!canPreviousPage}
                    onClick={previousPage}
                    icon={<ChevronLeftIcon h={6} w={6}/>}
                />
            </Tooltip>

            <Text>
                Сторінка <b>{pageIndex + 1}</b> з <b>{pageCount}</b>
            </Text>

            <Tooltip label="Наступна сторінка">
                <IconButton
                    aria-label="Наступна сторінка"
                    isDisabled={!canNextPage}
                    onClick={nextPage}
                    icon={<ChevronRightIcon h={6} w={6}/>}
                />
            </Tooltip>

            <Tooltip label="Останя сторінка">
                <IconButton
                    aria-label="Останя сторінка"
                    isDisabled={!canNextPage}
                    onClick={() => gotoPage(pageCount - 1)}
                    icon={<ArrowRightIcon/>}
                />
            </Tooltip>
        </Stack>
    );
};

export default TablePaginationLayout;

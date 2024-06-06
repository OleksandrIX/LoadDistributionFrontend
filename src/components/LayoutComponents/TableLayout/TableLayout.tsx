import {FC} from "react";
import {Table, TableContainer, Tbody, Th, Thead, Tr} from "@chakra-ui/table";
import {ChevronDownIcon, ChevronUpIcon} from "@chakra-ui/icons";

import {Column, Row, useExpanded, usePagination, useSortBy, useTable} from "react-table";
import TablePaginationLayout from "./TablePaginationLayout";

interface TableLayoutProps<T extends object> {
    headerFontSize?: string;
    defaultPageIndex?: number;
    defaultPageSize?: number;
    data: T[];
    columns: Column<T>[];
    RowComponent: FC<{ row: Row<T> }>;
}

const TableLayout = <T extends object>(
    {
        headerFontSize = "xs",
        defaultPageIndex = 0,
        defaultPageSize = 10,
        columns,
        data,
        RowComponent
    }: TableLayoutProps<T>
) => {
    const {
        page,
        pageCount,
        headerGroups,
        canNextPage,
        canPreviousPage,
        gotoPage,
        prepareRow,
        nextPage,
        previousPage,
        getTableProps,
        getTableBodyProps,
        state: {pageIndex}
    } = useTable<T>({
            columns, data,
            initialState: {pageIndex: defaultPageIndex, pageSize: defaultPageSize}
        },
        useSortBy,
        useExpanded,
        usePagination
    );

    return (
        <TableContainer>
            <Table {...getTableProps()} size="sm" variant="striped" colorScheme="brand" layout="fixed">
                <Thead bgColor="brand.200">
                    {headerGroups.map((headerGroup) =>
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) =>
                                <Th {...column.getHeaderProps(column.getSortByToggleProps())}
                                    w={column.width}
                                    p={0}
                                    py={1}
                                    border="1px solid white"
                                    fontSize={headerFontSize}
                                    textAlign="center"
                                    whiteSpace="break-spaces">
                                    {column.render("Header")}
                                    {column.isSorted
                                        ? column.isSortedDesc
                                            ? <ChevronDownIcon ml={1} w={4} h={4}/>
                                            : <ChevronUpIcon ml={1} w={4} h={4}/>
                                        : ""}
                                </Th>
                            )}
                        </Tr>
                    )}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {page.map((row: Row<T>) => {
                        prepareRow(row);
                        return <RowComponent key={row.getRowProps().key} row={row}/>;
                    })}
                </Tbody>
            </Table>

            <TablePaginationLayout
                pageIndex={pageIndex}
                pageCount={pageCount}
                canNextPage={canNextPage}
                canPreviousPage={canPreviousPage}
                nextPage={nextPage}
                previousPage={previousPage}
                gotoPage={gotoPage}
            />
        </TableContainer>
    );
};

export default TableLayout;

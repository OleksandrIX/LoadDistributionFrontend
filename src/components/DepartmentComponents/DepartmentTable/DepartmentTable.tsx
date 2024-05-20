import {FC, Fragment, useMemo} from "react";
import {Column, useTable} from "react-table";
import {Tooltip} from "@chakra-ui/react";
import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/table";

import {Department} from "entities/department";
import DepartmentContextMenu from "../DepartmentContextMenu/DepartmentContextMenu";

interface DepartmentTableProps {
    departments: Department[];
}

interface DepartmentTableData {
    department_code: string;
    department_name: string;
    total_teachers: number;
    academic_workload: number;
}

const DepartmentTable: FC<DepartmentTableProps> = ({departments}) => {
    const departmentsData: DepartmentTableData[] = departments.map((department, index) => ({
        department_code: department.department_code,
        department_name: department.department_name,
        total_teachers: index + 1,
        academic_workload: index + 1
    }));

    const columns: Column<DepartmentTableData>[] = useMemo(() => [
        {
            Header: "Номер кафедри",
            accessor: "department_code",
            Cell: ({value}: { value: string }) => <Td textAlign="center">{value}</Td>,
            width: "15%"
        },
        {
            Header: "Назва кафедри",
            accessor: "department_name",
            Cell: ({value}: { value: string }) => (
                <Td overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                    <Tooltip label={value}>
                        <span>{value}</span>
                    </Tooltip>
                </Td>
            ),
            width: "50%"
        },
        {
            Header: "Всього НПП",
            accessor: "total_teachers",
            Cell: ({value}: { value: number }) => <Td textAlign="center">{value}</Td>,
            width: "15%"
        },
        {
            Header: "Навчальне навантаження",
            accessor: "academic_workload",
            Cell: ({value}: { value: number }) => <Td textAlign="center">{value}</Td>,
            width: "20%"
        }
    ], []);

    const {
        headerGroups,
        rows,
        getTableProps,
        getTableBodyProps,
        prepareRow
    } = useTable<DepartmentTableData>({columns: columns, data: departmentsData});

    return (
        <TableContainer>
            <Table {...getTableProps()} size="sm" variant="striped" colorScheme="brand" layout="fixed">
                <Thead bgColor="brand.200">
                    {headerGroups.map((headerGroup) =>
                        <Tr {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((column) => {
                                return <Th {...column.getHeaderProps()} w={column.width} textAlign="center"
                                           whiteSpace="break-spaces">
                                    {column.render("Header")}
                                </Th>;
                            })}
                        </Tr>
                    )}
                </Thead>
                <Tbody {...getTableBodyProps()}>
                    {rows.map((row) => {
                        prepareRow(row);
                        return <DepartmentContextMenu key={row.getRowProps().key}>
                            {(ref) =>
                                <Tr ref={ref} {...row.getRowProps()}>
                                    {row.cells.map((cell) =>
                                        <Fragment key={cell.getCellProps().key}>
                                            {cell.render("Cell")}
                                        </Fragment>
                                    )}
                                </Tr>
                            }
                        </DepartmentContextMenu>;
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    );
};

export default DepartmentTable;

import {FC, useMemo} from "react";
import {Column} from "react-table";
import {Td, Tooltip} from "@chakra-ui/react";

import {Department} from "entities/department";
import {TableLayout} from "components/LayoutComponents";
import DepartmentTableRow from "./DepartmentTableRow";

interface DepartmentTableProps {
    departments: Department[];
}

const DepartmentTable: FC<DepartmentTableProps> = ({departments}) => {
    const columns: Column<Department>[] = useMemo(() => [
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
            Cell: () => <Td textAlign="center">1</Td>,
            width: "15%"
        },
        {
            Header: "Навчальне навантаження",
            Cell: () => <Td textAlign="center">1</Td>,
            width: "20%"
        }
    ], []);

    return (
        <TableLayout
            data={departments}
            columns={columns}
            RowComponent={DepartmentTableRow}
        />
    );
};

export default DepartmentTable;

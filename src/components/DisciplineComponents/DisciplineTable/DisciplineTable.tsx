import {FC, Fragment, useMemo} from "react";
import {Column, Row} from "react-table";
import {Td, Tooltip, Tr} from "@chakra-ui/react";

import {ResponseAcademicWorkload, ResponseDiscipline} from "entities/discipline";
import {TableLayout} from "components/LayoutComponents";
import DisciplineContextMenu from "../DisciplineContextMenu/DisciplineContextMenu";

interface DisciplineTableProps {
    disciplines: ResponseDiscipline[];
}

const DisciplineTable: FC<DisciplineTableProps> = ({disciplines}) => {
    const columns: Column<ResponseDiscipline>[] = useMemo(() => [
        {
            Header: "Назва",
            accessor: "discipline_name",
            Cell: ({value}: { value: string }) => (
                <Td fontSize="xs"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap">
                    <Tooltip label={value}>
                        {value}
                    </Tooltip>
                </Td>
            )
        },
        {
            Header: "Кредити",
            accessor: "credits",
            width: "10%",
            Cell: ({value}: { value: number }) => <Td isNumeric>{value}</Td>
        },
        {
            Header: "Години",
            accessor: "hours",
            width: "10%",
            Cell: ({value}: { value: number }) => <Td isNumeric>{value}</Td>
        },
        {
            Header: "Навчальне навантаження",
            accessor: "academic_workload",
            width: "30%",
            Cell: ({value}: { value: ResponseAcademicWorkload }) => {
                const totalWorkload = Object.values(value)
                    .reduce((acc, hours) => typeof hours === "number" ? acc + hours : acc, 0);
                return <Td isNumeric>{totalWorkload.toFixed(2)}</Td>;
            }
        }
    ], []);

    return (
        <>
            <TableLayout
                headerFontSize="sm"
                data={disciplines}
                columns={columns}
                RowComponent={({row}: { row: Row<ResponseDiscipline> }) => (
                    <DisciplineContextMenu key={row.original.id} discipline={row.original}>
                        {(ref) =>
                            <Tr ref={ref} {...row.getRowProps()}>
                                {row.cells.map((cell) =>
                                    <Fragment key={cell.getCellProps().key}>
                                        {cell.render("Cell")}
                                    </Fragment>
                                )}
                            </Tr>
                        }
                    </DisciplineContextMenu>
                )}
            />
        </>
    );
};

export default DisciplineTable;

import {FC, Fragment, useMemo} from "react";
import {Column, Row} from "react-table";
import {Td, Tooltip, Tr} from "@chakra-ui/react";

import {ResponseEducationComponent} from "entities/discipline";
import {TableLayout} from "components/LayoutComponents";

interface DisciplineTableProps {
    disciplines: ResponseEducationComponent[];
}

const DisciplineTable: FC<DisciplineTableProps> = ({disciplines}) => {
    const columns: Column<ResponseEducationComponent>[] = useMemo(() => [
        {
            Header: "Код ОК",
            accessor: "education_component_code",
            Cell: ({value}: { value: string }) => <Td p={0} textAlign="center">{value}</Td>
        },
        {
            Header: "Назва ОК",
            accessor: "education_component_name",
            Cell: ({value}: { value: string }) => (
                <Td p={0}
                    fontSize="xs"
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
            Cell: ({value}: { value: number }) => <Td isNumeric>{value}</Td>
        },
        {
            Header: "Години",
            accessor: "hours",
            Cell: ({value}: { value: number }) => <Td isNumeric>{value}</Td>
        }
    ], []);


    return (
        <TableLayout
            headerFontSize="sm"
            data={disciplines}
            columns={columns}
            RowComponent={({row}: { row: Row<ResponseEducationComponent> }) => (
                <Tr {...row.getRowProps()}>
                    {row.cells.map((cell) =>
                        <Fragment key={cell.getCellProps().key}>
                            {cell.render("Cell")}
                        </Fragment>
                    )}
                </Tr>
            )}
        />
    );
};

export default DisciplineTable;

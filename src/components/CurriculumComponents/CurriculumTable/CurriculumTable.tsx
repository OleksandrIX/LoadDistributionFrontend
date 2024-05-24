import {FC, useMemo} from "react";
import {Column, Row} from "react-table";
import {Td, Tooltip} from "@chakra-ui/react";

import {CurriculumFile} from "entities/curriculum";
import {TableLayout} from "components/LayoutComponents";
import {formatFileSize} from "utils/file";
import CurriculumTableRow from "./CurriculumTableRow";


interface CurriculumTableProps {
    curriculums: CurriculumFile[];
    onDelete: (filename: string) => void;
}

const CurriculumTable: FC<CurriculumTableProps> = ({curriculums, onDelete}) => {
    const columns: Column<CurriculumFile>[] = useMemo(() => [
        {
            Header: "Назва файлу",
            accessor: "filename",
            Cell: ({value}: { value: string }) => (
                <Td maxW={200}
                    overflow="hidden"
                    textOverflow="ellipsis"
                    whiteSpace="nowrap">
                    <Tooltip label={value}>
                        <span>{value}</span>
                    </Tooltip>
                </Td>
            )
        },
        {
            Header: "Розмір файлу",
            accessor: "size",
            Cell: ({value}: { value: number }) => <Td isNumeric>{formatFileSize(value)}</Td>
        }
    ], []);

    return (
        <TableLayout
            defaultPageSize={3}
            data={curriculums}
            columns={columns}
            RowComponent={({row}: { row: Row<CurriculumFile> }) => (
                <CurriculumTableRow
                    row={row}
                    onDelete={onDelete}
                />
            )}
        />
    );
};

export default CurriculumTable;

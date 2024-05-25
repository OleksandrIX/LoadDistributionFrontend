import {FC, Fragment, useMemo} from "react";
import {Column, Row} from "react-table";
import {Td, Tr} from "@chakra-ui/react";

import {EducationDegree} from "types/enums";
import {ResponseStudyGroup} from "entities/group";
import {TableLayout} from "components/LayoutComponents";

interface StudyGroupTableProps {
    studyGroups: ResponseStudyGroup[];
}

const StudyGroupTable: FC<StudyGroupTableProps> = ({studyGroups}) => {
    const columns: Column<ResponseStudyGroup>[] = useMemo(() => [
        {
            Header: "Код групи",
            accessor: "group_code",
            Cell: ({value}: { value: string }) => <Td textAlign="center">{value}</Td>
        },
        {
            Header: "Курс навчання",
            accessor: "course_study",
            Cell: ({value}: { value: number }) => <Td isNumeric>{value}</Td>
        },
        {
            Header: "Освітній рівень",
            accessor: "education_degree",
            Cell: ({value}: { value: EducationDegree }) => <Td textAlign="center">{value}</Td>
        },
        {
            Header: "Кількість слухачв",
            accessor: "number_listeners",
            Cell: ({value}: { value: number }) => <Td isNumeric>{value}</Td>
        }
    ], []);

    return (
        <TableLayout
            data={studyGroups}
            columns={columns}
            RowComponent={({row}: { row: Row<ResponseStudyGroup> }) => (
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

export default StudyGroupTable;

import {FC, Fragment, useMemo} from "react";

import {StudyGroup} from "entities/studyGroups";
import {TableLayout} from "../../LayoutComponents";
import {Column, Row} from "react-table";
import {Td, Tr} from "@chakra-ui/react";
import {EducationDegree} from "../../../types/enums";

interface StudyGroupTableProps {
    studyGroups: StudyGroup[];
}

const StudyGroupTable: FC<StudyGroupTableProps> = ({studyGroups}) => {
    const columns: Column<StudyGroup>[] = useMemo(() => [
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
            RowComponent={({row}: { row: Row<StudyGroup> }) => (
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

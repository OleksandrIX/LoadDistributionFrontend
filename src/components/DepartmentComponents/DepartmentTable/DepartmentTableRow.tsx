import {FC, Fragment} from "react";
import {Tr} from "@chakra-ui/table";
import {Row} from "react-table";

import {DepartmentWithTeachers} from "entities/department";
import DepartmentContextMenu from "../DepartmentContextMenu/DepartmentContextMenu";

interface DepartmentTableRowProps {
    row: Row<DepartmentWithTeachers>
}

const DepartmentTableRow: FC<DepartmentTableRowProps> = ({row}) => {
    return (
        <DepartmentContextMenu>
            {(ref) =>
                <Tr ref={ref} {...row.getRowProps()}>
                    {row.cells.map((cell) =>
                        <Fragment key={cell.getCellProps().key}>
                            {cell.render("Cell")}
                        </Fragment>
                    )}
                </Tr>
            }
        </DepartmentContextMenu>
    );
};

export default DepartmentTableRow;

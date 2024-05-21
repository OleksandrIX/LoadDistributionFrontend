import {FC} from "react";
import {Column} from "react-table";

import {DepartmentTableData} from "entities/department";
import {TableLayout} from "components/LayoutComponents";
import DepartmentTableRow from "./DepartmentTableRow";

interface DepartmentTableProps {
    departments: DepartmentTableData[];
    columns: Column<DepartmentTableData>[];
}

const DepartmentTable: FC<DepartmentTableProps> = (
    {
        departments,
        columns
    }
) => {
    return (
        <TableLayout
            data={departments}
            columns={columns}
            RowComponent={DepartmentTableRow}
        />
    );
};

export default DepartmentTable;

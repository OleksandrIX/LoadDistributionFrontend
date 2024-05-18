import {ChangeEvent, FC} from "react";
import {Select} from "@chakra-ui/react";

import {ReportingType} from "types/enums";

interface ReportingTypeSelectProps {
    value: ReportingType;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const ReportingTypeSelect: FC<ReportingTypeSelectProps> = ({value, onChange}) => {
    return (
        <Select value={value} onChange={onChange}>
            {Object.values(ReportingType).map((label) => (
                <option key={label} value={label}>{label}</option>
            ))}
        </Select>
    );
};

export default ReportingTypeSelect;

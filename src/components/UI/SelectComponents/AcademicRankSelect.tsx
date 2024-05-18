import {ChangeEvent, FC} from "react";
import {Select} from "@chakra-ui/react";

import {AcademicRank} from "types/enums";

interface AcademicRankSelectProps {
    value: AcademicRank | undefined;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const AcademicRankSelect: FC<AcademicRankSelectProps> = ({value, onChange}) => {
    return (
        <Select onChange={onChange} defaultValue={value}>
            <option value={undefined}>Немає</option>
            {Object.values(AcademicRank).map((label) => (
                <option key={label} value={label}>{label}</option>
            ))}
        </Select>
    );
};

export default AcademicRankSelect;

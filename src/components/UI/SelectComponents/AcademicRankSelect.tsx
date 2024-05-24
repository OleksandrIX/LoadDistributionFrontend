import {ChangeEvent, FC} from "react";
import {Select} from "@chakra-ui/react";

import {AcademicRank} from "types/enums";

interface AcademicRankSelectProps {
    value: AcademicRank | null;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const AcademicRankSelect: FC<AcademicRankSelectProps> = ({value, onChange}) => {
    return (
        <Select defaultValue={value !== null ? value : undefined} onChange={onChange}>
            <option value="null">Немає</option>
            {Object.values(AcademicRank).map((label) => (
                <option key={label} value={label}>{label}</option>
            ))}
        </Select>
    );
};

export default AcademicRankSelect;

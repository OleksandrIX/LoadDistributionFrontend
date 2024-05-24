import {ChangeEvent, FC} from "react";
import {Select} from "@chakra-ui/react";

import {MilitaryRank} from "types/enums";

interface MilitaryRankSelectProps {
    value: MilitaryRank | null;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const MilitaryRankSelect: FC<MilitaryRankSelectProps> = ({value, onChange}) => {
    return (
        <Select defaultValue={value !== null ? value : undefined} onChange={onChange}>
            {Object.values(MilitaryRank).map((label) => (
                <option key={label} value={label}>{label}</option>
            ))}
        </Select>
    );
};

export default MilitaryRankSelect;

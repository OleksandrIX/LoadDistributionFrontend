import {ChangeEvent, FC} from "react";
import {Select} from "@chakra-ui/react";

import {ScientificDegree} from "types/enums";

interface ScientificDegreeSelectProps {
    value: ScientificDegree | null;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const ScientificDegreeSelect: FC<ScientificDegreeSelectProps> = ({value, onChange}) => {
    return (
        <Select defaultValue={value !== null ? value : undefined} onChange={onChange}>
            <option value="null">Немає</option>
            {Object.values(ScientificDegree).map((label) => (
                <option key={label} value={label}>{label}</option>
            ))}
        </Select>
    );
};

export default ScientificDegreeSelect;

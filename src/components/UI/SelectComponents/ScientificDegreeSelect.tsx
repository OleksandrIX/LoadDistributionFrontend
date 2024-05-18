import {ChangeEvent, FC} from "react";
import {Select} from "@chakra-ui/react";

import {ScientificDegree} from "types/enums";

interface ScientificDegreeSelectProps {
    value: ScientificDegree | undefined;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const ScientificDegreeSelect: FC<ScientificDegreeSelectProps> = ({value, onChange}) => {
    return (
        <Select onChange={onChange} defaultValue={value}>
            <option value={undefined}>Немає</option>
            {Object.values(ScientificDegree).map((label) => (
                <option key={label} value={label}>{label}</option>
            ))}
        </Select>
    );
};

export default ScientificDegreeSelect;

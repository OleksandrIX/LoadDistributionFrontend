import {ChangeEvent, FC} from "react";
import {Select} from "@chakra-ui/react";

import {Position} from "types/enums";

interface PositionSelectProps {
    value: Position;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const PositionSelect: FC<PositionSelectProps> = ({value, onChange}) => {
    return (
        <Select defaultValue={value} onChange={onChange}>
            {Object.values(Position).map((label) => (
                <option key={label} value={label}>{label}</option>
            ))}
        </Select>
    );
};

export default PositionSelect;

import {ChangeEvent, FC} from "react";
import {Select} from "@chakra-ui/react";

import {EducationDegree} from "types/enums";

interface EducationDegreeSelectProps {
    value: EducationDegree;
    onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

const EducationDegreeSelect: FC<EducationDegreeSelectProps> = ({value, onChange}) => {
    return (
        <Select value={value} onChange={onChange}>
            {Object.values(EducationDegree).map((label) => (
                <option key={label} value={label}>{label}</option>
            ))}
        </Select>
    );
};

export default EducationDegreeSelect;

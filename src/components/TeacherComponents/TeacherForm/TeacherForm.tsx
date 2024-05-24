import {FormEvent, RefObject} from "react";
import {Stack} from "@chakra-ui/react";
import {Input} from "@chakra-ui/input";
import {Switch} from "@chakra-ui/switch";
import {Button, ButtonGroup} from "@chakra-ui/button";
import {NumberInput, NumberInputField} from "@chakra-ui/number-input";
import {FormControl, FormLabel} from "@chakra-ui/form-control";

import {BaseTeacher} from "entities/teacher";
import {AcademicRank, MilitaryRank, Position, ScientificDegree} from "types/enums";
import {AcademicRankSelect, MilitaryRankSelect, PositionSelect, ScientificDegreeSelect} from "components/UI";

interface TeacherFormProps<T extends BaseTeacher> {
    initialRef: RefObject<HTMLInputElement>;
    teacher: T;
    onChange: (teacher: T) => void;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    isEdit?: boolean;
    onClose: () => void;
}

const TeacherForm = <T extends BaseTeacher>(
    {
        initialRef,
        isEdit = false,
        teacher,
        onChange,
        onSubmit,
        onClose
    }: TeacherFormProps<T>
) => {
    const handleChange = <K extends keyof T>(field: K, value: T[K]) => {
        onChange({...teacher, [field]: value === "null" ? null : value});
    };

    const handleChangeIsCivilian = () => {
        const updatedTeacher = {
            ...teacher,
            is_civilian: !teacher.is_civilian
        } as T;
        if (updatedTeacher.is_civilian) {
            updatedTeacher.military_rank = null;
            updatedTeacher.years_of_service = null;
        } else {
            updatedTeacher.military_rank = MilitaryRank.MAJOR;
            updatedTeacher.years_of_service = 10;
        }
        onChange(updatedTeacher);
    };

    return (
        <form onSubmit={onSubmit}>
            <Stack spacing={4}>
                <Stack direction="row">
                    <FormControl isRequired>
                        <FormLabel>Прізвище</FormLabel>
                        <Input
                            ref={initialRef}
                            type="text"
                            placeholder="Прізвище..."
                            value={teacher.last_name}
                            onChange={(e) => handleChange("last_name", e.target.value)}
                            minLength={3}
                            maxLength={30}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>Ім&apos;я</FormLabel>
                        <Input
                            type="text"
                            placeholder="Ім'я..."
                            value={teacher.first_name}
                            onChange={(e) => handleChange("first_name", e.target.value)}
                            minLength={3}
                            maxLength={30}
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>По батькові</FormLabel>
                        <Input
                            type="text"
                            placeholder="По батькові..."
                            value={teacher.middle_name}
                            onChange={(e) => handleChange("middle_name", e.target.value)}
                            minLength={3}
                            maxLength={30}
                        />
                    </FormControl>
                </Stack>

                <FormControl display="flex" gap={2}>
                    <FormLabel>Цивільний викладач</FormLabel>
                    <Switch
                        size="md"
                        isChecked={teacher.is_civilian}
                        onChange={handleChangeIsCivilian}
                    />
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Ставка викладача</FormLabel>
                    <NumberInput
                        value={teacher.teacher_rate}
                        onChange={(_, valueAsNumber) => handleChange("teacher_rate", valueAsNumber)}
                        precision={2}
                        step={0.05}
                        min={0.25}
                        max={5.00}
                    >
                        <NumberInputField/>
                    </NumberInput>
                </FormControl>

                <FormControl isRequired>
                    <FormLabel>Посада викладача</FormLabel>
                    <PositionSelect
                        value={teacher.position}
                        onChange={(e) => handleChange("position", e.target.value as Position)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Вчене звання</FormLabel>
                    <AcademicRankSelect
                        value={teacher.academic_rank}
                        onChange={(e) => handleChange("academic_rank", e.target.value as AcademicRank)}
                    />
                </FormControl>

                <FormControl>
                    <FormLabel>Науковий ступінь</FormLabel>
                    <ScientificDegreeSelect
                        value={teacher.scientific_degree}
                        onChange={(e) => handleChange("scientific_degree", e.target.value as ScientificDegree)}
                    />
                </FormControl>

                <FormControl isDisabled={teacher.is_civilian}>
                    <FormLabel>Військове звання</FormLabel>
                    <MilitaryRankSelect
                        value={teacher.military_rank}
                        onChange={(e) => handleChange("military_rank", e.target.value as MilitaryRank)}
                    />
                </FormControl>

                <FormControl isDisabled={teacher.is_civilian}>
                    <FormLabel>Вислуга років</FormLabel>
                    <NumberInput
                        value={teacher.years_of_service !== null ? teacher.years_of_service : undefined}
                        onChange={(_, valueAsNumber) => handleChange("years_of_service", valueAsNumber)}
                        min={1}
                        max={50}
                    >
                        <NumberInputField/>
                    </NumberInput>
                </FormControl>
            </Stack>

            <ButtonGroup colorScheme="brand" w="100%" justifyContent="flex-end" mt={4} spacing={2}>
                <Button variant="outline" onClick={onClose}>Відмінити</Button>
                <Button type="submit">{isEdit ? "Зберегти" : "Додати"}</Button>
            </ButtonGroup>
        </form>
    );
};

export default TeacherForm;

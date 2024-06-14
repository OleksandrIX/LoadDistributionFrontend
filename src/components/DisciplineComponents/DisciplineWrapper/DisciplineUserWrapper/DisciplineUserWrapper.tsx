import {ChangeEvent, FC, useEffect, useState} from "react";
import {Flex, Heading, Select, Stack} from "@chakra-ui/react";

import {Department} from "entities/department";
import {ResponseDiscipline} from "entities/discipline";
import DisciplineTable from "../../DisciplineTable/DisciplineTable";

interface DisciplineUserWrapperProps {
    department: Department;
    disciplines: ResponseDiscipline[];
}

const DisciplineUserWrapper: FC<DisciplineUserWrapperProps> = ({department, disciplines}) => {
    const [dataOfYearsArray, setDataOfYearsArray] = useState<string[]>([]);
    const [selectedDataOfYears, setSelectedDataOfYears] = useState<string>("");

    const handleSelectDataOfYears = (event: ChangeEvent<HTMLSelectElement>) =>
        setSelectedDataOfYears(event.target.value);

    useEffect(() => {
        const possibleDataOfYears: string[] = [];
        for (const discipline of disciplines) {
            !possibleDataOfYears.includes(discipline.data_of_years)
            && possibleDataOfYears.push(discipline.data_of_years);
        }
        possibleDataOfYears.sort((a, b) => {
            const startYear = parseInt(a.split("-")[0]);
            const endYear = parseInt(b.split("-")[1]);
            return startYear - endYear;
        });
        setDataOfYearsArray(possibleDataOfYears);
        setSelectedDataOfYears(possibleDataOfYears[0]);
    }, []);

    return (
        <Stack spacing={4}>
            <Flex my={2} align="center">
                <Select w="fit-content" defaultValue={selectedDataOfYears} onChange={handleSelectDataOfYears}>
                    {dataOfYearsArray.map((dataOfYear) =>
                        <option key={dataOfYear} value={dataOfYear}>{dataOfYear}</option>
                    )}
                </Select>

                <Heading textAlign="center" size="sm" flex={1}>
                    {department.department_code} {department.department_name}
                </Heading>
            </Flex>
            <DisciplineTable
                disciplines={disciplines.filter((discipline) =>
                    discipline.data_of_years === selectedDataOfYears && discipline
                )}
            />
        </Stack>
    );
};

export default DisciplineUserWrapper;

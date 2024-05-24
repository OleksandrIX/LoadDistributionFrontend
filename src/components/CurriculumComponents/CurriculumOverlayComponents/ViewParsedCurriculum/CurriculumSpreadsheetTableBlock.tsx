import {FC, Fragment, useMemo} from "react";
import {Column, Row} from "react-table";
import {Box, Stack, Td, Text, Tooltip, Tr} from "@chakra-ui/react";

import {ReportingType} from "types/enums";
import {CurriculumSpreadsheetBlock} from "entities/curriculum";
import {EducationComponent, AcademicHours, AcademicTask} from "entities/discipline";
import {TableLayout} from "components/LayoutComponents";

interface CurriculumSpreadsheetTableBlockProps {
    curriculumSpreadsheetBlock: CurriculumSpreadsheetBlock;
}

const CurriculumSpreadsheetTableBlock: FC<CurriculumSpreadsheetTableBlockProps> = ({curriculumSpreadsheetBlock}) => {
    const columns: Column<EducationComponent>[] = useMemo(() => {
        const educationComponentColumns = [
            {
                Header: "Код ОК",
                accessor: "education_component_code",
                Cell: ({value}: { value: string }) => <Td p={0} textAlign="center">{value}</Td>
            },
            {
                Header: "Назва ОК",
                accessor: "education_component_name",
                Cell: ({value}: { value: string }) => (
                    <Td p={0}
                        fontSize="xs"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap">
                        <Tooltip label={value}>
                            {value}
                        </Tooltip>
                    </Td>
                )
            },
            {
                Header: "Кафедра",
                accessor: "department",
                Cell: ({value}: { value: number }) => <Td isNumeric>{value}</Td>
            },
            {
                Header: "Кредити",
                accessor: "credits",
                Cell: ({value}: { value: number }) => <Td isNumeric>{value}</Td>
            },
            {
                Header: "Години",
                accessor: "hours",
                Cell: ({value}: { value: number }) => <Td isNumeric>{value}</Td>
            }
        ];

        const firstSemesterColumns = [
            {
                Header: "Загальна",
                accessor: "semesters[0].total_amount_hours",
                Cell: ({value}: { value: number }) => (
                    <Td isNumeric>{value ? value : "-"}</Td>
                )
            },
            {
                Header: "Тип звітності",
                accessor: "semesters[0].reporting_type",
                Cell: ({value}: { value: ReportingType | null }) => (
                    value
                        ? <Td p={0}
                              fontSize="xs"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap">
                            <Tooltip label={value}>
                                {value}
                            </Tooltip>
                        </Td>
                        : <Td></Td>
                )
            },
            {
                Header: "Аудиторні години",
                accessor: "semesters[0].academic_hours",
                Cell: ({value}: { value: AcademicHours }) => {
                    if (!value) {
                        return <Td textAlign="center">-</Td>;
                    }

                    const {
                        amount_classroom_hours,
                        lecture_hours,
                        group_hours,
                        practical_hours,
                        self_study_hours
                    } = value;

                    const cellValue = (
                        <ul>
                            <li>Аудиторні години: {amount_classroom_hours}</li>
                            <li>Лекції: {lecture_hours}</li>
                            <li>Групові заняття: {group_hours}</li>
                            <li>Практичні заняття: {practical_hours}</li>
                            <li>Самостійна робота: {self_study_hours}</li>
                        </ul>
                    );

                    return (
                        <Td textAlign="center">
                            <Tooltip label={cellValue}>
                                <span>{value.amount_classroom_hours}</span>
                            </Tooltip>
                        </Td>
                    );
                }
            },
            {
                Header: "Академічні завдання",
                accessor: "semesters[0].academic_task",
                Cell: ({value}: { value: AcademicTask }) => {
                    if (!value) {
                        return <Td textAlign="center">-</Td>;
                    }

                    const {essays, calculation_graphic_works, modular_control_works, term_papers} = value;
                    const totalTasks = essays + calculation_graphic_works + modular_control_works + term_papers;

                    const cellValue = (
                        <ul>
                            <li>Рефератів: {essays}</li>
                            <li>РГР: {calculation_graphic_works}</li>
                            <li>МКР: {modular_control_works}</li>
                            <li>Курсові роботи: {term_papers}</li>
                        </ul>
                    );

                    return (
                        <Td textAlign="center">
                            <Tooltip label={cellValue}>
                                <span>{totalTasks}</span>
                            </Tooltip>
                        </Td>
                    );
                }
            }
        ];

        const secondSemesterColumns = [
            {
                Header: "Загальна кількість годин",
                accessor: "semesters[1].total_amount_hours",
                Cell: ({value}: { value: number }) => (
                    <Td isNumeric>{value ? value : "-"}</Td>
                )
            },
            {
                Header: "Тип звітності",
                accessor: "semesters[1].reporting_type",
                Cell: ({value}: { value: ReportingType | null }) => (
                    value
                        ? <Td p={0}
                              fontSize="xs"
                              overflow="hidden"
                              textOverflow="ellipsis"
                              whiteSpace="nowrap">
                            <Tooltip label={value}>
                                {value}
                            </Tooltip>
                        </Td>
                        : <Td>-</Td>
                )
            },
            {
                Header: "Аудиторні години",
                accessor: "semesters[1].academic_hours",
                Cell: ({value}: { value: AcademicHours }) => {
                    if (!value) {
                        return <Td textAlign="center">-</Td>;
                    }

                    const {
                        amount_classroom_hours,
                        lecture_hours,
                        group_hours,
                        practical_hours,
                        self_study_hours
                    } = value;

                    const cellValue = (
                        <ul>
                            <li>Аудиторні години: {amount_classroom_hours}</li>
                            <li>Лекції: {lecture_hours}</li>
                            <li>Групові заняття: {group_hours}</li>
                            <li>Практичні заняття: {practical_hours}</li>
                            <li>Самостійна робота: {self_study_hours}</li>
                        </ul>
                    );

                    return (
                        <Td textAlign="center">
                            <Tooltip label={cellValue}>
                                <span>{value.amount_classroom_hours}</span>
                            </Tooltip>
                        </Td>
                    );
                }
            },
            {
                Header: "Академічні завдання",
                accessor: "semesters[1].academic_task",
                Cell: ({value}: { value: AcademicTask }) => {
                    if (!value) {
                        return <Td textAlign="center">-</Td>;
                    }

                    const {essays, calculation_graphic_works, modular_control_works, term_papers} = value;
                    const totalTasks = essays + calculation_graphic_works + modular_control_works + term_papers;

                    const cellValue = (
                        <ul>
                            <li>Рефератів: {essays}</li>
                            <li>РГР: {calculation_graphic_works}</li>
                            <li>МКР: {modular_control_works}</li>
                            <li>Курсові роботи: {term_papers}</li>
                        </ul>
                    );

                    return (
                        <Td textAlign="center">
                            <Tooltip label={cellValue}>
                                <span>{totalTasks}</span>
                            </Tooltip>
                        </Td>
                    );
                }
            }
        ];

        return [
            {
                Header: "Загальні дані",
                columns: [
                    {
                        Header: "Освітня компонента",
                        columns: educationComponentColumns
                    }
                ]
            },
            {
                Header: "Семестри",
                columns: [
                    {
                        Header: "1 семестр",
                        columns: firstSemesterColumns
                    },
                    {
                        Header: "2 семестр",
                        columns: secondSemesterColumns
                    }
                ]
            }
        ];
    }, []);

    return (
        <Stack spacing={4}>
            <Stack spacing={2}>
                <Box>
                    <b>Спеціальність: </b> {curriculumSpreadsheetBlock.specialty}
                </Box>

                <Text>
                    <b>Спеціалізація: </b> {curriculumSpreadsheetBlock.specialization}
                </Text>
                <Stack direction="row" spacing={4}>
                    <Text><b>Курс навчання: </b> {curriculumSpreadsheetBlock.course_study}</Text>
                    <Text><b>Освітній рівень: </b> {curriculumSpreadsheetBlock.education_degree}</Text>
                    <Text><b>Навчальні групи: </b> {curriculumSpreadsheetBlock.study_groups}</Text>
                </Stack>
            </Stack>
            <TableLayout
                headerFontSize="2xs"
                data={curriculumSpreadsheetBlock.education_components}
                columns={columns}
                RowComponent={({row}: { row: Row<EducationComponent> }) => (
                    <Tr {...row.getRowProps()}>
                        {row.cells.map((cell) =>
                            <Fragment key={cell.getCellProps().key}>
                                {cell.render("Cell")}
                            </Fragment>
                        )}
                    </Tr>
                )}
            />
        </Stack>
    );
};

export default CurriculumSpreadsheetTableBlock;

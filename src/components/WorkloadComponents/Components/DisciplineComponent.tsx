import {FC} from "react";

import {ResponseTeacher} from "entities/teacher";
import {ResponseDiscipline} from "entities/discipline";

interface DisciplineComponentProps {
    discipline: ResponseDiscipline;
    teachers: ResponseTeacher[];
}

const DisciplineComponent: FC<DisciplineComponentProps> = () => {
    return (<></>);
    // const [selectedLecture, setSelectedLecture] = useState<ResponseTeacher | null>(null);
    // const [selectedTeacherForGroup, setSelectedTeacherForGroup] = useState<TeacherMap>(
    //     // discipline.study_groups.reduce<TeacherMap>((acc, group) => {
    //     //     acc[group.group_code] = null;
    //     //     return acc;
    //     // }, {})
    // );

    // const handleSelectLecture = (teacher: ResponseTeacher) => setSelectedLecture(teacher);
    // const handleSelectTeacherForGroup = (group: string, teacher: ResponseTeacher) => {
    //     setSelectedTeacherForGroup(prevState => ({
    //         ...prevState,
    //         [group]: teacher
    //     }));
    // };

    // {/*<Stack>*/}
    // {/*    <Flex alignItems="center" gap={4}>*/}
    // {/*        <Heading size="sm">Виберіть лектора:</Heading>*/}
    // {/*        <Menu>*/}
    // {/*            <MenuButton*/}
    // {/*                p={2}*/}
    // {/*                borderWidth="1px"*/}
    // {/*                borderStyle="solid"*/}
    // {/*                borderColor="brand.300"*/}
    // {/*                borderRadius="lg"*/}
    // {/*                w="250px" h="50px"*/}
    // {/*                cursor="pointer"*/}
    // {/*                textAlign="center"*/}
    // {/*                lineHeight="1.5rem"*/}
    // {/*            >*/}
    // {/*                {selectedLecture*/}
    // {/*                    ? <b>*/}
    // {/*                        {selectedLecture.last_name} {selectedLecture.first_name.at(0)}.{selectedLecture.middle_name.at(0)}.*/}
    // {/*                    </b>*/}
    // {/*                    : <b>Вибрати викладача</b>}*/}
    // {/*            </MenuButton>*/}
    // {/*            <MenuList>*/}
    // {/*                {teachers.map((teacher) =>*/}
    // {/*                    <MenuItem key={teacher.id} onClick={() => handleSelectLecture(teacher)}>*/}
    // {/*                        {teacher.last_name} {teacher.first_name} {teacher.middle_name}*/}
    // {/*                    </MenuItem>*/}
    // {/*                )}*/}
    // {/*            </MenuList>*/}
    // {/*        </Menu>*/}
    // {/*    </Flex>*/}
    // {/*    {discipline.study_groups.map((group) =>*/}
    // {/*        <Flex key={`${discipline.id}_group_${group.group_code}`} alignItems="center" gap={4}>*/}
    // {/*            <Heading size="sm">Виберіть викладача для {group.group_code} навчальної групи:</Heading>*/}
    // {/*            <Menu>*/}
    // {/*                <MenuButton*/}
    // {/*                    p={2}*/}
    // {/*                    borderWidth="1px"*/}
    // {/*                    borderStyle="solid"*/}
    // {/*                    borderColor="brand.300"*/}
    // {/*                    borderRadius="lg"*/}
    // {/*                    w="250px" h="50px"*/}
    // {/*                    cursor="pointer"*/}
    // {/*                    textAlign="center"*/}
    // {/*                    lineHeight="1.5rem"*/}
    // {/*                >*/}
    // {/*                    {selectedTeacherForGroup[group.group_code]*/}
    // {/*                        ? (<Text>*/}
    // {/*                            <b>{selectedTeacherForGroup[group.group_code]!.last_name}</b>*/}
    // {/*                            <b> {selectedTeacherForGroup[group.group_code]!.first_name.at(0)}.</b>*/}
    // {/*                            <b>{selectedTeacherForGroup[group.group_code]!.middle_name.at(0)}.</b>*/}
    // {/*                        </Text>)*/}
    // {/*                        : <b>Вибрати викладача</b>}*/}
    // {/*                </MenuButton>*/}
    // {/*                <MenuList>*/}
    // {/*                    {teachers.map((teacher) =>*/}
    // {/*                        <MenuItem*/}
    // {/*                            key={teacher.id}*/}
    // {/*                            onClick={() => handleSelectTeacherForGroup(group.group_code, teacher)}*/}
    // {/*                        >*/}
    // {/*                            {teacher.last_name} {teacher.first_name} {teacher.middle_name}*/}
    // {/*                        </MenuItem>*/}
    // {/*                    )}*/}
    // {/*                </MenuList>*/}
    // {/*            </Menu>*/}
    // {/*        </Flex>*/}
    // {/*    )}*/}
    // {/*</Stack>*/}
    //
    // {/*<Stack flex={1}>*/}
    // {/*    <Stack spacing={4}>*/}
    // {/*        <Box>*/}
    // {/*            <Flex alignItems="center" gap={2}>*/}
    // {/*                <Heading size="md">Лектор:</Heading>*/}
    // {/*                <Text>*/}
    // {/*                    {selectedLecture*/}
    // {/*                        ? (*/}
    // {/*                            <b>*/}
    // {/*                                {selectedLecture.last_name} {selectedLecture.first_name} {selectedLecture.middle_name}*/}
    // {/*                            </b>*/}
    // {/*                        )*/}
    // {/*                        : <i>Лектора не обрано</i>}*/}
    // {/*                </Text>*/}
    // {/*            </Flex>*/}
    // {/*            <Flex alignItems="center" gap={2}>*/}
    // {/*                <Heading size="md">Аудитрне навантаження:</Heading>*/}
    // {/*                <Text>*/}
    // {/*                    {selectedLecture*/}
    // {/*                        ? (*/}
    // {/*                            <b>*/}
    // {/*                                {*/}
    // {/*                                    (discipline.workload.lecture_hours * discipline.lecture_flow) +*/}
    // {/*                                    Object.values(selectedTeacherForGroup).reduce<number>((acc, teacher) => {*/}
    // {/*                                        if (teacher && teacher.id === selectedLecture.id) {*/}
    // {/*                                            acc += discipline.workload.group_hours;*/}
    // {/*                                            acc += discipline.workload.practical_hours;*/}
    // {/*                                        }*/}
    // {/*                                        return acc;*/}
    // {/*                                    }, 0)*/}
    // {/*                                } годин*/}
    // {/*                            </b>*/}
    // {/*                        )*/}
    // {/*                        : <i>Лектора не обрано</i>}*/}
    // {/*                </Text>*/}
    // {/*            </Flex>*/}
    // {/*        </Box>*/}
    //
    // {/*        {Object.values(selectedTeacherForGroup).reduce<JSX.Element[]>((acc, selectedTeacher) => {*/}
    // {/*            if (selectedTeacher && selectedTeacher.id !== selectedLecture?.id && !acc.some(element => element.key === selectedTeacher.id)) {*/}
    // {/*                acc.push(*/}
    // {/*                    <Box key={selectedTeacher.id}>*/}
    // {/*                        <Flex alignItems="center" gap={2}>*/}
    // {/*                            <Heading size="md">Викладач:</Heading>*/}
    // {/*                            <Text><b>{selectedTeacher.last_name} {selectedTeacher.first_name} {selectedTeacher.middle_name}</b></Text>*/}
    // {/*                        </Flex>*/}
    // {/*                        <Flex alignItems="center" gap={2}>*/}
    // {/*                            <Heading size="md">Аудиторне навантаження:</Heading>*/}
    // {/*                            <Text>*/}
    // {/*                                {*/}
    // {/*                                    Object.values(selectedTeacherForGroup).reduce<number>((acc, teacher) => {*/}
    // {/*                                        if (teacher && teacher.id === selectedTeacher.id) {*/}
    // {/*                                            acc += discipline.workload.group_hours;*/}
    // {/*                                            acc += discipline.workload.practical_hours;*/}
    // {/*                                        }*/}
    // {/*                                        return acc;*/}
    // {/*                                    }, 0)*/}
    // {/*                                } годин*/}
    // {/*                            </Text>*/}
    // {/*                        </Flex>*/}
    // {/*                    </Box>*/}
    // {/*                );*/}
    // {/*            }*/}
    // {/*            return acc;*/}
    // {/*        }, [])}*/}
    // {/*    </Stack>*/}
    // {/*</Stack>*/}
};

export default DisciplineComponent;

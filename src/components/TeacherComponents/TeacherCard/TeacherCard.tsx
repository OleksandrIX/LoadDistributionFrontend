import {FC} from "react";
import {Heading, Stack, StackDivider, Text} from "@chakra-ui/react";
import {Card, CardBody, CardFooter, CardHeader} from "@chakra-ui/card";

import {Teacher} from "entities/teacher/types/teacher.type";

interface TeacherCardProps {
    teacher: Teacher;
}

const TeacherCard: FC<TeacherCardProps> = ({teacher}) => {
    return (
        <Card boxShadow="">
            <CardHeader textAlign="center">
                <Heading size="xl">
                    {teacher.first_name} {teacher.last_name.toUpperCase()}
                </Heading>
            </CardHeader>
            <CardBody>
                <Stack divider={<StackDivider h="1px" bg="gray.300"/>}>
                    <Text>
                        <b>ПІБ:</b> {teacher.last_name} {teacher.first_name} {teacher.middle_name}
                    </Text>
                    {teacher.is_civilian && <b>Працівник ЗСУ</b>}
                    <Text>
                        <b>Ставка:</b> {teacher.teacher_rate}
                    </Text>
                    <Text>
                        <b>Посада:</b> {teacher.position}
                    </Text>
                    {!teacher.is_civilian && <Text>
                        <b>Військове звання:</b> {teacher.military_rank}
                    </Text>}
                    {!teacher.is_civilian && <Text>
                        <b>Вислуга років:</b> {teacher.years_of_service} років
                    </Text>}
                    <Text>
                        <b>Вчене звання: </b>
                        {teacher.academic_rank
                            ? teacher.academic_rank
                            : <i>Немає</i>}
                    </Text>
                    <Text>
                        <b>Науковий ступінь: </b>
                        {teacher.scientific_degree
                            ? teacher.scientific_degree
                            : <i>Немає</i>}
                    </Text>
                </Stack>
            </CardBody>
            <CardFooter></CardFooter>
        </Card>
    );
};

export default TeacherCard;

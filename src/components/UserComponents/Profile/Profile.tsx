import {FC} from "react";
import {Box, Button, ButtonGroup, Card, CardBody, Stack, StackDivider, Text} from "@chakra-ui/react";

import {Department} from "entities/department/types/department.type";
import {User} from "entities/user/types/user.type";

interface ProfileProps {
    user: User;
    department: Department;
}

const Profile: FC<ProfileProps> = ({user, department}) => {
    return (
        <Card align="center">
            <CardBody>
                <Stack divider={<StackDivider h="1px" bg="gray.100"/>} spacing={4}>
                    <Box>
                        <Text fontSize="md">
                            <b>Ім&apos;я корисутвача: </b>
                            <i> {user && user.username}</i>
                        </Text>
                        <Text fontSize="md">
                            <b>Пошта: </b>
                            <i> {user && user.email}</i>
                        </Text>
                        <ButtonGroup mt={2} spacing={4} colorScheme="brand">
                            <Button>Редагувати</Button>
                            <Button>Змінити пароль</Button>
                        </ButtonGroup>
                    </Box>

                    <Box>
                        <Text fontSize="md">
                            <b>Номер кафедри: </b>
                            <i> {department && department.department_code}</i>
                        </Text>
                        <Text fontSize="md">
                            <b>Назва кафедри: </b>
                            <i> {department && department.department_name}</i>
                        </Text>
                        <ButtonGroup mt={2} spacing={4} colorScheme="brand">
                            <Button>Редагувати</Button>
                        </ButtonGroup>
                    </Box>
                </Stack>
            </CardBody>
        </Card>
    );
};

export default Profile;

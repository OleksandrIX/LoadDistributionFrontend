import {FC} from "react";
import {Box, Button, ButtonGroup, Card, CardBody, Heading, Stack, StackDivider, Text} from "@chakra-ui/react";

import {useAuth} from "app/provider";

const Profile: FC = () => {
    const {user, department, isAdmin} = useAuth();

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

                    {department
                        ? <Box>
                            <Text fontSize="md">
                                <b>Номер кафедри: </b>
                                <i> {department.department_code}</i>
                            </Text>
                            <Text fontSize="md">
                                <b>Назва кафедри: </b>
                                <i> {department.department_name}</i>
                            </Text>
                            <ButtonGroup mt={2} spacing={4} colorScheme="brand">
                                <Button>Редагувати</Button>
                            </ButtonGroup>
                        </Box>
                        : (!isAdmin && <Box
                            textAlign="center"
                            borderWidth="1px"
                            borderColor="brand.200"
                            borderStyle="solid"
                            borderRadius="lg"
                        >
                            <Heading px={5} py={1} size="xs" fontStyle="italic">Вам ще не призначили кафедру</Heading>
                        </Box>)
                    }
                </Stack>
            </CardBody>
        </Card>
    );
};

export default Profile;

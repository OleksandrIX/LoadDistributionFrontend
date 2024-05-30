import {FC} from "react";
import {
    Box,
    Flex,
    Heading,
    Image,
    Select,
    SimpleGrid,
    Stack,
    Tab,
    TabList,
    TabPanel,
    TabPanels,
    Tabs
} from "@chakra-ui/react";
import {Department} from "entities/department";
import IndividualPlanContextMenu from "../IndividualPlanContextMenu/IndividualPlanContextMenu";
import {images, departmentPlan} from "assets/media/plans";

interface IndividualPlanWrapperProps {
    department?: Department;
}

interface IndividualPlanType {
    id: string;
    teacher: string;
    img?: string;
}

const IndividualPlanWrapper: FC<IndividualPlanWrapperProps> = () => {
    const plans: IndividualPlanType[] = [
        {
            id: "c2460d65-67fa-4592-95cf-f7f98edd337b",
            teacher: "Бовда Едуард Миколайович",
            img: "bovda"
        },
        {
            id: "549b5402-d6f7-4fda-a968-9e000fa20859",
            teacher: "Горбенко Володимир Іванович",
            img: "gorbenko"
        },
        {
            id: "8c6332c7-5c3b-49f7-99c5-1f503cddd6af",
            teacher: "Гріньков Володимир Олександрович",
            img: "grinkov"
        },
        {
            id: "db571719-c96c-4596-94e0-b649e7b4b899",
            teacher: "Задворний Андрій Васильович",
            img: "zadvornuy"
        },
        {
            id: "a0b42bb7-dcae-4217-a5e0-632532e8d1b3",
            teacher: "Клименко Віктор Михайлович",
            img: "klumneko"
        },
        {
            id: "149b75a1-8e41-4298-9020-8ae89b1b3e02",
            teacher: "Легкобит Володимир Сергійович",
            img: "lehkobut"
        },
        {
            id: "e0d3fbc7-6922-4ce2-ae2d-37a3d5511c08",
            teacher: "Любарський Сергій Володимирович"
        },
        {
            id: "507c4f0e-f6d1-4b47-9d4b-6aab957401af",
            teacher: "Макарчук Олександр Мусійович"
        },
        {
            id: "7a363c84-2760-450c-9efb-4a6dffbf18ef",
            teacher: "Налісний Геннадій Іванович"
        },
        {
            id: "a0a29ac0-05e3-4fbd-8f33-a72754fa12d3",
            teacher: "Нестеренко Микола Миколайович"
        },
        {
            id: "5983bf9d-c1c8-40e2-aba8-36fc865c2f21",
            teacher: "Редзюк Євгеній Володимирович"
        },
        {
            id: "2374bd9e-7d25-4c65-9888-5f8fbed74038",
            teacher: "Романенко Сергій Олексійович"
        },
        {
            id: "20237eae-9138-4f79-8f02-f7cb5307f8cd",
            teacher: "Самохвалов Юрій Якович"
        },
        {
            id: "151cc310-f238-4d33-bc1d-0fc7b18e6603",
            teacher: "Стемпковська Яна Андріївна"
        },
        {
            id: "cb342930-f0d3-45af-94a2-189457c89177",
            teacher: "Стоцький Іван Володимирович"
        },
        {
            id: "585d1a50-3f13-42ba-86c1-18a98adf8d02",
            teacher: "Тетерятник Ігор Вікторович"
        },
        {
            id: "138f0c17-caa0-4e6a-875d-6357977df440",
            teacher: "Успенський Олександр Анатолійович"
        },
        {
            id: "c3245346-e4e6-4186-b63d-4cbf252918e4",
            teacher: "Фесьоха Надія Олександрівна"
        },
        {
            id: "30185e8b-dfc7-417b-99ec-b433ff18ea84",
            teacher: "Фесьоха Віталій Вікторович"
        },
        {
            id: "f0eee38b-695d-4938-84b4-290874451bf3",
            teacher: "Шарнін Сергій Анатолійович"
        }
    ];

    return (
        <Stack spacing={4} mb={4}>
            <Tabs variant="soft-rounded" colorScheme="brand">
                <TabList fontSize="sm">
                    <Tab>Індивідуальний план роботи викладача</Tab>
                    <Tab>План роботи кафедри</Tab>
                </TabList>

                <TabPanels>
                    <TabPanel>
                        <Flex mx={10} mb={4} alignItems="center" gap={4}>
                            <Heading size="sm">Плани за:</Heading>
                            <Select width="30%">
                                <option selected>2023-2024</option>
                                <option>2022-2023</option>
                            </Select>
                        </Flex>

                        <SimpleGrid columns={{base: 1, custom1: 2, custom2: 3}} spacing={4}>
                            {plans.map((plan) =>
                                <IndividualPlanContextMenu key={plan.id}>
                                    {
                                        (ref) =>
                                            <Box ref={ref}>
                                                <Image
                                                    mb={2}
                                                    borderWidth="1px"
                                                    borderStyle="solid"
                                                    borderColor="#383373"
                                                    borderRadius="lg"
                                                    src={plan.img ? images[plan.img] : images["bovda"]}
                                                    alt={plan.teacher}
                                                />
                                                <Heading size="sm" textAlign="center">{plan.teacher}</Heading>
                                            </Box>
                                    }
                                </IndividualPlanContextMenu>
                            )}
                        </SimpleGrid>
                    </TabPanel>

                    <TabPanel>
                        <Flex mx={10} mb={4} alignItems="center" gap={4}>
                            <Heading size="sm">Плани за:</Heading>
                            <Select width="30%">
                                <option selected>2023-2024</option>
                                <option>2022-2023</option>
                            </Select>
                        </Flex>

                        <Box display="flex" flexDirection="column" alignItems="center">
                            <Image
                                mb={2}
                                borderWidth="1px"
                                borderStyle="solid"
                                borderColor="#383373"
                                borderRadius="lg"
                                src={departmentPlan}
                                alt="План роботи кафедри"
                            />
                            <Heading size="sm" textAlign="center">План роботи кафедри на 2023-2024 навчальний
                                рік</Heading>
                        </Box>
                    </TabPanel>
                </TabPanels>

            </Tabs>
        </Stack>
    );
};

export default IndividualPlanWrapper;

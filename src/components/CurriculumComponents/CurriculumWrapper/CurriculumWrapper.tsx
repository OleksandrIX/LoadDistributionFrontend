import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {useToast} from "@chakra-ui/toast";
import {Box, Heading, Select, Stack, Tooltip} from "@chakra-ui/react";
import {Table, TableContainer, Tbody, Td, Th, Thead, Tr} from "@chakra-ui/table";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {CurriculumFile, CurriculumService} from "entities/curriculum";
import {Loader} from "components/UI";

const formatFileSize = (size: number): string => {
    if (size < 1024) return `${size} B`;
    const units = ["KiB", "MiB"];
    let unitIndex = -1;
    let formattedSize = size;
    do {
        formattedSize /= 1024;
        unitIndex++;
    } while (formattedSize >= 1024 && unitIndex < units.length - 1);
    return `${formattedSize.toFixed(1)} ${units[unitIndex]}`;
};

const CurriculumWrapper: FC = () => {
    const idCurriculumToast = "curriculum-toast";
    const curriculumToast = useToast({id: idCurriculumToast});

    const {refreshToken} = useAuth();
    const [curriculums, setCurriculums] = useState<CurriculumFile[]>();
    const [isCurriculumLoading, setIsCurriculumLoading] = useState<boolean>(true);

    const fetchCurriculums = useCallback(async () => {
        try {
            setIsCurriculumLoading(true);
            const curriculumService = new CurriculumService();
            const curriculumsData = await curriculumService.getAllCurriculums();
            setCurriculums(curriculumsData);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, curriculumToast, idCurriculumToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        } finally {
            setIsCurriculumLoading(false);
        }
    }, [curriculumToast, refreshToken]);

    useEffect(() => {
        !curriculums && fetchCurriculums().then();
    }, [curriculums, fetchCurriculums]);

    if (isCurriculumLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    if (!curriculums) {
        return <Box
            h="100%"
            mt="10%"
            display="flex"
            alignItems="start"
            justifyContent="center"
        >
            <Heading
                px={10} py={1}
                size="md"
                textAlign="center"
                borderWidth="1px"
                borderColor="brand.200"
                borderStyle="solid"
                borderRadius="lg"
                fontStyle="italic"
            >Робочих навчальних планів немає</Heading>
        </Box>;
    }

    return (
        <TableContainer>
            <Table variant="striped" colorScheme="brand" layout="fixed">
                <Thead bgColor="brand.200">
                    <Tr>
                        <Th>Filename</Th>
                        <Th isNumeric>Size (bytes)</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {curriculums.map((curriculum, index) => (
                        <Tr key={index}>
                            <Td maxW={200} overflow="hidden" textOverflow="ellipsis" whiteSpace="nowrap">
                                <Tooltip label={curriculum.filename}>
                                    <span>{curriculum.filename}</span>
                                </Tooltip>
                            </Td>
                            <Td isNumeric>{formatFileSize(curriculum.size)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            <Select>
                {curriculums.map((curriculum) =>
                    <option key={curriculum.filename} value={curriculum.filename}>{curriculum.filename}</option>
                )}
            </Select>
        </TableContainer>
    );
};

export default CurriculumWrapper;

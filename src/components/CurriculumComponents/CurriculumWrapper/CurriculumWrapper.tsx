import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Box, Heading, Select, Stack, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {Loader} from "components/UI";
import {CurriculumFile, CurriculumService} from "entities/curriculum";
import CurriculumTable from "../CurriculumTable/CurriculumTable";
import UploadCurriculum from "./UploadCurriculum";

const CurriculumWrapper: FC = () => {
    const idCurriculumToast = "curriculum-toast";
    const curriculumToast = useToast({id: idCurriculumToast});

    const {refreshToken} = useAuth();
    const [curriculums, setCurriculums] = useState<CurriculumFile[]>([]);
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

    const handleUploadCurriculum = (uploadedCurriculum: CurriculumFile) => {
        setCurriculums(prevCurriculums => {
            const existingIndex = prevCurriculums.findIndex(curriculum =>
                curriculum.filename === uploadedCurriculum.filename);
            if (existingIndex !== -1) {
                const updatedCurriculums = [...prevCurriculums];
                updatedCurriculums[existingIndex] = uploadedCurriculum;
                return updatedCurriculums;
            } else {
                return [...prevCurriculums, uploadedCurriculum];
            }
        });
    };

    const handleDeleteCurriculum = (filename: string) => {
        const updatedCurriculums = curriculums.filter(curriculum => curriculum.filename !== filename);
        setCurriculums(updatedCurriculums);
    };

    useEffect(() => {
        isCurriculumLoading && fetchCurriculums().then();
    }, [isCurriculumLoading, fetchCurriculums]);

    if (isCurriculumLoading) {
        return (
            <Stack h="100%" align="center" justify="center">
                <Loader/>
            </Stack>
        );
    }

    return (
        <Stack spacing={4}>
            <Stack>
                <UploadCurriculum
                    idCurriculumToast={idCurriculumToast}
                    curriculumToast={curriculumToast}
                    onUpload={handleUploadCurriculum}
                />

                {
                    curriculums.length > 0
                        ? <CurriculumTable
                            curriculums={curriculums}
                            onDelete={handleDeleteCurriculum}
                        />
                        : <Box
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
                        </Box>
                }
            </Stack>

            <Stack>
                {
                    curriculums.length > 0 && (
                        <Select>
                            {curriculums.map((curriculum) =>
                                <option key={curriculum.filename} value={curriculum.filename}>
                                    {curriculum.filename}
                                </option>
                            )}
                        </Select>
                    )
                }
            </Stack>
        </Stack>
    );
};

export default CurriculumWrapper;

import axios from "axios";
import {FC, useCallback, useEffect, useState} from "react";
import {Box, Heading, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {ResponseStudyGroup, StudyGroupService} from "entities/group";
import StudyGroupTable from "../StudyGroupTable/StudyGroupTable";

const StudyGroupWrapper: FC = () => {
    const idStudyGroupToast = "study-group-toast";
    const studyGroupToast = useToast({id: idStudyGroupToast});

    const {refreshToken} = useAuth();
    const [studyGroups, setStudyGroups] = useState<ResponseStudyGroup[]>([]);
    const [isLoadingStudyGroups, setIsLoadingStudyGroups] = useState<boolean>(true);

    const fetchStudyGroups = useCallback(async () => {
        try {
            const studyGroupService = new StudyGroupService();
            const studyGroupData = await studyGroupService.getAllStudyGroups();
            setStudyGroups(studyGroupData);
        } catch (err) {
            if (err && axios.isAxiosError(err) && err.response) {
                if (err.response.status === 401) {
                    await refreshToken();
                } else {
                    handleAxiosError(err, studyGroupToast, idStudyGroupToast, {
                        401: "Ви не авторизовані",
                        403: "Відмовлено у доступі"
                    });
                }
            } else {
                console.error(err);
            }
        } finally {
            setIsLoadingStudyGroups(false);
        }
    }, [refreshToken, studyGroupToast]);

    useEffect(() => {
        isLoadingStudyGroups && fetchStudyGroups().then();
    }, [isLoadingStudyGroups, fetchStudyGroups]);

    return (
        studyGroups.length > 0
            ? <StudyGroupTable studyGroups={studyGroups}/>
            : (
                <Box
                    h="100%"
                    mt="10%"
                    display="flex"
                    alignItems="start"
                    justifyContent="center"
                >
                    <Heading
                        px={5} py={1}
                        size="md"
                        textAlign="center"
                        borderWidth="1px"
                        borderColor="brand.200"
                        borderStyle="solid"
                        borderRadius="lg"
                        fontStyle="italic"
                    >Навчальних груп немає</Heading>
                </Box>
            )
    );
};

export default StudyGroupWrapper;

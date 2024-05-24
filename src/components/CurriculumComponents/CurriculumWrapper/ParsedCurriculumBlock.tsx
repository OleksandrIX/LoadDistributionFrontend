import axios from "axios";
import {ChangeEvent, FC, useState} from "react";
import {Button, ButtonGroup, Heading, Select, Stack, useToast, useDisclosure} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {CurriculumFile, CurriculumService, ParsedCurriculum} from "entities/curriculum";
import {handleAxiosError} from "utils/error.handlers";
import ViewParsedCurriculum from "../CurriculumOverlayComponents/ViewParsedCurriculum/ViewParsedCurriculum";

interface ParsedCurriculumBlockProps {
    curriculums: CurriculumFile[];
}

const ParsedCurriculumBlock: FC<ParsedCurriculumBlockProps> = ({curriculums}) => {
    const idParsedCurriculum = "parsed-curriculum-toast";
    const parsedCurriculumPromiseToast = useToast();
    const parsedCurriculumToast = useToast({id: idParsedCurriculum});

    const {refreshToken} = useAuth();
    const {isOpen, onOpen, onClose} = useDisclosure();
    const [selectedCurriculum, setSelectedCurriculum] = useState<CurriculumFile>(curriculums[0]);
    const [parsedCurriculum, setParsedCurriculum] = useState<ParsedCurriculum>();

    const handleChangeCurriculum = (event: ChangeEvent<HTMLSelectElement>) => {
        const newSelectedCurriculum = curriculums.find(curriculum => curriculum.filename === event.target.value);
        newSelectedCurriculum && setSelectedCurriculum(newSelectedCurriculum);
    };

    const handleParsedCurriculum = () => {
        const parsedCurriculumPromise = new Promise<void>(async (resolve, reject) => {
            try {
                const curriculumService = new CurriculumService();
                const data = await curriculumService.parseCurriculum(selectedCurriculum.filename);
                setParsedCurriculum(data);
                resolve();
            } catch (err) {
                console.log(err);
                if (err && axios.isAxiosError(err) && err.response) {
                    if (err.response.status === 401) {
                        await refreshToken();
                    } else {
                        handleAxiosError(err, parsedCurriculumToast, idParsedCurriculum, {});
                    }
                } else {
                    console.error(err);
                }
                reject();
            }
        });

        parsedCurriculumPromiseToast.promise(parsedCurriculumPromise, {
            success: {
                title: "Успішно зчитано",
                description: `Файл ${selectedCurriculum.filename} успішно зчитано`
            },
            error: {
                title: "Помилка при зчитуванні",
                description: `Помилка при зчитуванні файлу ${selectedCurriculum.filename}`
            },
            loading: {
                title: "Файл зчитується. Не покидайте сторінку.",
                description: `Файл ${selectedCurriculum.filename} зчитується.`
            }
        });
    };

    return (
        <Stack
            mt={5}
            mx={10}
            gap={5}
        >
            <Heading size="md" textAlign="center">{selectedCurriculum.filename}</Heading>
            <Select defaultValue={selectedCurriculum.filename} onChange={handleChangeCurriculum}>
                {curriculums.map((curriculum) =>
                    <option
                        key={curriculum.filename}
                        value={curriculum.filename}
                    >
                        {curriculum.filename}
                    </option>
                )}
            </Select>
            <ButtonGroup justifyContent="center">
                <Button
                    colorScheme="green"
                    onClick={handleParsedCurriculum}
                >
                    Зчитати
                </Button>

                <Button
                    colorScheme="blue"
                    isDisabled={!parsedCurriculum}
                    onClick={onOpen}
                >
                    Переглянути дані
                </Button>
            </ButtonGroup>

            {parsedCurriculum &&
                <ViewParsedCurriculum isOpen={isOpen} onClose={onClose} parsedCurriculum={parsedCurriculum}/>}
        </Stack>
    );
};

export default ParsedCurriculumBlock;

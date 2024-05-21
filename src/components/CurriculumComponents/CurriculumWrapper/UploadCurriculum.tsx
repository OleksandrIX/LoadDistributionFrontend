import {ChangeEvent, FC, useRef} from "react";
import {CreateToastFnReturn, IconButton, Input} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {displayToast} from "utils/toast";
import {handleAxiosError} from "utils/error.handlers";
import {UploadIcon} from "components/UI";
import {CurriculumFile, CurriculumService} from "entities/curriculum";
import axios from "axios";

interface UploadCurriculumProps {
    idCurriculumToast: string;
    curriculumToast: CreateToastFnReturn;
    onUpload: (curriculum: CurriculumFile) => void;
}

const UploadCurriculum: FC<UploadCurriculumProps> = (
    {
        idCurriculumToast,
        curriculumToast,
        onUpload
    }
) => {
    const {refreshToken} = useAuth();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleUploadCurriculumFile = () => fileInputRef.current && fileInputRef.current.click();

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const fileExtension = file.name.split(".").pop();
            if (fileExtension && ["xls", "xlsx", "ods"].includes(fileExtension)) {
                try {
                    const formData = new FormData();
                    const curriculumService = new CurriculumService();
                    formData.append("file", file);
                    const curriculum = await curriculumService.uploadCurriculum(formData);
                    displayToast(curriculumToast, idCurriculumToast, {
                        status: "success",
                        title: "Файл завантажено",
                        description: file.name
                    });
                    onUpload(curriculum);
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
                }
            } else {
                displayToast(curriculumToast, idCurriculumToast, {
                    status: "error",
                    title: "Неправильний формат файлу",
                    description: "Будь ласка, завантажте файл з розширенням .xls, .xlsx або .ods."
                });
            }
        }
    };

    return (
        <>
            <Input
                type="file"
                accept=".xls,.xlsx,.ods"
                ref={fileInputRef}
                display="none"
                onChange={handleFileChange}
            />
            <IconButton
                colorScheme="brand"
                aria-label="Загрузити файл"
                icon={<UploadIcon h={6} w={6}/>}
                onClick={handleUploadCurriculumFile}
            />
        </>
    );
};

export default UploadCurriculum;

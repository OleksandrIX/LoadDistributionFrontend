import {FC, Fragment} from "react";
import {Row} from "react-table";
import {Tr, useDisclosure, useToast} from "@chakra-ui/react";

import {useAuth} from "app/provider";
import {handleAxiosError} from "utils/error.handlers";
import {displayToast} from "utils/toast";
import {CurriculumFile, CurriculumService} from "entities/curriculum";
import CurriculumContextMenu from "../CurriculumContextMenu/CurriculumContextMenu";
import DeleteCurriculum from "../CurriculumOverlayComponents/DeleteCurriculum";


interface CurriculumTableRowProps {
    row: Row<CurriculumFile>;
    onDelete: (filename: string) => void;
}

const CurriculumTableRow: FC<CurriculumTableRowProps> = ({row, onDelete}) => {
    const idDeleteToast = "delete-curriculum-toast";
    const curriculumToast = useToast();
    const deleteCurriculumToast = useToast({id: idDeleteToast});
    const {refreshToken} = useAuth();

    const {isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete} = useDisclosure();

    const handleDownloadCurriculum = (filename: string) => {
        const downloadPromise = new Promise(async (resolve, reject) => {
            try {
                const curriculumService = new CurriculumService();
                const fileBlob = await curriculumService.downloadCurriculum(filename);
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(fileBlob);
                link.setAttribute("download", filename);
                document.body.appendChild(link);
                link.click();
                link.remove();
                resolve("Файл завантажено");
            } catch (err) {
                reject(`Помилка завантаження файлу: ${err}`);
            }
        });
        curriculumToast.promise(downloadPromise, {
            success: {title: "Файл успішно завантажено"},
            error: {title: "Помилка завантаження файлу"},
            loading: {title: "Файл завантажується..."}
        });
    };

    const handleDeleteCurriculum = async () => {
        const curriculumService = new CurriculumService();
        curriculumService.deleteCurriculum(row.original.filename)
            .then(() => {
                onDelete(row.original.filename);
                onCloseDelete();
                displayToast(deleteCurriculumToast, idDeleteToast, {
                    status: "success",
                    title: "Файл видалено",
                    description: `Файл ${row.original.filename} успішно видалено`
                });
            })
            .catch((err) => {
                if (err.response.status === 401) {
                    refreshToken().then();
                } else {
                    handleAxiosError(err, deleteCurriculumToast, idDeleteToast, {
                        403: "Відмовлено у доступі",
                        404: "Файл не знайдено"
                    });
                }
            });
    };

    return (
        <CurriculumContextMenu
            onDownload={() => handleDownloadCurriculum(row.original.filename)}
            onDelete={onOpenDelete}
        >
            {ref =>
                <Tr ref={ref} {...row.getRowProps()}>
                    {row.cells.map((cell) =>
                        <Fragment key={cell.getCellProps().key}>
                            {cell.render("Cell")}
                        </Fragment>
                    )}

                    <DeleteCurriculum
                        isOpen={isOpenDelete}
                        onClose={onCloseDelete}
                        onDelete={handleDeleteCurriculum}
                    />
                </Tr>}
        </CurriculumContextMenu>
    );
};

export default CurriculumTableRow;

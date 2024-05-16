import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import TeacherList from "../components/Teacher/TeacherList/TeacherList";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
            <ComponentPreview path="/TeacherList">
                <TeacherList/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;

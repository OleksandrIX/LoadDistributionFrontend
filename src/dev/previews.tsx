import {ComponentPreview, Previews} from "@react-buddy/ide-toolbox";
import {PaletteTree} from "./palette";
import TeacherList from "../components/TeacherComponents/TeacherList/TeacherList";

const ComponentPreviews = () => {
    return (
        <Previews palette={<PaletteTree/>}>
            <ComponentPreview path="/ComponentPreviews">
                <ComponentPreviews/>
            </ComponentPreview>
        </Previews>
    );
};

export default ComponentPreviews;

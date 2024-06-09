import {EducationDegree} from "types/enums";
import {IdType, TimestampType} from "types/base.model.type";

interface StudyGroupBase {
    group_code: string;
    course_study: number;
    education_degree: EducationDegree;
    number_listeners: number;
}

export interface RequestStudyGroup extends StudyGroupBase {

}

export interface ResponseStudyGroup extends IdType, TimestampType, StudyGroupBase {

}

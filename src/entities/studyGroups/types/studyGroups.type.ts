import {EducationDegree} from "types/enums";
import {IdType, TimestampType} from "types/base.model.type";

interface BaseStudyGroup {
    group_code: string;
    course_study: number;
    education_degree: EducationDegree;
    number_listeners: number;
}

export interface StudyGroup extends BaseStudyGroup, IdType, TimestampType {

}

export interface StudyGroupRequest extends BaseStudyGroup {

}

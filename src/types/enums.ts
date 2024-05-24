enum UserRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

enum SidebarElement {
    PROFILE = "profile",
    DISCIPLINES = "disciplines",
    DEPARTMENTS = "departments",
    CURRICULUMS = "curriculums",
    GROUPS = "groups",
    EMPLOYEES = "employees",
    PLANS = "plans",
    WORKLOAD = "workload"
}

enum AcademicRank {
    SENIOR_RESEARCHER = "Старший науковий співробітник",
    ASSOCIATE_PROFESSOR = "Доцент",
    PROFESSOR = "Професор"
}

enum EducationDegree {
    BACHELOR = "бакалавр",
    MASTER = "магістр"
}

enum MilitaryRank {
    SOLDIER = "Солдат",
    SENIOR_SOLDIER = "Старший солдат",
    JUNIOR_SERGEANT = "Молодший сержант",
    SERGEANT = "Сержант",
    SENIOR_SERGEANT = "Старший сержант",
    CHIEF_SERGEANT = "Головний сержант",
    STAFF_SERGEANT = "Штаб-сержант",
    MASTER_SERGEANT = "Майстер-сержант",
    SENIOR_MASTER_SERGEANT = "Старший майстер-сержант",
    CHIEF_MASTER_SERGEANT = "Головний майстер-сержант",
    JUNIOR_LIEUTENANT = "Молодший лейтенант",
    LIEUTENANT = "Лейтенант",
    SENIOR_LIEUTENANT = "Старший лейтенант",
    CAPTAIN = "Капітан",
    MAJOR = "Майор",
    LIEUTENANT_COLONEL = "Підполковник",
    COLONEL = "Полковник",
    BRIGADIER_GENERAL = "Бригадний генерал",
    MAJOR_GENERAL = "Генерал-майор",
    LIEUTENANT_GENERAL = "Генерал-лейтенант",
    GENERAL = "Генерал"
}

enum Position {
    HEAD_OF_THE_DEPARTMENT = "Начальник кафедри",
    DEPUTY_HEAD_OF_THE_DEPARTMENT = "Заступник начальника кафедри",
    PROFESSOR = "Професор",
    ASSOCIATE_PROFESSOR = "Доцент",
    SENIOR_LECTURER = "Старший викладач",
    LECTURER = "Викладач",
    ASSISTANT = "Асистент",
    SERGEANT_INSTRUCTOR = "Сержант-інструктор"
}

enum ReportingType {
    GRADED_TEST = "Диференційований залік",
    EXAM = "Екзамен"
}

enum ScientificDegree {
    CANDIDATE_OF_SCIENCE = "Кандидат наук",
    DOCTOR_OF_SCIENCE = "Доктор наук"
}

export {
    UserRole,
    SidebarElement,
    AcademicRank,
    EducationDegree,
    MilitaryRank,
    Position,
    ReportingType,
    ScientificDegree
};

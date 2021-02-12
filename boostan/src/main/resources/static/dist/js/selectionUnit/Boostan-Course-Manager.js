/**
 * Created by m.khandan on 10/01/2019.
 */
if (CourseManager === undefined || CourseManager === null) var CourseManager = {};
CourseManager = {
    services: {
        update: 'services/course_DataService/edit_course_operation',
        delete: 'services/course_DataService/delete_course_operation',
        create: 'services/course_DataService/create_course_operation',
        select: 'services/course_DataService/select_all_course_operation'
    }
};

/**
 * Created by m.khandan on 10/01/2019.
 */
if (LessonManager === undefined || LessonManager === null) var LessonManager = {};
LessonManager = {
    services: {
        update: 'services/lesson_DataService/edit_lesson_operation',
        delete: 'services/lesson_DataService/delete_lesson_operation',
        create: 'services/lesson_DataService/create_lesson_operation',
        select: 'services/lesson_DataService/select_all_lesson_operation',
        selectUserUnit: 'services/lesson_DataService/select_user_unit_lesson_operation',
        addUserLesson: 'services/lesson_DataService/add_user_unit_lesson_operation',
        removeUserLesson: 'services/lesson_DataService/remove_user_unit_lesson_operation',
        finalizeSelection: 'services/lesson_DataService/finalize_user_unit_lesson_operation'
        // report: 'services/lesson_DataService/report_user_unit_lesson_operation'

    }
};

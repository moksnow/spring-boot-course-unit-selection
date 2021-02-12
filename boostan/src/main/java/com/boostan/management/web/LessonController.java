package com.boostan.management.web;

import com.boostan.management.model.Course;
import com.boostan.management.model.Lesson;
import com.boostan.management.service.CourseService;
import com.boostan.management.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * @author m.khandan
 * Lesson Controller
 */
@Controller
public class LessonController {

    @Autowired
    private LessonService lessonService;


    /**
     * @param model atts
     * @return uri path
     */
    @RequestMapping(value = {"/lesson"}, method = RequestMethod.GET)
    public String lesson(Model model) {
        return "lesson";
    }

    /**
     * @param model atts
     * @return lesson list
     */
    @RequestMapping(value = {"/services/lesson_DataService/select_all_lesson_operation"}, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    List<Lesson> selectAllLesson(Model model) {
        List<Lesson> lessons = lessonService.findAll();
        return lessons;
    }

    /**
     * @param lesson saving
     * @return message
     */
    @RequestMapping(value = {"/services/lesson_DataService/create_lesson_operation"}, method = RequestMethod.POST)
    public ResponseEntity<Lesson> saveLesson(@RequestBody  Lesson lesson) {


        lessonService.save(lesson);
        return new ResponseEntity<Lesson>(lesson, HttpStatus.OK);
    }

    /**
     * @param lesson deletion
     */
    @RequestMapping(value = {"/services/lesson_DataService/delete_lesson_operation"}, method = RequestMethod.POST)
    public void deleteLesson(@RequestBody Lesson lesson) {
        lessonService.delete(lesson);
    }


    /**
     * @param lesson saveing
     * @return lesson
     */
    @RequestMapping(value = {"/services/lesson_DataService/edit_lesson_operation"}, method = RequestMethod.POST)
    public ResponseEntity<Lesson> updateLesson(@RequestBody Lesson lesson) {
        lessonService.save(lesson);
        return new ResponseEntity<Lesson>(lesson, HttpStatus.OK);
    }
}

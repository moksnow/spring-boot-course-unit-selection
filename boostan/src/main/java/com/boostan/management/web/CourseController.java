package com.boostan.management.web;

import com.boostan.management.model.Course;
import com.boostan.management.service.CourseService;
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
 * Course Controller
 */
@Controller
public class CourseController {

    @Autowired
    private CourseService courseService;

    /**
     * @param model atts
     * @return path course
     */
    @RequestMapping(value = {"/course"}, method = RequestMethod.GET)
    public String course(Model model) {
        return "course";
    }

    /**
     * @param model atts
     * @return course list
     */
    @RequestMapping(value = {"/services/course_DataService/select_all_course_operation"}, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    List<Course> selectAllCourse(Model model) {
        return courseService.findAll();
    }

    /**
     * @param course saving
     * @return course
     */
    @RequestMapping(value = {"/services/course_DataService/create_course_operation"}, method = RequestMethod.POST)
    public ResponseEntity<Course> saveCourse(@RequestBody Course course) {
        courseService.save(course);
        return new ResponseEntity<Course>(course, HttpStatus.OK);
    }

    /**
     * @param course deletion
     */
    @RequestMapping(value = {"/services/course_DataService/delete_course_operation"}, method = RequestMethod.POST)
    public void deleteCourse(@RequestBody Course course) {
        courseService.delete(course);
    }


    /**
     * @param course update
     * @return course
     */
    @RequestMapping(value = {"/services/course_DataService/edit_course_operation"}, method = RequestMethod.POST)
    public ResponseEntity<Course> updateCourse(@RequestBody Course course) {
        courseService.save(course);
        return new ResponseEntity<Course>(course, HttpStatus.OK);
    }

}

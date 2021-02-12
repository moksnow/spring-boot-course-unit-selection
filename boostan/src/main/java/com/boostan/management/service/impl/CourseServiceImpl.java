package com.boostan.management.service.impl;

import com.boostan.management.model.Course;
import com.boostan.management.repository.CourseRepository;
import com.boostan.management.service.CourseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * @author m.khandan
 * Course Service Implementations
 */
@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    /**
     * @param course saving
     */
    @Override
    public void save(Course course) {
        try {
            course.setFinalCourse(true);
            courseRepository.save(course);
        } catch (Exception e) {
            System.out.println("error in save course!");
        }

    }

    /**
     * @return list course
     */
    @Override
    public List<Course> findAll() {
        return courseRepository.findAll();
    }

    /**
     * @param course deletion
     */
    @Override
    public void delete(Course course) {
        courseRepository.delete(course);
    }

    /**
     * @param course getting
     * @return course
     */
    @Override
    public Optional<Course> getCourseById(Long course) {
      return  courseRepository.findById(course);
    }


}

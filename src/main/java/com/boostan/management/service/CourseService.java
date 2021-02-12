package com.boostan.management.service;

import com.boostan.management.model.Course;

import java.util.List;
import java.util.Optional;

/**
 * @author m.khandan
 */
public interface CourseService {
    void save(Course course);

    List<Course> findAll();

    void delete(Course course);

    Optional<Course> getCourseById(Long course);
}

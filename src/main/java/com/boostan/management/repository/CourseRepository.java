package com.boostan.management.repository;

import com.boostan.management.model.Course;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author m.khandan
 */
public interface CourseRepository extends JpaRepository<Course, Long> {
}

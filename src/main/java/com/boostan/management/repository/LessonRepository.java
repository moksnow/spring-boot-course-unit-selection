package com.boostan.management.repository;

import com.boostan.management.model.Lesson;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author m.khandan
 */
public interface LessonRepository extends JpaRepository<Lesson, Long>{
}

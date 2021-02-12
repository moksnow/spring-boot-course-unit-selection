package com.boostan.management.service.impl;

import com.boostan.management.model.Lesson;
import com.boostan.management.repository.LessonRepository;
import com.boostan.management.service.CourseService;
import com.boostan.management.service.LessonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Lesson Service Implementations
 */
@Service
public class LessonServiceImpl implements LessonService {


    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private CourseService courseService;

    /**
     * @param lesson saving
     */
    @Override
    public void save(Lesson lesson) {
        try {
            lesson.setCourse(courseService.getCourseById(lesson.getCourse().getId()).get());
            lessonRepository.save(lesson);
        } catch (Exception e) {
            System.out.println("error in save lesson!");
        }

    }

    /**
     * @return list course
     */
    @Override
    public List<Lesson> findAll() {
        return lessonRepository.findAll();
    }

    /**
     * @param lesson deletion
     */
    @Override
    public void delete(Lesson lesson) {
        lessonRepository.delete(lesson);
    }
}

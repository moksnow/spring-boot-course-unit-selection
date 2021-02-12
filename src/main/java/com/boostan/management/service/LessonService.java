package com.boostan.management.service;

import com.boostan.management.model.Lesson;

import java.util.List;

/**
 * @author m.khandan
 */
public interface LessonService {

    void save(Lesson lesson);

    List<Lesson> findAll();

    void delete(Lesson lesson);
}

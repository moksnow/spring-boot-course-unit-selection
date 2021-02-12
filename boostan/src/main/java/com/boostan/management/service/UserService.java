package com.boostan.management.service;

import com.boostan.management.model.Lesson;
import com.boostan.management.model.User;

import java.util.List;
import java.util.Set;

/**
 * @author m.khandan
 */
public interface UserService {
    void save(User user);

    void saveUserLesson(User user, Set<Lesson> lessons);

    void saveUserFinalizeSelection(User user);

    void removeUserLesson(User user, Set<Lesson> lessons);

    Set<Lesson> getAllUserLesson(User user);

    User findByUsername(String username);
}

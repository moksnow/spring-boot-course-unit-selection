package com.boostan.management.service.impl;

import com.boostan.management.model.Lesson;
import com.boostan.management.model.User;
import com.boostan.management.repository.RoleRepository;
import com.boostan.management.repository.UserRepository;
import com.boostan.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * @author m.khandan
 * User Service Implementations
 */
@Service
public class UserServiceImpl implements UserService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private RoleRepository roleRepository;
    @Autowired
    private BCryptPasswordEncoder bCryptPasswordEncoder;

    /**
     * @param user getting
     */
    @Override
    public void save(User user) {
        try {
            user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
            user.setRoles(new HashSet<>(roleRepository.findAll()));
            userRepository.save(user);
        } catch (Exception e) {
            System.out.println("error in save user!");
        }

    }

    /**
     * @param user getting
     * @param lessons getting
     */
    @Override
    public void saveUserLesson(User user, Set<Lesson> lessons) {
        try {
            user.getLessons().addAll(lessons);
            userRepository.save(user);
        } catch (Exception e) {
            System.out.println("error in saveUserLesson!");
        }

    }

    /**
     * @param user getting
     */
    @Override
    public void saveUserFinalizeSelection(User user) {
        try {
            user.setCurrentTermFinalSelection(true);
            userRepository.save(user);
        } catch (Exception e) {
            System.out.println("error in saveUserFinalizeSelection!");
        }

    }

    /**
     * @param user getting
     * @param lessons getting
     */
    @Override
    public void removeUserLesson(User user, Set<Lesson> lessons) {
        try {
            Set<Lesson> lessons1 = new HashSet<Lesson>();
            Set<Lesson> lessons2 = user.getLessons();
            for (Lesson lesson : lessons2) {
                if(!lessons.contains(lesson)){
                    lessons1.add(lesson);
                }

            }

            user.setLessons(lessons1);
            // user.setRoles(new HashSet<>(roleRepository.findAll()));
            userRepository.save(user);
        } catch (Exception e) {
            System.out.println("error in removeUserLesson!");
        }

    }

    /**
     * @param user input
     * @return lesson list
     */
    @Override
    public Set<Lesson> getAllUserLesson(User user) {
        return  user.getLessons();
    }

    /**
     * @param username input
     * @return user
     */
    @Override
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}

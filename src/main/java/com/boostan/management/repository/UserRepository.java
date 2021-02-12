package com.boostan.management.repository;

import com.boostan.management.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * @author m.khandan
 */
public interface UserRepository extends JpaRepository<User, Long> {
    User findByUsername(String username);
}

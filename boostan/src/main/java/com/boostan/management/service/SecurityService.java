package com.boostan.management.service;

/**
 * @author m.khandan
 */
public interface SecurityService {
    String findLoggedInUsername();

    void autologin(String username, String password);
}

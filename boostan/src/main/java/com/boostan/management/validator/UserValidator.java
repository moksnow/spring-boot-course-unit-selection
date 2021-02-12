package com.boostan.management.validator;

import com.boostan.management.model.User;
import com.boostan.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.validation.Errors;
import org.springframework.validation.ValidationUtils;
import org.springframework.validation.Validator;

/**
 * @author m.khandan
 * User Validator
 */
@Component
public class UserValidator implements Validator {
    @Autowired
    private UserService userService;

    /**
     * @param aClass
     * @return
     */
    @Override
    public boolean supports(Class<?> aClass) {
        return User.class.equals(aClass);
    }

    /**
     * @param o
     * @param errors
     */
    @Override
    public void validate(Object o, Errors errors) {
        try {
            User user = (User) o;

            ValidationUtils.rejectIfEmptyOrWhitespace(errors, "username", "NotEmpty");
            if (user.getUsername().length() < 6 || user.getUsername().length() > 32) {
                errors.rejectValue("username", "Size.userForm.username");
            }
            if (userService.findByUsername(user.getUsername()) != null) {
                errors.rejectValue("username", "Duplicate.userForm.username");
            }

            ValidationUtils.rejectIfEmptyOrWhitespace(errors, "password", "NotEmpty");
            if (user.getPassword().length() < 8 || user.getPassword().length() > 32) {
                errors.rejectValue("password", "Size.userForm.password");
            }

            if (!user.getPasswordConfirm().equals(user.getPassword())) {
                errors.rejectValue("passwordConfirm", "Diff.userForm.passwordConfirm");
            }
        } catch (Exception e) {
            System.out.println("error in validate user!");
        }

    }
}

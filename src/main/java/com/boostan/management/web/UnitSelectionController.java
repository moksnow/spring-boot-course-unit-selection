package com.boostan.management.web;

import com.boostan.management.model.Lesson;
import com.boostan.management.model.Term;
import com.boostan.management.model.User;
import com.boostan.management.service.TermService;
import com.boostan.management.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;

/**
 * @author m.khandan
 * Unit Selection Controller
 */
@Controller
public class UnitSelectionController {

    @Value("${current.year}")
    private String currentYear;

    @Value("${current.term}")
    private String currentTerm;

    @Autowired
    private UserService userService;


    @Autowired
    private TermService termService;

    /**
     * @param model   atts
     * @param request for userbame
     * @return lesson list
     */
    @RequestMapping(value = {"/services/lesson_DataService/select_user_unit_lesson_operation"}, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    Set<Lesson> selectAllUserLesson(Model model, HttpServletRequest request) {
        User user = userService.findByUsername(request.getUserPrincipal().getName());
        return userService.getAllUserLesson(user);
    }

    /**
     * @param lesson  getting
     * @param request for username
     * @return meesage
     */
    @RequestMapping(value = {"/services/lesson_DataService/remove_user_unit_lesson_operation"}, method = RequestMethod.POST)
    public ResponseEntity<String> removeUserLesson(@RequestBody Lesson lesson, HttpServletRequest request) {
        String message = "";
        try {
            Term term = termService.retrieveActiveTerm(Long.valueOf(currentYear), Long.valueOf(currentTerm));
            User user = userService.findByUsername(request.getUserPrincipal().getName());
            boolean canSelect = true;
            if (new Date().before(term.getStartDate())) {
                message = "Your Selection Unit Not Started! Contact Administrator.\n";
                canSelect = false;
            }
            if (new Date().after(term.getEndDate())) {
                message = message + "Your Selection Unit Ended! Contact Administrator.\n";
                canSelect = false;
            }
            if (!term.getActive()) {
                message = message + "Your Selection Unit Paused, Try After Minutes, Contact Administrator. \n";
                canSelect = false;
            }
            if (user.isCurrentTermFinalSelection()) {
                message = message + "error: you are finalized selection unit! \n";
                canSelect = false;
            }


            if (canSelect) {
                Set<Lesson> lessons = new HashSet<Lesson>();
                lessons.add(lesson);
                userService.removeUserLesson(user, lessons);
                message = "lesson removed!";
            }
        } catch (Exception e) {
            System.out.println("error in removeUserLesson!");
        }


        return new ResponseEntity<String>(message, HttpStatus.OK);

    }

    /**
     * @param lesson  getting
     * @param request for username
     * @return message
     */
    @RequestMapping(value = {"/services/lesson_DataService/add_user_unit_lesson_operation"}, method = RequestMethod.POST)
    public ResponseEntity<String> addUserLesson(@RequestBody Lesson lesson, HttpServletRequest request) {
        String message = "";
        try {
            Term term = termService.retrieveActiveTerm(Long.valueOf(currentYear), Long.valueOf(currentTerm));
            User user = userService.findByUsername(request.getUserPrincipal().getName());
            boolean canSelect = true;
            if (new Date().before(term.getStartDate())) {
                message = "Your Selection Unit Not Started! Contact Administrator.\n";
                canSelect = false;
            }
            if (new Date().after(term.getEndDate())) {
                message = message + "Your Selection Unit Ended! Contact Administrator.\n";
                canSelect = false;
            }
            if (!term.getActive()) {
                message = message + "Your Selection Unit Paused, Try After Minutes, Contact Administrator. \n";
                canSelect = false;
            }
            if (user.isCurrentTermFinalSelection()) {
                message = message + "error: you are finalized selection unit! \n";
                canSelect = false;
            }


            if (canSelect) {
                Set<Lesson> lessons = new HashSet<Lesson>();
                lessons.add(lesson);
                userService.saveUserLesson(user, lessons);
                message = "lesson added!";
            }
        } catch (Exception e) {
            System.out.println("error in addUserLesson!");
        }


        return new ResponseEntity<String>(message, HttpStatus.OK);

    }

    /**
     * @param lesson  getting
     * @param request for username
     * @param model   atts
     * @return message
     */
    @RequestMapping(value = {"services/lesson_DataService/finalize_user_unit_lesson_operation"}, method = RequestMethod.POST)
    public ResponseEntity<String> finalizeSelection(@RequestBody Lesson lesson, HttpServletRequest request, Model model) {
        String message = "";
        try {
            User user = userService.findByUsername(request.getUserPrincipal().getName());
            Term term = termService.retrieveActiveTerm(Long.valueOf(currentYear), Long.valueOf(currentTerm));

            boolean finalSelect = true;

            Long unitsCount = 0L;
            Set<Lesson> userLessons = user.getLessons();
            for (Lesson userLesson : userLessons) {
                unitsCount = unitsCount + userLesson.getCourse().getUnit();
            }

            if (user.isCurrentTermFinalSelection()) {
                message = message + "Error: Your Selection Before Finalized!\n";
                finalSelect = false;
            }

            if (unitsCount < term.getMinUnit()) {
                message = message + "Error: Your Count units fewer than 12 !\n";
                finalSelect = false;
            }

            if (unitsCount > term.getMaxUnit()) {
                message = message + "Error: Your Count units more than 24 !\n";
                finalSelect = false;
            }


            if (finalSelect) {
                userService.saveUserFinalizeSelection(user);
                message = "Your Selection Unit Successfully Finalize!";
            } else {
                model.addAttribute("message", message);
            }
        } catch (Exception e) {
            System.out.println("error in finalizeSelection!");
        }

        return new ResponseEntity<String>(message, HttpStatus.OK);

    }


}

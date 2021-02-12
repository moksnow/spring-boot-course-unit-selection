package com.boostan.management.web;

import com.boostan.management.model.Course;
import com.boostan.management.model.Lesson;
import com.boostan.management.model.Term;
import com.boostan.management.model.User;
import com.boostan.management.service.CourseService;
import com.boostan.management.service.TermService;
import com.boostan.management.service.UserService;
import net.sf.jasperreports.engine.*;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
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
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;
import java.util.*;

/**
 * @author m.khandan
 * Term Controller
 */
@Controller
public class TermController {
    @Value("${current.year}")
    private String currentYear;

    @Value("${current.term}")
    private String currentTerm;

    @Autowired
    private UserService userService;

    @Autowired
    private TermService termService;
    @Autowired
    private CourseService courseService;

    /**
     * @param model atts
     * @return uri path
     */
    @RequestMapping(value = {"/config-term"}, method = RequestMethod.GET)
    public String configTerm(Model model) {
        return "config-term";
    }

    /**
     * @param model   atts
     * @param request for username
     * @return term list
     */
    @RequestMapping(value = {"/services/config_term_DataService/select_all_config_term_operation"}, method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
    public @ResponseBody
    List<Term> selectAllTerm(Model model, HttpServletRequest request) {
        return termService.findAll();
    }

    /**
     * @param term getting
     * @return message
     */
    @RequestMapping(value = {"/services/config_term_DataService/create_config_term_operation"}, method = RequestMethod.POST)
    public ResponseEntity<Term> saveTerm(@RequestBody Term term) {
        termService.save(term);
        return new ResponseEntity<Term>(term, HttpStatus.OK);
    }

    /**
     * @param term getting
     */
    @RequestMapping(value = {"/services/config_term_DataService/delete_config_term_operation"}, method = RequestMethod.POST)
    public void deleteTerm(@RequestBody Term term) {
        termService.delete(term);
    }

    /**
     * @param term getting
     * @return message
     */
    @RequestMapping(value = {"/services/config_term_DataService/edit_config_term_operation"}, method = RequestMethod.POST)
    public ResponseEntity<Term> updateTerm(@RequestBody Term term) {
        termService.save(term);
        return new ResponseEntity<Term>(term, HttpStatus.OK);
    }

    /**
     * @param model getting
     * @return uri path
     */
    @RequestMapping(value = "/login-to-selection-unit", method = RequestMethod.GET)
    public String loginToSelectionUnit(Model model) {
        return "login-to-selection-unit";
    }

    /**
     * check user for login to selection unit
     *
     * @param model   atts
     * @param request for username
     * @return uri path
     */
    @RequestMapping(value = "/login-to-selection-unit-checking", method = RequestMethod.GET)
    public String loginToSelectionUnitChecking(Model model, HttpServletRequest request) {
        try {
            User user = userService.findByUsername(request.getUserPrincipal().getName());
            Term term = termService.retrieveActiveTerm(Long.valueOf(currentYear), Long.valueOf(currentTerm));

            String message = "";
            boolean canSelect = true;


            if (user.isCurrentTermFinalSelection()) {
                message = "error: you are finalized selection unit!\n";
                canSelect = false;
            }

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

            if (canSelect) {
                return "user-selection-unit";
            } else {
                model.addAttribute("message", message);
                return "login-to-selection-unit";
            }
        } catch (Exception e) {
            System.out.println("error in loginToSelectionUnitChecking!");

        }

        return "login-to-selection-unit";
    }


    /**
     * @param path    report
     * @param request for username
     * @return real path
     */
    @RequestMapping(value = {"/services/lesson_DataService/report_user_unit_lesson_operation"}, method = RequestMethod.POST)
    public ResponseEntity<String> reportCurrentUserCertificateSelectionUnit(@RequestBody String path, HttpServletRequest request) {
        String message = "you have not finalize selection unit!";
        try {
            User user = userService.findByUsername(request.getUserPrincipal().getName());
            if (user.isCurrentTermFinalSelection()) {
                message = "your certificate copied in project root! \n";
                reportCertificate(path, request, user);
            }
        } catch (Exception e) {
            System.out.println("error in reportCurrentUserCertificateSelectionUnit!");

        }


        return new ResponseEntity<String>(message, HttpStatus.OK);
    }

    /**
     * jasper report using for units certificate exporting
     *
     * @param path1   real path
     * @param request for username
     * @param user for getting lessons
     */

    private void reportCertificate(String path1, HttpServletRequest request, User user) {
        try {
            //  InputStream employeeReportStream = getClass().getResourceAsStream("/certificateUnitsReport.jrxml");
            String path = request.getServletContext().getRealPath("/certificateUnitsReport.jrxml");
            InputStream input = new FileInputStream(new File(path));
            JasperReport jasperReport = JasperCompileManager.compileReport(input);

            List<Course> courses = new ArrayList<>();

            Set<Lesson> lessons = user.getLessons();
            for (Lesson lesson : lessons) {
                courses.add(lesson.getCourse());
            }



            /* Convert List to JRBeanCollectionDataSource */
            JRBeanCollectionDataSource itemsJRBean = new JRBeanCollectionDataSource(courses);

            /* Map to hold Jasper report Parameters */
            Map<String, Object> parameters = new HashMap<String, Object>();

            parameters.put("title", "Certificate Selection Unit");
            parameters.put("date", new Date());
            parameters.put("username", request.getUserPrincipal().getName());
            JasperPrint jasperPrint =
                    JasperFillManager.fillReport(jasperReport, parameters, itemsJRBean);


            JasperExportManager.exportReportToHtmlFile(jasperPrint, "certificateUnitsReport.html");
        } catch (JRException e) {
            e.printStackTrace();
        } catch (FileNotFoundException e) {
            e.printStackTrace();
        }
    }
}

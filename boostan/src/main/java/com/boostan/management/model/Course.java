package com.boostan.management.model;

import javax.persistence.*;
import java.util.Set;

/**
 * @author m.khandan
 * Course Entity
 */
@Entity
@Table(name = "course")
public class Course {
    private Long id;
    private String name;
    private String description;
    private Long unit;
    private Boolean finalCourse;
    private Long prerequisite;
  //  private Set<Lesson> lessons;

    public Course(){}

    public Course(Long id){
        this.id = id;
    }

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUnit() {
        return unit;
    }

    public void setUnit(Long unit) {
        this.unit = unit;
    }

    public Boolean getFinalCourse() {
        return finalCourse;
    }

    public void setFinalCourse(Boolean finalCourse) {
        this.finalCourse = finalCourse;
    }

    public Long getPrerequisite() {
        return prerequisite;
    }

    public void setPrerequisite(Long prerequisite) {
        this.prerequisite = prerequisite;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Course course = (Course) o;

        return id != null ? id.equals(course.id) : course.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }

    //   // @OneToMany(mappedBy = "course", cascade = CascadeType.ALL)
//    public Set<Lesson> getLessons() {
//        return lessons;
//    }
//
//    public void setLessons(Set<Lesson> lessons) {
//        this.lessons = lessons;
//    }
}

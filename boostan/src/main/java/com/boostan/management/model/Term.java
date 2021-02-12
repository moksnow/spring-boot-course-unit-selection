package com.boostan.management.model;

import javax.persistence.GeneratedValue;
import javax.persistence.*;
import java.util.Date;

/**
 * @author m.khandan
 * Term Entity
 */
@Entity
@Table(name = "term")
public class Term {
    private Long id;
    private String name;
    private String description;
    private Long term;
    private Long year;
    private Long minUnit;
    private Long maxUnit;
    private Date startDate;
    private Date endDate;
    private Boolean active;



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

    public Long getTerm() {
        return term;
    }

    public void setTerm(Long term) {
        this.term = term;
    }

    public Long getYear() {
        return year;
    }

    public void setYear(Long year) {
        this.year = year;
    }

    public Long getMinUnit() {
        return minUnit;
    }

    public void setMinUnit(Long minUnit) {
        this.minUnit = minUnit;
    }

    public Long getMaxUnit() {
        return maxUnit;
    }

    public void setMaxUnit(Long maxUnit) {
        this.maxUnit = maxUnit;
    }

    public Date getStartDate() {
        return startDate;
    }

    public void setStartDate(Date startDate) {
        this.startDate = startDate;
    }

    public Date getEndDate() {
        return endDate;
    }

    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }

    public Boolean getActive() {
        return active;
    }

    public void setActive(Boolean active) {
        this.active = active;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Term term = (Term) o;

        return id != null ? id.equals(term.id) : term.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}

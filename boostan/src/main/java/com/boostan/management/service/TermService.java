package com.boostan.management.service;

import com.boostan.management.model.Term;

import java.util.List;

/**
 * @author m.khandan
 */
public interface TermService {
    void save(Term term);

    List<Term> findAll();

    void delete(Term term);

    Term retrieveActiveTerm(Long year, Long term);
}

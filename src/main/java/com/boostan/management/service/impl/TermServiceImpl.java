package com.boostan.management.service.impl;

import com.boostan.management.model.Term;
import com.boostan.management.repository.TermRepository;
import com.boostan.management.service.TermService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * @author m.khandan
 * Term Service Implementations
 */
@Service
public class TermServiceImpl implements TermService{

    @Autowired
    private TermRepository termRepository;

    /**
     * @param term saving
     */
    @Override
    public void save(Term term) {
        termRepository.save(term);
    }

    /**
     * @return term list
     */
    @Override
    public List<Term> findAll() {
        return termRepository.findAll();
    }

    /**
     * @param term deletion
     */
    @Override
    public void delete(Term term) {
        termRepository.delete(term);
    }

    /**
     * @param year getting
     * @param term getting
     * @return term
     */
    @Override
    public Term retrieveActiveTerm(Long year, Long term) {
       return termRepository.retrieveActiveTerm(year,term);
    }
}

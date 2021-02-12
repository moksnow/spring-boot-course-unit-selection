package com.boostan.management.repository;

import com.boostan.management.model.Term;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

/**
 * @author m.khandan
 */
public interface TermRepository extends JpaRepository<Term, Long> {

    @Query("SELECT t FROM Term t WHERE t.year = :year and t.term = :term")
    Term retrieveActiveTerm(@Param("year") Long year, @Param("term") Long term);

}

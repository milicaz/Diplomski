package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Oprema;

@Repository
public interface OpremaRepository extends JpaRepository<Oprema, Long> {

}

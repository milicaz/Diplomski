package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Posetilac;

@Repository
public interface PosetilacRepository extends JpaRepository<Posetilac, Long> {

}

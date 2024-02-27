package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.PrigradskaNaselja;

@Repository
public interface PrigradskaNaseljaRepository extends JpaRepository<PrigradskaNaselja, Long> {

}

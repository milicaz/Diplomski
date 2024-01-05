package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Poseta;

@Repository
public interface PosetaRepository extends JpaRepository<Poseta, Long> {

}

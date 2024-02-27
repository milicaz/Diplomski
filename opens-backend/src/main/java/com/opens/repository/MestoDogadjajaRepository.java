package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.MestoDogadjaja;

@Repository
public interface MestoDogadjajaRepository extends JpaRepository<MestoDogadjaja, Long> {

}

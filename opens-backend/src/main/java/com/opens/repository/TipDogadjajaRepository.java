package com.opens.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.TipDogadjaja;

@Repository
public interface TipDogadjajaRepository extends JpaRepository<TipDogadjaja, Long> {

}

package com.opens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.opens.model.MestoDogadjaja;
import com.opens.model.TipDogadjaja;

@Repository
public interface TipDogadjajaRepository extends JpaRepository<TipDogadjaja, Long> {
	
	@Query("SELECT e FROM TipDogadjaja e WHERE e.deleted = false")
    List<TipDogadjaja> findAllActive();
	
	@Query("SELECT e FROM TipDogadjaja e WHERE e.id = :id AND e.deleted = false")
    TipDogadjaja findActiveById(@Param("id") Long id);
	
	@Query("SELECT e FROM TipDogadjaja e WHERE e.naziv = :naziv AND e.deleted = false")
	TipDogadjaja findByNaziv(String naziv);
	
	@Query("SELECT e FROM TipDogadjaja e WHERE e.id = :id AND e.deleted = false")
	TipDogadjaja findOneById(@Param("id") Long id);

}

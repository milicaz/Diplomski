package com.opens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.opens.model.MestoDogadjaja;

@Repository
public interface MestoDogadjajaRepository extends JpaRepository<MestoDogadjaja, Long> {
	
	@Query("SELECT e FROM MestoDogadjaja e WHERE e.deleted = false")
    List<MestoDogadjaja> findAllActive();
	
	@Query("SELECT e FROM MestoDogadjaja e WHERE e.id = :id AND e.deleted = false")
    MestoDogadjaja findActiveById(@Param("id") Long id);
	
	@Query("SELECT e FROM MestoDogadjaja e WHERE e.nazivSale = :nazivSale AND e.deleted = false")
	MestoDogadjaja findByNazivSale(@Param("nazivSale") String nazivSale);

}

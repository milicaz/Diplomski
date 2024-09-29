package com.opens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.opens.model.TipOpreme;

@Repository
public interface TipOpremeRepository extends JpaRepository<TipOpreme, Long> {
	
	@Query("SELECT to FROM TipOpreme to WHERE to.deleted = false")
	List<TipOpreme> findAllActive();
	
	Boolean existsByNazivAndDeletedFalse(String naziv);

}

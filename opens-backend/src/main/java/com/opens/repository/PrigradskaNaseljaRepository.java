package com.opens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.opens.model.PrigradskaNaselja;

@Repository
public interface PrigradskaNaseljaRepository extends JpaRepository<PrigradskaNaselja, Long> {

	@Query("SELECT e FROM PrigradskaNaselja e WHERE e.deleted = false")
    List<PrigradskaNaselja> findAllActive();
	
	@Query("SELECT e FROM PrigradskaNaselja e WHERE e.id = :id AND e.deleted = false")
    PrigradskaNaselja findActiveById(@Param("id") Long id);
}

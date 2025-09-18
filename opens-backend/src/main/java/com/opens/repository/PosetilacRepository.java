package com.opens.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import com.opens.model.Posetilac;

@Repository
public interface PosetilacRepository extends JpaRepository<Posetilac, Long> {

	@Query("SELECT p FROM Posetilac p WHERE p.deleted = false")
	Optional<Posetilac> findByEmail(String email);

	Boolean existsByEmail(String email);

	@Query("SELECT p FROM Posetilac p WHERE p.deleted = false AND NOT EXISTS (" + "SELECT 1 FROM Poseta pos WHERE pos.posetilac = p "
			+ "AND pos.datumPosete = CURRENT_DATE "
			+ "AND (pos.vremeOdjave IS NULL OR pos.vremeOdjave > CURRENT_TIME))")
	List<Posetilac> findPosetiociBezPosete();

}

package com.opens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.opens.model.Dogadjaj;

@Repository
public interface DogadjajRepository extends JpaRepository<Dogadjaj, Long> {

	@Query("SELECT e FROM Dogadjaj e WHERE e.deleted = false")
	List<Dogadjaj> findAllActive();

	@Query("SELECT e FROM Dogadjaj e WHERE e.id = :id AND e.deleted = false")
	Dogadjaj findActiveById(@Param("id") Long id);

	Dogadjaj findOneById(Long id);
}

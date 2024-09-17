package com.opens.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.opens.model.Zaposleni;

@Repository
public interface ZaposleniRepository extends JpaRepository<Zaposleni, Long> {
	
	@Query("SELECT e FROM Zaposleni e WHERE e.deleted = false")
    List<Zaposleni> findAllActive();

    @Query("SELECT e FROM Zaposleni e WHERE e.id = :id AND e.deleted = false")
    Zaposleni findActiveById(@Param("id") Long id);
	
//	Optional<Zaposleni> findByEmail(String email);
    
    @Query("SELECT e FROM Zaposleni e WHERE e.email = :email AND e.deleted = false")
    Optional<Zaposleni> findByEmail(@Param("email") String email);
	
//	Boolean existsByEmail(String email);
    
    @Query("SELECT COUNT(e) > 0 FROM Zaposleni e WHERE e.email = :email AND e.deleted = false")
    Boolean existsByEmail(@Param("email") String email);

}

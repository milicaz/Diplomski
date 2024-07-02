package com.opens.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Zaposleni;

@Repository
public interface ZaposleniRepository extends JpaRepository<Zaposleni, Long> {
	
	Optional<Zaposleni> findByEmail(String email);
	
	Boolean existsByEmail(String email);

}

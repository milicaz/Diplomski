package com.opens.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Organizacija;

@Repository
public interface OrganizacijaRepository extends JpaRepository<Organizacija, Long> {
	
	Optional<Organizacija> findByNaziv(String naziv);

}

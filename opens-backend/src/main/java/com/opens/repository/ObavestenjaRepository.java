package com.opens.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Obavestenja;

@Repository
public interface ObavestenjaRepository extends JpaRepository<Obavestenja, Long> {
	
	List<Obavestenja> findByPocetakPrikazivanjaLessThanEqualAndKrajPrikazivanjaGreaterThanEqual(LocalDate pocetakPrikazivanja, LocalDate krajPrikazivanja);

}

package com.opens.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.EUloge;
import com.opens.model.Uloga;

@Repository
public interface UlogaRepository extends JpaRepository<Uloga, Long> {
	Optional<Uloga> findByNaziv(EUloge naziv);
	
	Uloga findOneByNaziv(EUloge naziv);
}

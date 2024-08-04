package com.opens.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.opens.model.Oprema;

@Repository
public interface OpremaRepository extends JpaRepository<Oprema, Long> {

	List<Oprema> findByIsZauzeta(Boolean isZauzeta);
	
	Boolean existsBySerijskiBroj(String serijskiBroj);

}

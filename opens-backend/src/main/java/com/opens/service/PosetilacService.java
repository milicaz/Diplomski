package com.opens.service;

import java.util.Optional;

import com.opens.model.Posetilac;
import com.opens.model.ProfilnaSlika;

public interface PosetilacService  {

	Optional<Posetilac> findByEmail(String email);
	Boolean existsByEmail(String email);
	ProfilnaSlika getProfilnaSlikaByPosetilacId(Long id);
	boolean existsActiveByEmail(String email);
}

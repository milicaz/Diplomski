package com.opens.service;

import java.util.Optional;

import com.opens.model.Posetilac;

public interface PosetilacService  {

	Optional<Posetilac> findByEmail(String email);
	Boolean existsByEmail(String email);
}

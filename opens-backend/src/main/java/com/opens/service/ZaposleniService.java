package com.opens.service;

import java.util.List;
import java.util.Optional;

import com.opens.model.Zaposleni;

public interface ZaposleniService {

	public List<Zaposleni> findAllActive();
	public Zaposleni findActiveById(Long id);
	public Optional<Zaposleni> findByEmail(String email);
	public Boolean existsByEmail(String email);
	public Zaposleni updateZaposleni(Long id, Zaposleni zaposleni);
	public String deleteZaposleni(Long id);
}

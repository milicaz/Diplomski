package com.opens.service;

import java.util.List;
import java.util.Optional;

import com.opens.model.Organizacija;

public interface OrganizacijaService {

	public List<Organizacija> findAll();
	public Optional<Organizacija> findById(Long id);
	public Optional<Organizacija> findByNaziv(String naziv);
	public Organizacija addOrganizacija(Organizacija organizacija);
	public Organizacija updateOrganizacija(Long id, Organizacija organizacija);
	public String deleteOrgzanizacija(Long id);
}

package com.opens.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.Organizacija;
import com.opens.repository.OrganizacijaRepository;
import com.opens.service.OrganizacijaService;

@Service
public class OrganizacijaServiceImpl implements OrganizacijaService {

	@Autowired
	private OrganizacijaRepository organizacijaRepo;
	
	@Override
	public List<Organizacija> findAll() {
		// TODO Auto-generated method stub
		return organizacijaRepo.findAll();
	}

	@Override
	public Optional<Organizacija> findById(Long id) {
		// TODO Auto-generated method stub
		return organizacijaRepo.findById(id);
	}

	@Override
	public Optional<Organizacija> findByNaziv(String naziv) {
		// TODO Auto-generated method stub
		return organizacijaRepo.findByNaziv(naziv);
	}

	@Override
	public Organizacija addOrganizacija(Organizacija organizacija) {
		// TODO Auto-generated method stub
		return organizacijaRepo.save(organizacija);
	}

	@Override
	public Organizacija updateOrganizacija(Long id, Organizacija organizacija) {
Optional<Organizacija> upOrganizacija = organizacijaRepo.findById(id);
		
		Organizacija updateOrganizacija = upOrganizacija.get();
		updateOrganizacija.setNaziv(organizacija.getNaziv());
		updateOrganizacija.setBrojTelefona(organizacija.getBrojTelefona());
		updateOrganizacija.setDelatnost(organizacija.getDelatnost());
		updateOrganizacija.setEmail(organizacija.getEmail());
		updateOrganizacija.setLink(organizacija.getLink());
		updateOrganizacija.setOdgovornaOsoba(organizacija.getOdgovornaOsoba());
		updateOrganizacija.setOpis(organizacija.getOpis());
		
		organizacijaRepo.save(updateOrganizacija);
		return updateOrganizacija;
	}

	@Override
	public String deleteOrgzanizacija(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	
}

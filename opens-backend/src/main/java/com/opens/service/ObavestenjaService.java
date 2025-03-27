package com.opens.service;

import java.util.List;

import com.opens.model.Obavestenja;

public interface ObavestenjaService {

	public List<Obavestenja> findAll();
	
	public List<Obavestenja> getValidObavestenja();
	
	public List<Obavestenja> getAktuelnaObavestenja();

	public Obavestenja addObavestenje(Obavestenja obavestenje);

	public Obavestenja updatedObavestenje(Long id, Obavestenja obavestenje);

	public void deleteObavestenje(Long id);

}

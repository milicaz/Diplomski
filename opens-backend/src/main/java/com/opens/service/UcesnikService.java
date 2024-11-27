package com.opens.service;

import java.util.List;

import com.opens.model.Ucesnik;

public interface UcesnikService {
	
	public String addUcesnik(Ucesnik ucesnik, Long id);
	public List<Ucesnik> sviUcesniciDogadjaja(Long id);
	public String deleteUcesnik(Long id);
	public Ucesnik updateUcesnik(Long id, Ucesnik ucesnik);

}

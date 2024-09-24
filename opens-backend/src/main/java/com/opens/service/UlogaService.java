package com.opens.service;

import java.util.List;

import com.opens.model.EUloge;
import com.opens.model.Uloga;

public interface UlogaService {
	
	public List<Uloga> findAll();
	public Uloga findOneByNaziv(EUloge naziv);

}

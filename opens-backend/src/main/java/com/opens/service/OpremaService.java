package com.opens.service;

import java.util.List;

import com.opens.dto.OpremaDTO;
import com.opens.model.Oprema;

public interface OpremaService {
	
	public List<Oprema> findAll();
	
	public List<Oprema> findByIsZauzeta();
	
	public Boolean existsBySerijskiBroj(String serijskiBroj);
	
	public Oprema addOprema(OpremaDTO opremaDTO);
	
	public Oprema updatedOprema(Long id, OpremaDTO opremaDTO);
	
	public void deleteOprema(Long id);

}

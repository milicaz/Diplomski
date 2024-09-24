package com.opens.service;

import java.util.List;

import com.opens.model.TipOpreme;

public interface TipOpremeService {
	
	public List<TipOpreme> findAll();
	
	public TipOpreme addTipOpreme(TipOpreme tipOpreme);
	
	public TipOpreme updatedTipOpreme(Long id, TipOpreme tipOpreme);
	
	public void deleteTipOpreme(Long id);
	
	public Boolean existsByNaziv(String naziv);

}

package com.opens.service;

import java.util.List;

import com.opens.model.TipDogadjaja;

public interface TipDogadjajaService {
	
	public TipDogadjaja findByNaziv(String naziv);
	public TipDogadjaja findOneById(Long id);
	public List<TipDogadjaja> findAll();
	public TipDogadjaja addTip(TipDogadjaja tip);
	public TipDogadjaja updateTip(Long id, TipDogadjaja tip);
	public String deleteTip(Long id);
}

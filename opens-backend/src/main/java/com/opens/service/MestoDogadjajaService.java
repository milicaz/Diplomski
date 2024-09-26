package com.opens.service;

import java.util.List;

import com.opens.model.MestoDogadjaja;

public interface MestoDogadjajaService {

	public MestoDogadjaja findByNazivSale(String nazivSale);
	public List<MestoDogadjaja> findAllActive();
	public MestoDogadjaja findActiveById(Long id);
	public MestoDogadjaja addMesto(MestoDogadjaja mesto);
	public MestoDogadjaja updateMesto(Long id, MestoDogadjaja mesto);
	public String deleteMesto(Long id);
}

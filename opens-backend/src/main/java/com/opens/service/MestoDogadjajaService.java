package com.opens.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.opens.model.MestoDogadjaja;

public interface MestoDogadjajaService {

	public MestoDogadjaja findByNazivSale(String nazivSale);
	public List<MestoDogadjaja> findAll();
	public MestoDogadjaja addMesto(MestoDogadjaja mesto);
	public MestoDogadjaja updateMesto(Long id, MestoDogadjaja mesto);
	public MestoDogadjaja deleteMesto(Long id);
}

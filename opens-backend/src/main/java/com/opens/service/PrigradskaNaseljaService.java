package com.opens.service;

import java.util.List;

import com.opens.model.PrigradskaNaselja;

public interface PrigradskaNaseljaService {

	public List<PrigradskaNaselja> findAll();
	public PrigradskaNaselja addNaselje(PrigradskaNaselja naselje);
	public PrigradskaNaselja updateNaselje(Long id, PrigradskaNaselja naselje);
	public String deleteNaselje(Long id);
}

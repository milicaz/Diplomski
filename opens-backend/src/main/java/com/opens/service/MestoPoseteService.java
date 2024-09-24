package com.opens.service;

import java.util.List;

import com.opens.model.MestoPosete;

public interface MestoPoseteService {

	public List<MestoPosete> findAll();

	public MestoPosete addMestoPosete(MestoPosete mestoPosete);

	public MestoPosete updateMestoPosete(Long id, MestoPosete mestoPosete);

	public void deleteMestoPosete(Long id);

}

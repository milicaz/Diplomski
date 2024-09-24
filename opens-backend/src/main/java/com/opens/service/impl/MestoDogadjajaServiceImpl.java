package com.opens.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.MestoDogadjaja;
import com.opens.repository.MestoDogadjajaRepository;
import com.opens.service.MestoDogadjajaService;

@Service
public class MestoDogadjajaServiceImpl implements MestoDogadjajaService {
	
	@Autowired
	private MestoDogadjajaRepository mestoDogadjajaRepo;

	@Override
	public MestoDogadjaja findByNazivSale(String nazivSale) {
		return mestoDogadjajaRepo.findByNazivSale(nazivSale);
	}

	@Override
	public List<MestoDogadjaja> findAll() {
		return mestoDogadjajaRepo.findAll();
	}

	@Override
	public MestoDogadjaja addMesto(MestoDogadjaja mesto) {
		return mestoDogadjajaRepo.save(mesto);
	}

	@Override
	public MestoDogadjaja deleteMesto(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MestoDogadjaja updateMesto(Long id, MestoDogadjaja mesto) {
		
		Optional<MestoDogadjaja> updateMesto = mestoDogadjajaRepo.findById(id);
		
		MestoDogadjaja upMesto = updateMesto.get();
		upMesto.setNazivSale(mesto.getNazivSale());
		mestoDogadjajaRepo.save(upMesto);
		
		return upMesto;
	}

}

package com.opens.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.TipDogadjaja;
import com.opens.repository.TipDogadjajaRepository;
import com.opens.service.TipDogadjajaService;

@Service
public class TipDogadjajaServiceImpl implements TipDogadjajaService {
	
	@Autowired
	private TipDogadjajaRepository tipRepo;

	@Override
	public TipDogadjaja findByNaziv(String naziv) {
		// TODO Auto-generated method stub
		return tipRepo.findByNaziv(naziv);
	}

	@Override
	public TipDogadjaja findOneById(Long id) {
		// TODO Auto-generated method stub
		return tipRepo.findOneById(id);
	}

	@Override
	public List<TipDogadjaja> findAll() {
		// TODO Auto-generated method stub
		return tipRepo.findAll();
	}

	@Override
	public TipDogadjaja addTip(TipDogadjaja tip) {
		// TODO Auto-generated method stub
		return tipRepo.save(tip);
	}

	@Override
	public TipDogadjaja updateTip(Long id, TipDogadjaja tip) {
		Optional<TipDogadjaja> upTip = tipRepo.findById(id);
		
		TipDogadjaja updateTip = upTip.get();
		updateTip.setNaziv(tip.getNaziv());
		tipRepo.save(updateTip);
		return updateTip;
	}

	@Override
	public String deleteTip(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

}

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
	public List<TipDogadjaja> findAllActive() {
		// TODO Auto-generated method stub
		return tipRepo.findAllActive();
	}

	@Override
	public TipDogadjaja addTip(TipDogadjaja tip) {
		// TODO Auto-generated method stub
		return tipRepo.save(tip);
	}

	@Override
	public TipDogadjaja updateTip(Long id, TipDogadjaja tip) {
		Optional<TipDogadjaja> upTip = tipRepo.findById(id);

		if (upTip.isPresent()) {
			TipDogadjaja updateTip = upTip.get();
			updateTip.setNaziv(tip.getNaziv());
			tipRepo.save(updateTip);
			return updateTip;
		}

		return null;
	}

	@Override
	public String deleteTip(Long id) {
		Optional<TipDogadjaja> optionalTip = tipRepo.findById(id);

		if (!optionalTip.isPresent()) {
			return "Tip događaja nije pronađen!";
		}

		TipDogadjaja tip = optionalTip.get();
		tip.setDeleted(true);
		tipRepo.save(tip);
		return "Tip događaja je obrisan!";
	}

	@Override
	public TipDogadjaja findActiveById(Long id) {
		// TODO Auto-generated method stub
		return tipRepo.findActiveById(id);
	}

}

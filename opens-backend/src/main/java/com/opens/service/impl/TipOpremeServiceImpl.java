package com.opens.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.TipOpreme;
import com.opens.repository.TipOpremeRepository;
import com.opens.service.TipOpremeService;

@Service
public class TipOpremeServiceImpl implements TipOpremeService {

	@Autowired
	private TipOpremeRepository tipOpremeRepository;

	@Override
	public List<TipOpreme> findAll() {
		return tipOpremeRepository.findAll();
	}

	@Override
	public TipOpreme addTipOpreme(TipOpreme tipOpreme) {
		return tipOpremeRepository.save(new TipOpreme(tipOpreme.getNaziv()));
	}

	@Override
	public TipOpreme updatedTipOpreme(Long id, TipOpreme tipOpreme) {
		Optional<TipOpreme> tipOpremeData = tipOpremeRepository.findById(id);

		if (tipOpremeData.isPresent()) {
			TipOpreme _tipOpreme = tipOpremeData.get();
			_tipOpreme.setNaziv(tipOpreme.getNaziv());
			return tipOpremeRepository.save(_tipOpreme);
		}
		return null;
	}

	@Override
	public void deleteTipOpreme(Long id) {
		// TODO Auto-generated method stub

	}

	@Override
	public Boolean existsByNaziv(String naziv) {
		return tipOpremeRepository.existsByNaziv(naziv);
	}

}

package com.opens.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.Oprema;
import com.opens.model.TipOpreme;
import com.opens.repository.OpremaRepository;
import com.opens.repository.TipOpremeRepository;
import com.opens.service.TipOpremeService;

@Service
public class TipOpremeServiceImpl implements TipOpremeService {

	@Autowired
	private TipOpremeRepository tipOpremeRepository;

	@Autowired
	private OpremaRepository opremaRepository;

	@Override
	public List<TipOpreme> findAll() {
		return tipOpremeRepository.findAllActive();
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
		TipOpreme _tipOpreme = tipOpremeRepository.findById(id).get();
		_tipOpreme.setDeleted(true);

		tipOpremeRepository.save(_tipOpreme);

		List<Oprema> opreme = opremaRepository.findByTipOpremeId(id);

		for (Oprema o : opreme) {
			o.setDeleted(true);
			opremaRepository.save(o);
		}

	}

	@Override
	public Boolean existsByNaziv(String naziv) {
		return tipOpremeRepository.existsByNazivAndDeletedFalse(naziv);
	}

}

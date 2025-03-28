package com.opens.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.dto.OpremaDTO;
import com.opens.model.Oprema;
import com.opens.model.TipOpreme;
import com.opens.repository.OpremaRepository;
import com.opens.repository.TipOpremeRepository;
import com.opens.service.OpremaService;

@Service
public class OpremaServiceImpl implements OpremaService {

	@Autowired
	private OpremaRepository opremaRepository;

	@Autowired
	private TipOpremeRepository tipOpremeRepository;

	@Override
	public List<Oprema> findAll() {
		return opremaRepository.findByDeletedFalse();
	}

	@Override
	public Oprema addOprema(OpremaDTO opremaDTO) {
		Optional<TipOpreme> tipOpreme = tipOpremeRepository.findById(opremaDTO.getTipOpremeID());

		Oprema _oprema = new Oprema();
		_oprema.setTipOpreme(tipOpreme.get());
		_oprema.setSerijskiBroj(opremaDTO.getSerijskiBroj());
		return opremaRepository.save(_oprema);
	}

	@Override
	public Oprema updatedOprema(Long id, OpremaDTO opremaDTO) {
		Optional<TipOpreme> tipOpreme = tipOpremeRepository.findById(opremaDTO.getTipOpremeID());
		Optional<Oprema> opremaData = opremaRepository.findById(id);

		if (opremaData.isPresent()) {
			Oprema _oprema = opremaData.get();
			_oprema.setTipOpreme(tipOpreme.get());
			_oprema.setSerijskiBroj(opremaDTO.getSerijskiBroj());
			return opremaRepository.save(_oprema);
		}

		return null;
	}

	@Override
	public void deleteOprema(Long id) {
		Oprema _oprema = opremaRepository.findById(id).get();
		_oprema.setDeleted(true);
		opremaRepository.save(_oprema);

	}

	@Override
	public List<Oprema> findByIsZauzeta() {
		return opremaRepository.findByIsZauzetaFalseAndDeletedFalseOrderByTipOpremeId();
	}

	@Override
	public Boolean existsBySerijskiBroj(String serijskiBroj) {
		return opremaRepository.existsBySerijskiBrojAndDeletedFalse(serijskiBroj);
	}
	
	@Override
	public boolean isAnyDzojstikZauzet() {
	    return opremaRepository.existsAnyZauzetDzoistik();
	}

}

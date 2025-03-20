package com.opens.service.impl;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.Obavestenja;
import com.opens.repository.ObavestenjaRepository;
import com.opens.service.ObavestenjaService;

@Service
public class ObavestenjaServiceImpl implements ObavestenjaService {

	@Autowired
	private ObavestenjaRepository obavestenjaRepository;

	@Override
	public List<Obavestenja> findAll() {
		return obavestenjaRepository.findAll();
	}
	
	@Override
	public List<Obavestenja> getValidObavestenja() {
		LocalDate today = LocalDate.now();
		List<Obavestenja> validObavestenja = obavestenjaRepository
                .findByPocetakPrikazivanjaLessThanEqualAndKrajPrikazivanjaGreaterThanEqual(today, today);
		return validObavestenja;
	}
	
	@Override
	public List<Obavestenja> getAktuelnaObavestenja() {
		LocalDate today = LocalDate.now();
		
		return obavestenjaRepository.findByKrajPrikazivanjaGreaterThanEqual(today);
	}

	@Override
	public Obavestenja addObavestenje(Obavestenja obavestenje) {
		return obavestenjaRepository.save(new Obavestenja(obavestenje.getNaziv(), obavestenje.getTekst(),
				obavestenje.getPocetakPrikazivanja(), obavestenje.getKrajPrikazivanja(), obavestenje.getPrioritet()));
	}

	@Override
	public Obavestenja updatedObavestenje(Long id, Obavestenja obavestenje) {
		Optional<Obavestenja> obavestenjeData = obavestenjaRepository.findById(id);

		if (obavestenjeData.isPresent()) {
			Obavestenja _obavestenje = obavestenjeData.get();
			_obavestenje.setNaziv(obavestenje.getNaziv());
			_obavestenje.setTekst(obavestenje.getTekst());
			_obavestenje.setPocetakPrikazivanja(obavestenje.getPocetakPrikazivanja());
			_obavestenje.setKrajPrikazivanja(obavestenje.getKrajPrikazivanja());
			_obavestenje.setPrioritet(obavestenje.getPrioritet());
			return obavestenjaRepository.save(_obavestenje);
		}
		return null;
	}

	@Override
	public void deleteObavestenje(Long id) {
		Optional<Obavestenja> obavestenjaData = obavestenjaRepository.findById(id);
		
		if(obavestenjaData.isPresent()) {
			Obavestenja _obavestenje = obavestenjaData.get();
			obavestenjaRepository.delete(_obavestenje);
		}

	}

}

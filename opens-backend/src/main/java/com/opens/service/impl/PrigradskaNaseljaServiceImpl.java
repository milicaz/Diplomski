package com.opens.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.PrigradskaNaselja;
import com.opens.repository.PrigradskaNaseljaRepository;
import com.opens.service.PrigradskaNaseljaService;

@Service
public class PrigradskaNaseljaServiceImpl implements PrigradskaNaseljaService {

	@Autowired
	private PrigradskaNaseljaRepository prigradskaNaseljaRepo;

	@Override
	public List<PrigradskaNaselja> findAllActive() {
		// TODO Auto-generated method stub
		return prigradskaNaseljaRepo.findAllActive();
	}

	@Override
	public PrigradskaNaselja addNaselje(PrigradskaNaselja naselje) {
		// TODO Auto-generated method stub
		return prigradskaNaseljaRepo.save(naselje);
	}

	@Override
	public PrigradskaNaselja updateNaselje(Long id, PrigradskaNaselja naselje) {
		Optional<PrigradskaNaselja> upNaselje = prigradskaNaseljaRepo.findById(id);

		if (upNaselje.isPresent()) {
			PrigradskaNaselja updateNaselje = upNaselje.get();

			updateNaselje.setNaziv(naselje.getNaziv());
			prigradskaNaseljaRepo.save(updateNaselje);
			return updateNaselje;
		}
		
		return null;
	}

	@Override
	public String deleteNaselje(Long id) {
		Optional<PrigradskaNaselja> optionalNaselje = prigradskaNaseljaRepo.findById(id);

		if (!optionalNaselje.isPresent()) {
			return "Prigradsko naselje nije pronađeno!";
		}

		PrigradskaNaselja naselje = optionalNaselje.get();
		naselje.setDeleted(true);
		prigradskaNaseljaRepo.save(naselje);
		return "Zaposleni je obrisan!";
	}

	@Override
	public PrigradskaNaselja findActiveById(Long id) {
		// TODO Auto-generated method stub
		return prigradskaNaseljaRepo.findActiveById(id);
	}

}

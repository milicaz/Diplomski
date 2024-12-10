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
	public List<MestoDogadjaja> findAllActive() {
		return mestoDogadjajaRepo.findAllActive();
	}

	@Override
	public MestoDogadjaja addMesto(MestoDogadjaja mesto) {
		return mestoDogadjajaRepo.save(mesto);
	}

	@Override
	public String deleteMesto(Long id) {
		Optional<MestoDogadjaja> optionalMesto = mestoDogadjajaRepo.findById(id);

		if (!optionalMesto.isPresent()) {
			return "Mesto događaja nije pronađeno!";
		}

		MestoDogadjaja mesto = optionalMesto.get();
		mesto.setDeleted(true);
		mestoDogadjajaRepo.save(mesto);
		return "Mesto događaja je obrisano!";
	}

	@Override
	public MestoDogadjaja updateMesto(Long id, MestoDogadjaja mesto) {

		Optional<MestoDogadjaja> updateMesto = mestoDogadjajaRepo.findById(id);

		if (updateMesto.isPresent()) {
			MestoDogadjaja upMesto = updateMesto.get();
			upMesto.setNazivSale(mesto.getNazivSale());
			mestoDogadjajaRepo.save(upMesto);

			return upMesto;
		}

		return null;
	}

	@Override
	public MestoDogadjaja findActiveById(Long id) {
		// TODO Auto-generated method stub
		return mestoDogadjajaRepo.findActiveById(id);
	}

}

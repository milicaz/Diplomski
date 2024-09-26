package com.opens.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.dto.DogadjajDTO;
import com.opens.model.Dogadjaj;
import com.opens.model.MestoDogadjaja;
import com.opens.model.Organizacija;
import com.opens.model.TipDogadjaja;
import com.opens.model.Ucesnik;
import com.opens.repository.DogadjajRepository;
import com.opens.repository.MestoDogadjajaRepository;
import com.opens.repository.OrganizacijaRepository;
import com.opens.repository.TipDogadjajaRepository;
import com.opens.service.DogadjajService;
import com.opens.service.UcesnikService;

@Service
public class DogadjajServiceImpl implements DogadjajService {

	@Autowired
	private DogadjajRepository dogadjajRepo;

	@Autowired
	private MestoDogadjajaRepository mestoDogadjajaRepo;

	@Autowired
	private TipDogadjajaRepository tipDogadjajaRepo;

	@Autowired
	private OrganizacijaRepository organizacijaRepo;

	@Autowired
	private UcesnikService ucesnikService;

	@Override
	public Dogadjaj findOneById(Long id) {
		// TODO Auto-generated method stub
		return dogadjajRepo.findOneById(id);
	}

	@Override
	public Dogadjaj addDogadjaj(DogadjajDTO dogadjajDTO) {
		// TODO Auto-generated method stub
		Optional<MestoDogadjaja> mestoDogadjaja = mestoDogadjajaRepo.findById(dogadjajDTO.getMestoDogadjajaId());
		Optional<TipDogadjaja> tipDogadjaja = tipDogadjajaRepo.findById(dogadjajDTO.getVrstaDogadjajaId());
		Optional<Organizacija> organizacija = organizacijaRepo.findById(dogadjajDTO.getOrganizacijaId());

		Dogadjaj dogadjaj = new Dogadjaj();
		dogadjaj.setNaziv(dogadjajDTO.getNaziv());
		dogadjaj.setDatum(dogadjajDTO.getDatum());
		dogadjaj.setPocetakDogadjaja(dogadjajDTO.getPocetakDogadjaja());
		dogadjaj.setKrajDogadjaja(dogadjajDTO.getKrajDogadjaja());
		dogadjaj.setMesto(mestoDogadjaja.get());
		dogadjaj.setVrsta(tipDogadjaja.get());
		dogadjaj.setOrganizacija(organizacija.get());
		dogadjajRepo.save(dogadjaj);

		return dogadjaj;
	}

	@Override
	public List<Dogadjaj> findAllActive() {
		// TODO Auto-generated method stub
		return dogadjajRepo.findAllActive();
	}

	@Override
	public String deleteDogadjaj(Long id) {
		Optional<Dogadjaj> optionalDogadjaj = dogadjajRepo.findById(id);
		if (!optionalDogadjaj.isPresent()) {
			return "Događaj nije pronađen!";
		}
		Dogadjaj dogadjaj = optionalDogadjaj.get();
		List<Ucesnik> ucesnici = ucesnikService.sviUcesniciDogadjaja(id);
		for (Ucesnik u : ucesnici) {
			u.setDeleted(true);
		}
		dogadjaj.setDeleted(true);
		dogadjajRepo.save(dogadjaj);
		return "Događaj je obrisan!";
	}

	@Override
	public Dogadjaj findActiveById(Long id) {
		// TODO Auto-generated method stub
		return dogadjajRepo.findActiveById(id);
	}

}

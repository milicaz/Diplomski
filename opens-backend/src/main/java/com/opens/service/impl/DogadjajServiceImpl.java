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

	@Override
	public String updateDogadjaj(Long id, Dogadjaj dogadjaj) {
		// Retrieve related entities
		Optional<MestoDogadjaja> mestoDogadjajaOpt = mestoDogadjajaRepo.findById(dogadjaj.getMesto().getId());
		Optional<TipDogadjaja> tipDogadjajaOpt = tipDogadjajaRepo.findById(dogadjaj.getVrsta().getId());
		Optional<Organizacija> organizacijaOpt = organizacijaRepo.findById(dogadjaj.getOrganizacija().getId());

		// Ensure the entities exist
		if (!mestoDogadjajaOpt.isPresent() || !tipDogadjajaOpt.isPresent() || !organizacijaOpt.isPresent()) {
			return ("One or more related entities not found");
		}

		MestoDogadjaja updateMesto = mestoDogadjajaOpt.get();
		TipDogadjaja updateTip = tipDogadjajaOpt.get();
		Organizacija updateOrganizacija = organizacijaOpt.get();

		updateMesto.setNazivSale(dogadjaj.getMesto().getNazivSale());

		updateTip.setNaziv(dogadjaj.getVrsta().getNaziv());

		// Update fields of the Organizacija
		updateOrganizacija.setNaziv(dogadjaj.getOrganizacija().getNaziv());
		updateOrganizacija.setOdgovornaOsoba(dogadjaj.getOrganizacija().getOdgovornaOsoba());
		updateOrganizacija.setBrojTelefona(dogadjaj.getOrganizacija().getBrojTelefona());
		updateOrganizacija.setEmail(dogadjaj.getOrganizacija().getEmail());
		updateOrganizacija.setDelatnost(dogadjaj.getOrganizacija().getDelatnost());
		updateOrganizacija.setOpis(dogadjaj.getOrganizacija().getOpis());
		updateOrganizacija.setLink(dogadjaj.getOrganizacija().getLink());

		// Save the updated Organizacija (if needed)
		organizacijaRepo.save(updateOrganizacija);

		// Get the existing Dogadjaj to update
		Optional<Dogadjaj> upDogadjaj = dogadjajRepo.findById(id);
		if (!upDogadjaj.isPresent()) {
			return ("Dogadjaj not found");
		}

		Dogadjaj updateDogadjaj = upDogadjaj.get();
		updateDogadjaj.setNaziv(dogadjaj.getNaziv());
		updateDogadjaj.setDatum(dogadjaj.getDatum());
		updateDogadjaj.setPocetakDogadjaja(dogadjaj.getPocetakDogadjaja());
		updateDogadjaj.setKrajDogadjaja(dogadjaj.getKrajDogadjaja());
		updateDogadjaj.setMesto(updateMesto);
		updateDogadjaj.setVrsta(updateTip);
		updateDogadjaj.setOrganizacija(updateOrganizacija);

		// Save the updated Dogadjaj
		dogadjajRepo.save(updateDogadjaj);
		
		return ("Dogadjaj is updated!");
	}

}

package com.opens.service.impl;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.Dogadjaj;
import com.opens.model.PrigradskaNaselja;
import com.opens.model.Ucesnik;
import com.opens.repository.DogadjajRepository;
import com.opens.repository.PrigradskaNaseljaRepository;
import com.opens.repository.UcesnikRepository;
import com.opens.service.UcesnikService;

@Service
public class UcesnikServiceImpl implements UcesnikService {

	@Autowired
	private DogadjajRepository dogadjajRepo;

	@Autowired
	private PrigradskaNaseljaRepository pnRepo;

	@Autowired
	private UcesnikRepository ucesnikRepo;

	@Override
	public String addUcesnik(Ucesnik ucesnik, Long id) {
		// TODO Auto-generated method stub
		Ucesnik uc = new Ucesnik(ucesnik.getIme(), ucesnik.getPrezime(), ucesnik.getRod(), ucesnik.getGodine(),
				ucesnik.getMestoBoravista().toUpperCase(), ucesnik.getBrojTelefona(), ucesnik.getEmail(), ucesnik.getOrganizacija(),
				ucesnik.isPrigradskoNaselje());

		Dogadjaj dogadjaj = dogadjajRepo.getReferenceById(id);
		System.out.println("Dogadjaj by id je: " + dogadjaj.getNaziv());

		List<PrigradskaNaselja> pn = new ArrayList<>();
		pn = pnRepo.findAll();

		System.out.println("Prigradska Naselja su: " + pn);

		for (PrigradskaNaselja n : pn) {
			System.out.println("Mesto boravista je: " + ucesnik.getMestoBoravista());
			System.out.println("Naselje je: " + n.getNaziv());
			System.out.println("Boolean je: " + ucesnik.getMestoBoravista().equals(n.getNaziv()));
			if (ucesnik.getMestoBoravista().toUpperCase().equals(n.getNaziv())) {
				uc.setPrigradskoNaselje(true);
				break;
			} else {
				uc.setPrigradskoNaselje(false);
			}
		}

		Set<Ucesnik> ucesnici = new HashSet<>();
		ucesnici.add(ucesnik);

		Set<Dogadjaj> dogadjaji = new HashSet<>();
		dogadjaji.add(dogadjaj);

		uc.setDogadjaji(dogadjaji);

		uc = ucesnikRepo.save(uc);

		dogadjaj.setUcesnici(ucesnici);

		dogadjajRepo.save(dogadjaj);
		return "Ucesnik je sacuvan!";
	}

	@Override
	public List<Ucesnik> sviUcesniciDogadjaja(Long id) {
		Dogadjaj dogadjaj = dogadjajRepo.findOneById(id);
		List<Ucesnik> ucesnici = new ArrayList<>();
		for (Ucesnik u : dogadjaj.getUcesnici()) {
			if (!u.isDeleted()) {
				ucesnici.add(u);
			}
		}
		return ucesnici;
	}

	@Override
	public String deleteUcesnik(Long id) {
		Optional<Ucesnik> optionalUcesnik = ucesnikRepo.findById(id);
		if (!optionalUcesnik.isPresent()) {
			return "Učesnik nije pronađen!";
		}
		Ucesnik ucesnik = optionalUcesnik.get();
		ucesnik.setDeleted(true);
		ucesnikRepo.save(ucesnik);
		return "Učesnik je obrisan!";
	}

	@Override
	public Ucesnik updateUcesnik(Long id, Ucesnik ucesnik) {
		Optional<Ucesnik> updateUcesnik = ucesnikRepo.findById(id);

		if (updateUcesnik.isPresent()) {

			Ucesnik upUcesnik = updateUcesnik.get();
			upUcesnik.setIme(ucesnik.getIme());
			upUcesnik.setPrezime(ucesnik.getPrezime());
			upUcesnik.setRod(ucesnik.getRod());
			upUcesnik.setGodine(ucesnik.getGodine());
			upUcesnik.setMestoBoravista(ucesnik.getMestoBoravista().toUpperCase());
			upUcesnik.setBrojTelefona(ucesnik.getBrojTelefona());
			upUcesnik.setEmail(ucesnik.getEmail());
			upUcesnik.setOrganizacija(ucesnik.getOrganizacija());
			ucesnikRepo.save(upUcesnik);

			return upUcesnik;
		}

		return null;
	}

}

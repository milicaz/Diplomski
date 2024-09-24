package com.opens.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.DogadjajDTO;
import com.opens.model.Dogadjaj;
import com.opens.model.MestoDogadjaja;
import com.opens.model.Organizacija;
import com.opens.model.PrigradskaNaselja;
import com.opens.model.TipDogadjaja;
import com.opens.model.Ucesnik;
import com.opens.repository.DogadjajRepository;
import com.opens.repository.MestoDogadjajaRepository;
import com.opens.repository.OrganizacijaRepository;
import com.opens.repository.PrigradskaNaseljaRepository;
import com.opens.repository.TipDogadjajaRepository;
import com.opens.repository.UcesnikRepository;
import com.opens.service.DogadjajService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DogadjajController {

	@Autowired
	private DogadjajRepository dogadjajRepo;

	@Autowired
	private MestoDogadjajaRepository mestoDogadjajaRepo;

	@Autowired
	private TipDogadjajaRepository tipDogadjajaRepo;

	@Autowired
	private OrganizacijaRepository organizacijaRepo;

	@Autowired
	private UcesnikRepository ucesniciRepo;

	@Autowired
	private PrigradskaNaseljaRepository pnRepo;
	
	@Autowired
	private DogadjajService dogadjajService;

	@GetMapping("/dogadjaji")
	public ResponseEntity<List<Dogadjaj>> getAll() {
//		List<Dogadjaj> dogadjaji = new ArrayList<>();
//		dogadjaji = dogadjajRepo.findAll();

		return new ResponseEntity<>(dogadjajService.findAll(), HttpStatus.OK);

	}

	@PostMapping("/dogadjaji")
	public ResponseEntity<Dogadjaj> save(@RequestBody DogadjajDTO dogadjajDTO) {
//		Optional<MestoDogadjaja> mestoDogadjaja = mestoDogadjajaRepo.findById(dogadjajDTO.getMestoDogadjajaId());
//		Optional<TipDogadjaja> tipDogadjaja = tipDogadjajaRepo.findById(dogadjajDTO.getVrstaDogadjajaId());
//		Optional<Organizacija> organizacija = organizacijaRepo.findById(dogadjajDTO.getOrganizacijaId());
//
//		Dogadjaj dogadjaj = new Dogadjaj();
//		dogadjaj.setNaziv(dogadjajDTO.getNaziv());
//		dogadjaj.setDatum(dogadjajDTO.getDatum());
//		dogadjaj.setPocetakDogadjaja(dogadjajDTO.getPocetakDogadjaja());
//		dogadjaj.setKrajDogadjaja(dogadjajDTO.getKrajDogadjaja());
//		dogadjaj.setMesto(mestoDogadjaja.get());
//		dogadjaj.setVrsta(tipDogadjaja.get());
//		dogadjaj.setOrganizacija(organizacija.get());
//		dogadjajRepo.save(dogadjaj);
		
//		System.out.println("Id dogadjaja je: " + dogadjaj.getId());

		return new ResponseEntity<>(dogadjajService.addDogadjaj(dogadjajDTO), HttpStatus.OK);

	}

	@PutMapping("/dogadjaji/{id}")
	public ResponseEntity<String> updateDogadjaj(@PathVariable Long id, @RequestBody DogadjajDTO dogadjajDTO) {
		Optional<MestoDogadjaja> mestoDogadjaja = mestoDogadjajaRepo.findById(dogadjajDTO.getMestoDogadjajaId());
		Optional<TipDogadjaja> tipDogadjaja = tipDogadjajaRepo.findById(dogadjajDTO.getVrstaDogadjajaId());
		Optional<Organizacija> organizacija = organizacijaRepo.findById(dogadjajDTO.getOrganizacijaId());

		Optional<Dogadjaj> upDogadjaj = dogadjajRepo.findById(id);

		MestoDogadjaja updateMesto = mestoDogadjaja.get();

		TipDogadjaja updateTip = tipDogadjaja.get();

		Organizacija updateOrganizacija = organizacija.get();

		Set<Ucesnik> updateUcesnici = new HashSet<>();

		Dogadjaj updateDogadjaj = upDogadjaj.get();
		updateDogadjaj.setNaziv(dogadjajDTO.getNaziv());
		updateDogadjaj.setDatum(dogadjajDTO.getDatum());
		updateDogadjaj.setPocetakDogadjaja(dogadjajDTO.getPocetakDogadjaja());
		updateDogadjaj.setKrajDogadjaja(dogadjajDTO.getKrajDogadjaja());
		updateDogadjaj.setMesto(updateMesto);
		updateDogadjaj.setVrsta(updateTip);
		updateDogadjaj.setOrganizacija(updateOrganizacija);

		List<Ucesnik> postojeciUcesnici = new ArrayList<>();
		postojeciUcesnici = ucesniciRepo.findAll();

		Set<Dogadjaj> dogadjaji = new HashSet<>();
		dogadjaji.add(updateDogadjaj);

		List<PrigradskaNaselja> pn = new ArrayList<>();
		pn = pnRepo.findAll();

		for (Ucesnik ucesnik : dogadjajDTO.getUcesnici()) {
//			System.out.println("Usao je u prvi for");
//			System.out.println("Provera " + postojeciUcesnici != null && !postojeciUcesnici.isEmpty());
//			System.out.println("Ucesnik je: " + ucesnik.toString());
			if (postojeciUcesnici != null && !postojeciUcesnici.isEmpty()) {
//				System.out.println("Postojeci nisu jednaki null");
				for (Ucesnik uc : postojeciUcesnici) {
//					System.out.println("Usao je u drugi for");
//					System.out.println("Uc id " + uc.getId());
//					System.out.println("Ucesnik id " + ucesnik.getId());
					if (uc.getId() == ucesnik.getId()) {
//						System.out.println("Provera" + dogadjajRepo.existsById(ucesnik.getId()));
						Optional<Ucesnik> ucesnici = ucesniciRepo.findById(ucesnik.getId());
						
							Ucesnik postojeciUcesnik = ucesnici.get();
							postojeciUcesnik.setDogadjaji(dogadjaji);
							postojeciUcesnik.setIme(ucesnik.getIme());
							postojeciUcesnik.setPrezime(ucesnik.getPrezime());
							postojeciUcesnik.setBrojTelefona(ucesnik.getBrojTelefona());
							postojeciUcesnik.setEmail(ucesnik.getEmail());
							postojeciUcesnik.setGodine(ucesnik.getGodine());
							postojeciUcesnik.setMestoBoravista(ucesnik.getMestoBoravista());
							postojeciUcesnik.setOrganizacija(ucesnik.getOrganizacija());
							postojeciUcesnik.setRod(ucesnik.getRod());
							for (PrigradskaNaselja naselje : pn) {
//								System.out.println("Mesto boravista je: " + postojeciUcesnik.getMestoBoravista());
//								System.out.println("Naselje je: " + naselje.getNaziv());
								if (postojeciUcesnik.getMestoBoravista().equals(naselje.getNaziv())) {
									postojeciUcesnik.setPrigradskoNaselje(true);
//									System.out.println("Usao je u prvi if");
								}
							}
							ucesniciRepo.save(postojeciUcesnik);
						
//				ucesnik.setDogadjaji(dogadjaji);
//				updateUcesnici.add(ucesnik);
					}else {
//				System.out.println("Usao je u else");
						for (PrigradskaNaselja naselje : pn) {
//							System.out.println("Mesto boravista je: " + ucesnik.getMestoBoravista());
//							System.out.println("Naselje je: " + naselje.getNaziv());
							if (ucesnik.getMestoBoravista().equals(naselje.getNaziv())) {
								ucesnik.setPrigradskoNaselje(true);
//								System.out.println("Usao je u prvi if");
							}
						}
						ucesnik.setDogadjaji(dogadjaji);
						updateUcesnici.add(ucesnik);
						
					}
				}
			}else {
//				System.out.println("Usao je u else");
						for (PrigradskaNaselja naselje : pn) {
//							System.out.println("Mesto boravista je: " + ucesnik.getMestoBoravista());
//							System.out.println("Naselje je: " + naselje.getNaziv());
							if (ucesnik.getMestoBoravista().equals(naselje.getNaziv())) {
								ucesnik.setPrigradskoNaselje(true);
//								System.out.println("Usao je u prvi if");
							}
						}
						ucesnik.setDogadjaji(dogadjaji);
						updateUcesnici.add(ucesnik);
						
					}
			ucesniciRepo.saveAll(updateUcesnici);
		}
//		ucesniciRepo.saveAll(updateUcesnici);

		dogadjajRepo.save(updateDogadjaj);

		return new ResponseEntity<>("Dogadjaj je izmenjen!", HttpStatus.OK);
	}

}

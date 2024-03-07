package com.opens.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.DogadjajDTO;
import com.opens.model.Dogadjaj;
import com.opens.model.MestoDogadjaja;
import com.opens.model.Organizacija;
import com.opens.model.TipDogadjaja;
import com.opens.repository.DogadjajRepository;
import com.opens.repository.MestoDogadjajaRepository;
import com.opens.repository.OrganizacijaRepository;
import com.opens.repository.TipDogadjajaRepository;

@RestController
@RequestMapping("/api")
public class DogadjajController {
	
	@Autowired
	private DogadjajRepository dogadjajRepo;
	
	@Autowired
	private MestoDogadjajaRepository mestoDogadjajaRepo;
	
	@Autowired
	private TipDogadjajaRepository tipDogadjajaRepo;
	
	@Autowired
	private OrganizacijaRepository organizacijaRepo;
	
	@GetMapping("/dogadjaji")
	public ResponseEntity<List<Dogadjaj>> getAll() {
		List<Dogadjaj> dogadjaji = new ArrayList<>();
		dogadjaji = dogadjajRepo.findAll();
		
		return new ResponseEntity<>(dogadjaji, HttpStatus.OK);
		
	}
	
	@PostMapping("/dogadjaji")
	public ResponseEntity<Dogadjaj> save(@RequestBody DogadjajDTO dogadjajDTO){
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
		
		return new ResponseEntity<>(dogadjaj, HttpStatus.OK);
		
	}
	

}

package com.opens.controller;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.DogadjajDTO;
import com.opens.model.Dogadjaj;
import com.opens.model.Ucesnik;
import com.opens.repository.DogadjajRepository;
import com.opens.repository.UcesnikRepository;

@RestController
@RequestMapping("/api")
public class UcesnikController {
	
	@Autowired
	private UcesnikRepository ucesnikRepo;
	
	@Autowired
	private DogadjajRepository dogadjajRepo;
	
	
	@PostMapping("/ucesniciDogadjaja/{id}")
	public String createUcesnikForDogadjaj(@RequestBody Ucesnik ucesnik,
			@PathVariable(name = "id") Long id) {
		Ucesnik uc = new Ucesnik(ucesnik.getIme(), ucesnik.getPrezime(),
				ucesnik.getRod(), ucesnik.getGodine(), ucesnik.getBrojTelefona(),
				ucesnik.getEmail(), ucesnik.getMestoBoravista(), ucesnik.getOrganizacija());
		
		
		Dogadjaj dogadjaj = dogadjajRepo.getReferenceById(id);
		System.out.println("Dogadjaj by id je: " + dogadjaj.getNaziv());
		
		Set<Ucesnik> ucesnici = new HashSet<>();
		ucesnici.add(ucesnik);
		
		Set<Dogadjaj> dogadjaji = new HashSet<>();
		dogadjaji.add(dogadjaj);
		
		uc.setDogadjaji(dogadjaji);
		
		uc = ucesnikRepo.save(uc);
		
		System.out.println("Ucesnik je: " + ucesnik.getIme());
		
		System.out.println("Ucesnici su: " + ucesnici);
		
		dogadjaj.setUcesnici(ucesnici);
		
		dogadjajRepo.save(dogadjaj);

		
		
		return "Ucesnik je sacuvan!";
	}

}

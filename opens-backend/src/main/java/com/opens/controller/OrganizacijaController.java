package com.opens.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Organizacija;
import com.opens.repository.OrganizacijaRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class OrganizacijaController {
	
	@Autowired
	private OrganizacijaRepository organizacijaRepo;
	
	@GetMapping("/organizacije")
	public ResponseEntity<List<Organizacija>> getAll() {
		List<Organizacija> organizacije = new ArrayList<>();
		organizacije = organizacijaRepo.findAll();
		
		return new ResponseEntity<>(organizacije, HttpStatus.OK);
	}
	
	@PostMapping("/organizacije")
	public ResponseEntity<Organizacija> save(@RequestBody Organizacija organizacija){
		Organizacija org = organizacijaRepo.save(organizacija);
		
		return new ResponseEntity<>(org, HttpStatus.OK);
	}
	
	@PutMapping("/organizacije/{id}")
	public ResponseEntity<Organizacija> updateOrganizacija(@PathVariable Long id, @RequestBody Organizacija organizacija) {
		Optional<Organizacija> upOrganizacija = organizacijaRepo.findById(id);
		
		Organizacija updateOrganizacija = upOrganizacija.get();
		updateOrganizacija.setNaziv(organizacija.getNaziv());
		updateOrganizacija.setBrojTelefona(organizacija.getBrojTelefona());
		updateOrganizacija.setDelatnost(organizacija.getDelatnost());
		updateOrganizacija.setEmail(organizacija.getEmail());
		updateOrganizacija.setLink(organizacija.getLink());
		updateOrganizacija.setOdgovornaOsoba(organizacija.getOdgovornaOsoba());
		updateOrganizacija.setOpis(organizacija.getOpis());
		
		organizacijaRepo.save(updateOrganizacija);
		
		return new ResponseEntity<>(updateOrganizacija, HttpStatus.OK);
	}
	
	@DeleteMapping("/organizacije/{id}")
	public ResponseEntity<String> deleteOrganizacija(@PathVariable Long id){
		organizacijaRepo.deleteById(id);
		
		return new ResponseEntity<>("Organizacija je obrisana.", HttpStatus.OK);
	}

}

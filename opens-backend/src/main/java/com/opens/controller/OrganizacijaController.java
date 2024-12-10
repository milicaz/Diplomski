package com.opens.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

import com.opens.model.Organizacija;
import com.opens.service.OrganizacijaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class OrganizacijaController {
	
	@Autowired
	private OrganizacijaService organizacijaService;
	
	@GetMapping("/organizacije")
	public ResponseEntity<List<Organizacija>> getAll() {
		List<Organizacija> organizacije = new ArrayList<>();
		organizacije = organizacijaService.findAll();
		
		if(organizacije.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(organizacije, HttpStatus.OK);
	}
	
	@GetMapping("/organizacije/{id}")
	public ResponseEntity<Optional<Organizacija>> getOne(@PathVariable Long id) {
		Optional<Organizacija> org = organizacijaService.findById(id);
		
		if(org.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(org, HttpStatus.OK);
	}
	
	@GetMapping("/organizacija/search/{naziv}")
	public ResponseEntity<Organizacija> getByNaziv(@PathVariable String naziv) {
		Optional<Organizacija> organizacija = organizacijaService.findByNaziv(naziv);
		
		return organizacija.map(o -> new ResponseEntity<>(o, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
	}
	
	@PostMapping("/organizacije")
	public ResponseEntity<Organizacija> save(@RequestBody Organizacija organizacija){
		try {
			Organizacija org = organizacijaService.addOrganizacija(organizacija);
			return new ResponseEntity<>(org, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/organizacije/{id}")
	public ResponseEntity<Organizacija> updateOrganizacija(@PathVariable Long id, @RequestBody Organizacija organizacija) {
		Organizacija updateOrganizacija = organizacijaService.updateOrganizacija(id, organizacija);
		
		if(updateOrganizacija == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(updateOrganizacija, HttpStatus.OK);
		}
	}
	
//	@DeleteMapping("/organizacije/{id}")
//	public ResponseEntity<String> deleteOrganizacija(@PathVariable Long id){
//		organizacijaRepo.deleteById(id);
//		
//		return new ResponseEntity<>("Organizacija je obrisana.", HttpStatus.OK);
//	}
	

}

package com.opens.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Organizacija;
import com.opens.repository.OrganizacijaRepository;

@RestController
@RequestMapping("/api")
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

}

package com.opens.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Dogadjaj;
import com.opens.model.PrigradskaNaselja;
import com.opens.model.Ucesnik;
import com.opens.repository.DogadjajRepository;
import com.opens.repository.PrigradskaNaseljaRepository;
import com.opens.repository.UcesnikRepository;
import com.opens.service.UcesnikService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UcesnikController {
	
	@Autowired
	private UcesnikRepository ucesnikRepo;
	
	@Autowired
	private DogadjajRepository dogadjajRepo;
	
	@Autowired
	private PrigradskaNaseljaRepository pnRepo;
	
	@Autowired
	private UcesnikService ucesnikService;
	
	
	@GetMapping("/sviUcesniciDogadjaja/{id}")
	public ResponseEntity<List<Ucesnik>> getAll(@PathVariable Long id){		
		return new ResponseEntity<>(ucesnikService.sviUcesniciDogadjaja(id), HttpStatus.OK);
		
	} 
	
	@PostMapping("/ucesniciDogadjaja/{id}")
	public String createUcesnikForDogadjaj(@RequestBody Ucesnik ucesnik,
			@PathVariable(name = "id") Long id) {
		return ucesnikService.addUcesnik(ucesnik, id);
	}

}

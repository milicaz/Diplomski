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

import com.opens.model.PrigradskaNaselja;
import com.opens.repository.PrigradskaNaseljaRepository;

@RestController
@RequestMapping("/api")
public class PrigradskaNaseljaController {
	
	@Autowired
	private PrigradskaNaseljaRepository prigradskaNaseljaRepo;
	
	@GetMapping("/prigradskaNaselja")
	public ResponseEntity<List<PrigradskaNaselja>> getAll() {
		List<PrigradskaNaselja> naselja = new ArrayList<>();
		naselja = prigradskaNaseljaRepo.findAll();
		
		return new ResponseEntity<>(naselja, HttpStatus.OK);
	}
	
	@PostMapping("/prigradskaNaselja")
	public ResponseEntity<PrigradskaNaselja> save(@RequestBody PrigradskaNaselja prigradskaNaselja) {
		PrigradskaNaselja naselje = prigradskaNaseljaRepo.save(prigradskaNaselja);
		
		return  new ResponseEntity<>(naselje, HttpStatus.OK);
	}

}

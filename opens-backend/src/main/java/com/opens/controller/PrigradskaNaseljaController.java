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

import com.opens.model.PrigradskaNaselja;
import com.opens.repository.PrigradskaNaseljaRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
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
	
	@PutMapping("/prigradskaNaselja/{id}")
	public ResponseEntity<PrigradskaNaselja> updateNaselje(@PathVariable Long id, @RequestBody PrigradskaNaselja naselje) {
		Optional<PrigradskaNaselja> upNaselje = prigradskaNaseljaRepo.findById(id);
		PrigradskaNaselja updateNaselje = upNaselje.get();
		
		updateNaselje.setNaziv(naselje.getNaziv());
		prigradskaNaseljaRepo.save(updateNaselje);
		
		return new ResponseEntity<>(updateNaselje, HttpStatus.OK);
	}
	
	@DeleteMapping("/prigradskaNaselja/{id}")
	public ResponseEntity<String> deleteNaselje(@PathVariable Long id) {
		prigradskaNaseljaRepo.deleteById(id);
		return new ResponseEntity<>("Naselje je obrisano", HttpStatus.OK);
	}

}

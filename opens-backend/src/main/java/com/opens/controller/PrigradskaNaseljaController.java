package com.opens.controller;

import java.util.ArrayList;
import java.util.List;

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
import com.opens.service.PrigradskaNaseljaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PrigradskaNaseljaController {


	@Autowired
	private PrigradskaNaseljaService naseljeService;

	@GetMapping("/prigradskaNaselja")
	public ResponseEntity<List<PrigradskaNaselja>> getAll() {
		List<PrigradskaNaselja> prigradskaNaselja = new ArrayList<>();
		prigradskaNaselja = naseljeService.findAllActive();
		
		if(prigradskaNaselja.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(prigradskaNaselja, HttpStatus.OK);
	}

	@PostMapping("/prigradskaNaselja")
	public ResponseEntity<PrigradskaNaselja> save(@RequestBody PrigradskaNaselja prigradskaNaselja) {
		try {
			PrigradskaNaselja naselje = naseljeService.addNaselje(prigradskaNaselja);
			return new ResponseEntity<>(naselje, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/prigradskaNaselja/{id}")
	public ResponseEntity<PrigradskaNaselja> updateNaselje(@PathVariable Long id,
			@RequestBody PrigradskaNaselja naselje) {
		PrigradskaNaselja updateNaselje = naseljeService.updateNaselje(id, naselje);
		
		if(updateNaselje == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(updateNaselje, HttpStatus.OK);
		}
	}

	@DeleteMapping("/prigradskaNaselja/{id}")
	public ResponseEntity<String> deleteNaselje(@PathVariable Long id) {
		try {
			naseljeService.deleteNaselje(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

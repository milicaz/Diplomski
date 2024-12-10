package com.opens.controller;

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

import com.opens.model.Ucesnik;
import com.opens.service.UcesnikService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UcesnikController {

	@Autowired
	private UcesnikService ucesnikService;

	@GetMapping("/sviUcesniciDogadjaja/{id}")
	public ResponseEntity<List<Ucesnik>> getAll(@PathVariable Long id) {
		List<Ucesnik> ucesnici = ucesnikService.sviUcesniciDogadjaja(id);
		
		if(ucesnici.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(ucesnici, HttpStatus.OK);
	}

	@PostMapping("/ucesniciDogadjaja/{id}")
	public ResponseEntity<String> createUcesnikForDogadjaj(@RequestBody Ucesnik ucesnik, @PathVariable(name = "id") Long id) {
		try {
			String uc = ucesnikService.addUcesnik(ucesnik, id);
			if(uc == "Ucesnik je sacuvan!") {
				return new ResponseEntity<>(HttpStatus.CREATED);
			}
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
		return new ResponseEntity<>(HttpStatus.OK);
		
	}
	
	@PutMapping("/ucesnik/update/{id}")
	public ResponseEntity<Ucesnik> updateUcesnik(@PathVariable Long id, @RequestBody Ucesnik ucesnik) {
		Ucesnik updateUcesnik = ucesnikService.updateUcesnik(id, ucesnik);
		
		if(updateUcesnik == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(updateUcesnik, HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/ucesnik/delete/{id}")
	public ResponseEntity<String> deleteUcesnik(@PathVariable Long id) {
		try {
			ucesnikService.deleteUcesnik(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}

	}

}

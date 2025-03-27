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

import com.opens.model.Obavestenja;
import com.opens.service.ObavestenjaService;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ObavestenjaController {

	@Autowired
	private ObavestenjaService obavestenjaService;

	@GetMapping("/obavestenja")
	public ResponseEntity<List<Obavestenja>> getAllObavestenja() {
		List<Obavestenja> obavestenja = new ArrayList<>();
		obavestenjaService.findAll().forEach(obavestenja::add);

		if (obavestenja.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(obavestenja, HttpStatus.OK);
	}

	@GetMapping("/obavestenja/validna")
	@Transactional
	public ResponseEntity<List<Obavestenja>> getValidObavestenja() {
		List<Obavestenja> validObavestenja = obavestenjaService.getValidObavestenja();
		return new ResponseEntity<>(validObavestenja, HttpStatus.OK);
	}
	
	@GetMapping("/obavestenja/aktuelna")
	@Transactional
	public ResponseEntity<List<Obavestenja>> getAktuelnaObavestenja() {
		List<Obavestenja> aktuelnaObavestenja = obavestenjaService.getAktuelnaObavestenja();
		return new ResponseEntity<>(aktuelnaObavestenja, HttpStatus.OK);
	}

	@PostMapping("/obavestenja")
	public ResponseEntity<Obavestenja> createObavestenje(@RequestBody Obavestenja obavestenje) {
		try {
			Obavestenja _obavestenje = obavestenjaService.addObavestenje(obavestenje);
			return new ResponseEntity<>(_obavestenje, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/obavestenja/{id}")
	public ResponseEntity<Obavestenja> updateObavestenje(@PathVariable Long id, @RequestBody Obavestenja obavestenje) {
		Obavestenja updatedObavestenje = obavestenjaService.updatedObavestenje(id, obavestenje);

		if (updatedObavestenje == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(updatedObavestenje, HttpStatus.OK);
		}
	}

	@DeleteMapping("/obavestenja/{id}")
	public ResponseEntity<HttpStatus> deleteObavestenje(@PathVariable Long id) {
		try {
			obavestenjaService.deleteObavestenje(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

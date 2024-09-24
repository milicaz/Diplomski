package com.opens.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Zaposleni;
import com.opens.service.ZaposleniService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ZaposleniController {

	@Autowired
	private ZaposleniService zaposleniService;

	@GetMapping("/zaposleni")
	public ResponseEntity<List<Zaposleni>> getAll() {

		return new ResponseEntity<>(zaposleniService.findAllActive(), HttpStatus.OK);
	}

	@PutMapping("/zaposleni/{id}")
	public ResponseEntity<Zaposleni> updateZaposleni(@PathVariable Long id, @RequestBody Zaposleni zaposleni) {

		return new ResponseEntity<>(zaposleniService.updateZaposleni(id, zaposleni), HttpStatus.OK);
	}

	// Logicko brisanje
	@DeleteMapping("/zaposleni/delete/{id}")
	public ResponseEntity<String> logicalDelete(@PathVariable Long id) {

		return new ResponseEntity<>(zaposleniService.deleteZaposleni(id), HttpStatus.OK);
	}

}

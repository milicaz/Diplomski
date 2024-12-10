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

import com.opens.model.MestoDogadjaja;
import com.opens.service.MestoDogadjajaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MestoDogadjajaController {

	@Autowired
	private MestoDogadjajaService mestoService;

	@GetMapping("/mestaDogadjaja")
	public ResponseEntity<List<MestoDogadjaja>> getAll() {
		List<MestoDogadjaja> mestaDogadjaja = new ArrayList<>();
		mestaDogadjaja = mestoService.findAllActive();
		
		if(mestaDogadjaja.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(mestaDogadjaja, HttpStatus.OK);
	}

	@GetMapping("/mestoDogadjaja/{nazivSale}")
	public ResponseEntity<Long> getMesto(@PathVariable String nazivSale) {
		MestoDogadjaja mesto = mestoService.findByNazivSale(nazivSale);
		
		if(mesto == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(mesto.getId(), HttpStatus.OK);
	}

	@PostMapping("/mestaDogadjaja")
	public ResponseEntity<MestoDogadjaja> save(@RequestBody MestoDogadjaja mestoDogadjaja) {
		try {
			MestoDogadjaja md = mestoService.addMesto(mestoDogadjaja);
			return new ResponseEntity<>(md, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/mestaDogadjaja/{id}")
	public ResponseEntity<MestoDogadjaja> updateMesto(@PathVariable Long id, @RequestBody MestoDogadjaja mesto) {
		MestoDogadjaja updateMesto = mestoService.updateMesto(id, mesto);
		
		if(updateMesto == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
		
			return new ResponseEntity<>(updateMesto, HttpStatus.OK);
		}
	}

	@DeleteMapping("/mestaDogadjaja/{id}")
	public ResponseEntity<String> deleteMesto(@PathVariable Long id) {
		try {
			mestoService.deleteMesto(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

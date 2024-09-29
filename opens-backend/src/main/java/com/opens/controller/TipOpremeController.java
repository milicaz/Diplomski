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

import com.opens.model.TipOpreme;
import com.opens.service.TipOpremeService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TipOpremeController {
	
	@Autowired
	private TipOpremeService tipOpremeService;

	@GetMapping("/tipoviOpreme")
	public ResponseEntity<List<TipOpreme>> getAllTipoveOpreme() {
		List<TipOpreme> tipoviOpreme = new ArrayList<>();
		tipOpremeService.findAll().forEach(tipoviOpreme::add);

		if (tipoviOpreme.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(tipoviOpreme, HttpStatus.OK);
	}
	
	@GetMapping("/tipoviOpreme/{naziv}")
	public ResponseEntity<String> checkIfTipOpremeExists(@PathVariable String naziv) {
		Boolean tipOpremeExists = tipOpremeService.existsByNaziv(naziv);
		
		if (tipOpremeExists) {
			return new ResponseEntity<>("exists", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("do-not-exist", HttpStatus.OK);
		}
	}

	@PostMapping("/tipoviOpreme")
	public ResponseEntity<TipOpreme> createTipOpreme(@RequestBody TipOpreme tipOpreme) {
		try {
			TipOpreme _tipOpreme = tipOpremeService.addTipOpreme(tipOpreme);
			return new ResponseEntity<>(_tipOpreme, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/tipoviOpreme/{id}")
	public ResponseEntity<TipOpreme> updateTipOpreme(@PathVariable Long id, @RequestBody TipOpreme tipOpreme) {
		TipOpreme updatedTipOpreme = tipOpremeService.updatedTipOpreme(id, tipOpreme);
				
		if (updatedTipOpreme == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(updatedTipOpreme, HttpStatus.OK);
		}
	}
	
	@DeleteMapping("/tipoviOpreme/{id}")
	public ResponseEntity<HttpStatus> deleteOpremu(@PathVariable Long id) {
		try {
			tipOpremeService.deleteTipOpreme(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

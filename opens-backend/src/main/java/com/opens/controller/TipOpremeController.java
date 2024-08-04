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

import com.opens.model.TipOpreme;
import com.opens.repository.TipOpremeRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TipOpremeController {

	@Autowired
	private TipOpremeRepository tipOpremeRepository;

	@GetMapping("/tipoviOpreme")
	public ResponseEntity<List<TipOpreme>> getAllTipoveOpreme() {
		List<TipOpreme> tipoviOpreme = new ArrayList<>();
		tipOpremeRepository.findAll().forEach(tipoviOpreme::add);

		if (tipoviOpreme.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(tipoviOpreme, HttpStatus.OK);
	}
	
	@GetMapping("/tipoviOpreme/{naziv}")
	public ResponseEntity<String> checkIfTipOpremeExists(@PathVariable String naziv) {
		Boolean tipOpremeExists = tipOpremeRepository.existsByNaziv(naziv);
		
		if (tipOpremeExists) {
			return new ResponseEntity<>("exists", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("do-not-exist", HttpStatus.OK);
		}
	}

	@PostMapping("/tipoviOpreme")
	public ResponseEntity<TipOpreme> createTipOpreme(@RequestBody TipOpreme tipOpreme) {
		try {
			TipOpreme _tipOpreme = tipOpremeRepository.save(new TipOpreme(tipOpreme.getNaziv()));
			return new ResponseEntity<>(_tipOpreme, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/tipoviOpreme/{id}")
	public ResponseEntity<TipOpreme> updateTipOpreme(@PathVariable Long id, @RequestBody TipOpreme tipOpreme) {
		Optional<TipOpreme> tipOpremeData = tipOpremeRepository.findById(id);
				
		if (tipOpremeData.isPresent()) {
			TipOpreme _tipOpreme = tipOpremeData.get();
			_tipOpreme.setNaziv(tipOpreme.getNaziv());
			return new ResponseEntity<>(tipOpremeRepository.save(_tipOpreme), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/tipoviOpreme/{id}")
	public ResponseEntity<HttpStatus> deleteOpremu(@PathVariable Long id) {
		try {
			tipOpremeRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

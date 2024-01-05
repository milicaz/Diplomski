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

import com.opens.model.TipOpreme;
import com.opens.repository.TipOpremeRepository;

@RestController
@RequestMapping("/api")
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

	@PostMapping("/tipoviOpreme")
	public ResponseEntity<TipOpreme> createTipOpreme(@RequestBody TipOpreme tipOpreme) {
		try {
			TipOpreme _tipOpreme = tipOpremeRepository.save(new TipOpreme(tipOpreme.getNaziv()));
			return new ResponseEntity<>(_tipOpreme, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

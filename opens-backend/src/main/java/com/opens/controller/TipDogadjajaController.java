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

import com.opens.model.TipDogadjaja;
import com.opens.repository.TipDogadjajaRepository;

@RestController
@RequestMapping("/api")
public class TipDogadjajaController {
	
	@Autowired
	private TipDogadjajaRepository tipDogadjajaRepo;
	
	@GetMapping("/tipoviDogadjaja")
	public ResponseEntity<List<TipDogadjaja>> getAll() {
		List<TipDogadjaja> tipovi = new ArrayList<>();
		tipovi = tipDogadjajaRepo.findAll();
		
		return new ResponseEntity<>(tipovi, HttpStatus.OK);
	}
	
	@PostMapping("/tipoviDogadjaja")
	public ResponseEntity<TipDogadjaja> save(@RequestBody TipDogadjaja tipDogadjaja ) {
		TipDogadjaja tip = tipDogadjajaRepo.save(tipDogadjaja);
		
		return new ResponseEntity<>(tip, HttpStatus.OK);
	}

}

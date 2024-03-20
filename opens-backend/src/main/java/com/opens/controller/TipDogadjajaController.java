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

import com.opens.model.TipDogadjaja;
import com.opens.repository.TipDogadjajaRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
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
	
	@PutMapping("/tipoviDogadjaja/{id}")
	public ResponseEntity<TipDogadjaja> updateTip(@PathVariable Long id, @RequestBody TipDogadjaja tip) {
		Optional<TipDogadjaja> upTip = tipDogadjajaRepo.findById(id);
		
		TipDogadjaja updateTip = upTip.get();
		updateTip.setNaziv(tip.getNaziv());
		tipDogadjajaRepo.save(updateTip);
		
		return new ResponseEntity<>(updateTip, HttpStatus.OK);
	}
	
	@DeleteMapping("/tipoviDogadjaja/{id}")
	public ResponseEntity<String> deleteTip(@PathVariable Long id) {
		tipDogadjajaRepo.deleteById(id);
		return new ResponseEntity<>("Tip dogadjaja je obrisan.", HttpStatus.OK);
	}

}

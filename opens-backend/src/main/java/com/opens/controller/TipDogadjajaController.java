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

import com.opens.model.TipDogadjaja;
import com.opens.service.TipDogadjajaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class TipDogadjajaController {

	@Autowired
	private TipDogadjajaService tipService;

	@GetMapping("/tipoviDogadjaja")
	public ResponseEntity<List<TipDogadjaja>> getAll() {
		List<TipDogadjaja> tipovi = new ArrayList<>();
		tipovi = tipService.findAllActive();
		
		if(tipovi.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(tipovi, HttpStatus.OK);
	}

	@GetMapping("/tipoviDogadjaja/{naziv}")
	public ResponseEntity<Long> getOneByNaziv(@PathVariable String naziv) {
		TipDogadjaja tip = tipService.findByNaziv(naziv);
		
		if(tip == null) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(tip.getId(), HttpStatus.OK);
	}

	@PostMapping("/tipoviDogadjaja")
	public ResponseEntity<TipDogadjaja> save(@RequestBody TipDogadjaja tipDogadjaja) {
		try {
			TipDogadjaja tip = tipService.addTip(tipDogadjaja);
			return new ResponseEntity<>(tip, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/tipoviDogadjaja/{id}")
	public ResponseEntity<TipDogadjaja> updateTip(@PathVariable Long id, @RequestBody TipDogadjaja tip) {
		TipDogadjaja updateTip = tipService.updateTip(id, tip);
		
		if(updateTip == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(updateTip, HttpStatus.OK);
		}
	}

	@DeleteMapping("/tipoviDogadjaja/{id}")
	public ResponseEntity<String> deleteTip(@PathVariable Long id) {
		try {
			tipService.deleteTip(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

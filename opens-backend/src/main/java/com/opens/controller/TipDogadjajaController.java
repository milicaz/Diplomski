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

		return new ResponseEntity<>(tipService.findAllActive(), HttpStatus.OK);
	}

	@GetMapping("/tipoviDogadjaja/{naziv}")
	public ResponseEntity<Long> getOneByNaziv(@PathVariable String naziv) {
		TipDogadjaja tip = tipService.findByNaziv(naziv);

		return new ResponseEntity<>(tip.getId(), HttpStatus.OK);
	}

	@PostMapping("/tipoviDogadjaja")
	public ResponseEntity<TipDogadjaja> save(@RequestBody TipDogadjaja tipDogadjaja) {
//		TipDogadjaja tip = tipService.addTip(tipDogadjaja);

		return new ResponseEntity<>(tipService.addTip(tipDogadjaja), HttpStatus.OK);
	}

	@PutMapping("/tipoviDogadjaja/{id}")
	public ResponseEntity<TipDogadjaja> updateTip(@PathVariable Long id, @RequestBody TipDogadjaja tip) {

		return new ResponseEntity<>(tipService.updateTip(id, tip), HttpStatus.OK);
	}

	@DeleteMapping("/tipoviDogadjaja/{id}")
	public ResponseEntity<String> deleteTip(@PathVariable Long id) {
		return new ResponseEntity<>(tipService.deleteTip(id), HttpStatus.OK);
	}

}

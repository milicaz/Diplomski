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

import com.opens.model.MestoDogadjaja;
import com.opens.repository.MestoDogadjajaRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class MestoDogadjajaController {
	
	@Autowired
	private MestoDogadjajaRepository mestoDogadjajaRepo;
	
	@GetMapping("/mestaDogadjaja")
	public ResponseEntity<List<MestoDogadjaja>> getAll() {
		List<MestoDogadjaja> mesta = new ArrayList<>();
		mesta = mestoDogadjajaRepo.findAll();
		
		return new ResponseEntity<>(mesta, HttpStatus.OK);
	}
	
	@PostMapping("/mestaDogadjaja")
	public ResponseEntity<MestoDogadjaja> save(@RequestBody MestoDogadjaja mestoDogadjaja) {
		MestoDogadjaja mesto = mestoDogadjajaRepo.save(mestoDogadjaja);
		
		return new ResponseEntity<>(mesto, HttpStatus.OK);
	}
	
	@PutMapping("/mestaDogadjaja/{id}")
	public ResponseEntity<MestoDogadjaja> updateMesto(@PathVariable Long id, @RequestBody MestoDogadjaja mesto) {
		Optional<MestoDogadjaja> updateMesto = mestoDogadjajaRepo.findById(id);
		
		MestoDogadjaja upMesto = updateMesto.get();
		upMesto.setNazivSale(mesto.getNazivSale());
		mestoDogadjajaRepo.save(upMesto);
		
		return new ResponseEntity<>(upMesto, HttpStatus.OK);
	}
	
	@DeleteMapping("/mestaDogadjaja/{id}")
	public ResponseEntity<String> deleteMesto(@PathVariable Long id) {
		mestoDogadjajaRepo.deleteById(id);
		return new ResponseEntity<>("Mesto dogajdjaja je obrisano", HttpStatus.OK);
	}

}

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

import com.opens.dto.DogadjajDTO;
import com.opens.model.Dogadjaj;
import com.opens.service.DogadjajService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DogadjajController {
	
	@Autowired
	private DogadjajService dogadjajService;

	@GetMapping("/dogadjaji")
	public ResponseEntity<List<Dogadjaj>> getAll() {
		List<Dogadjaj> dogadjaji = new ArrayList<>();
		dogadjaji = dogadjajService.findAllActive();
		
		if(dogadjaji.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(dogadjaji, HttpStatus.OK);
	}

	@PostMapping("/dogadjaji")
	public ResponseEntity<Dogadjaj> save(@RequestBody DogadjajDTO dogadjajDTO) {
		try {
			Dogadjaj dogadjaj = dogadjajService.addDogadjaj(dogadjajDTO);
			return new ResponseEntity<>(dogadjaj, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/dogadjaji/{id}")
	public ResponseEntity<String> updateDogadjaj(@PathVariable Long id, @RequestBody Dogadjaj dogadjaj) {
		String updateDogadjaj = dogadjajService.updateDogadjaj(id, dogadjaj);
		if(updateDogadjaj == "One or more related entities not found") {
			return new ResponseEntity<String>(HttpStatus.BAD_REQUEST);
		} else if (updateDogadjaj == "Dogadjaj not found") {
			return new ResponseEntity<String>(HttpStatus.NOT_FOUND);
		} else if (updateDogadjaj == "Dogadjaj is updated!") {
			return new ResponseEntity<String>(HttpStatus.CREATED);
		}
		
		return new ResponseEntity<String>(HttpStatus.OK);
	}
	
	
	@DeleteMapping("/dogadjaj/delete/{id}")
	public ResponseEntity<String> deleteDogadjaj(@PathVariable Long id) {
		try {
			dogadjajService.deleteDogadjaj(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

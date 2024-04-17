package com.opens.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.view.DogadjajiView;
import com.opens.view.repository.DogadjajiViewRepository;

@RestController
@RequestMapping("/api")
public class DogadjajViewController {
	
	@Autowired
	private DogadjajiViewRepository dogRepo;
	
	@GetMapping("/dogadjajiView")
	public ResponseEntity<List<DogadjajiView>> getAll() {
		List<DogadjajiView> dogadjaji = new ArrayList<>();
		
		dogadjaji = dogRepo.findAll();
		
		return new ResponseEntity<>(dogadjaji, HttpStatus.OK);
	}
	
	@GetMapping("/dogadjajiView/{mesec}/{vrsta}")
	public ResponseEntity<List<DogadjajiView>> getAllByMesecVrsta(@PathVariable Long mesec, @PathVariable String vrsta) {
		List<DogadjajiView> dogadjajiMesecVrsta = new ArrayList<>();
		
		dogadjajiMesecVrsta = dogRepo.findByMesecAndVrsta(mesec, vrsta);
		
		return new ResponseEntity<>(dogadjajiMesecVrsta, HttpStatus.OK);
		
	}

}

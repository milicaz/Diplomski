package com.opens.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.view.DogadjajiTrenutnoView;
import com.opens.view.repository.DogadjajiTrenutnoViewRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DogadjajiTrenutnoViewController {
	
	@Autowired
	private DogadjajiTrenutnoViewRepository dogTrenutnoRepo;
	
	@GetMapping("/dogadjajiTrenutno")
	public ResponseEntity<List<DogadjajiTrenutnoView>> getAll() {
		List<DogadjajiTrenutnoView> dogadjaji = new ArrayList<>();
		
		dogadjaji = dogTrenutnoRepo.findAll();
		
		return new ResponseEntity<>(dogadjaji, HttpStatus.OK);
	}

}

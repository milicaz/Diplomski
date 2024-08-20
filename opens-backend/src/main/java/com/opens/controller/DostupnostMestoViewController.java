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

import com.opens.view.DostupnostMestoView;
import com.opens.view.repository.DostupnostMestoViewRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DostupnostMestoViewController {
	
	@Autowired
	private DostupnostMestoViewRepository dosRepo;
	
	@GetMapping("/dostupnostMestoView")
	public ResponseEntity<List<DostupnostMestoView>> getAll() {
		List<DostupnostMestoView> dostupnost = new ArrayList<>();
		
		dostupnost = dosRepo.findAll();
		
		return new ResponseEntity<>(dostupnost, HttpStatus.OK);
	}

}

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

import com.opens.view.DostupnostView;
import com.opens.view.repository.DostupnostViewRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class DostupnostViewController {

	@Autowired
	private DostupnostViewRepository dosRepo;
	
	@GetMapping("/dostupnostView")
	public ResponseEntity<List<DostupnostView>> getAll() {
		List<DostupnostView> dostupnost = new ArrayList<>();
		
		dostupnost = dosRepo.findAll();
		
		return new ResponseEntity<>(dostupnost, HttpStatus.OK);
	}
}

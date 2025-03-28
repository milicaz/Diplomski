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

import com.opens.model.Uloga;
import com.opens.service.UlogaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UlogaController {

	@Autowired
	private UlogaService ulogaService;

	@GetMapping("/uloge")
	public ResponseEntity<List<Uloga>> getUloge() {
		List<Uloga> uloge = new ArrayList<>();
		uloge = ulogaService.findAll();
		
		if(uloge.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} 
		return new ResponseEntity<>(uloge, HttpStatus.OK);
	}
}

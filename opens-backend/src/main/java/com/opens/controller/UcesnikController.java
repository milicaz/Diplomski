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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Ucesnik;
import com.opens.service.UcesnikService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class UcesnikController {

	@Autowired
	private UcesnikService ucesnikService;

	@GetMapping("/sviUcesniciDogadjaja/{id}")
	public ResponseEntity<List<Ucesnik>> getAll(@PathVariable Long id) {
		return new ResponseEntity<>(ucesnikService.sviUcesniciDogadjaja(id), HttpStatus.OK);
	}

	@PostMapping("/ucesniciDogadjaja/{id}")
	public String createUcesnikForDogadjaj(@RequestBody Ucesnik ucesnik, @PathVariable(name = "id") Long id) {
		return ucesnikService.addUcesnik(ucesnik, id);
	}
	
	@DeleteMapping("/ucesnik/delete/{id}")
	public String deleteUcesnik(@PathVariable Long id) {
		return ucesnikService.deleteUcesnik(id);
	}

}

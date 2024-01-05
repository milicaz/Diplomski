package com.opens.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Posetilac;
import com.opens.repository.PosetilacRepository;

@RestController
@RequestMapping("/api")
public class PosetilacController {

	@Autowired
	private PosetilacRepository posetilacRepository;

	@GetMapping("/posetioci")
	public ResponseEntity<List<Posetilac>> getAllPosetioci() {
		List<Posetilac> posetioci = new ArrayList<Posetilac>();
		posetilacRepository.findAll().forEach(posetioci::add);
		if (posetioci.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posetioci, HttpStatus.OK);
	}
	
	@PostMapping("/posetioci")
	public ResponseEntity<Posetilac> createPosetilac(@RequestBody Posetilac posetilac){
		try {
			Posetilac _posetilac = posetilacRepository.save(
					new Posetilac(posetilac.getIme(), posetilac.getPrezime(), posetilac.getRod(), posetilac.getGodine(),
							posetilac.getMestoBoravista(), posetilac.getBrojTelefona(), posetilac.getEmail(), posetilac.getPrvaPoseta()));
			return new ResponseEntity<>(_posetilac, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

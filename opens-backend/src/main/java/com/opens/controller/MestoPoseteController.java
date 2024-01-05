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

import com.opens.model.MestoPosete;
import com.opens.repository.MestoPoseteRepository;

@RestController
@RequestMapping("/api")
public class MestoPoseteController {

	@Autowired
	private MestoPoseteRepository mestoPoseteRepository;

	@GetMapping("/mestaPosete")
	public ResponseEntity<List<MestoPosete>> getAllMestaPosete() {
		List<MestoPosete> mestaPosete = new ArrayList<MestoPosete>();
		
		mestoPoseteRepository.findAll().forEach(mestaPosete::add);
		
		if (mestaPosete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(mestaPosete, HttpStatus.OK);

	}
	
	@PostMapping("/mestaPosete")
	public ResponseEntity<MestoPosete> createMestoPosete(@RequestBody MestoPosete mestoPosete) {
		try {
			MestoPosete _mestoPosete = mestoPoseteRepository.save(
					new MestoPosete(mestoPosete.getNazivMesta(), mestoPosete.getUkupanBrojMesta()));
			return new ResponseEntity<>(_mestoPosete, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

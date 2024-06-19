package com.opens.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.util.ResourceUtils;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Posetilac;
import com.opens.repository.PosetilacRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
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
	
	@GetMapping("/posetioci/{id}")
	public ResponseEntity<Posetilac> getPosetilac(@PathVariable Long id) {
		Posetilac posetilac = posetilacRepository.findById(id).get();

		return new ResponseEntity<>(posetilac, HttpStatus.OK);
	}
	
	@PostMapping("/posetioci")
	public ResponseEntity<Posetilac> createPosetilac(@RequestBody Posetilac posetilac){
		try {
			Posetilac _posetilac = new Posetilac();
			_posetilac.setIme(posetilac.getIme());
			_posetilac.setPrezime(posetilac.getPrezime());
			_posetilac.setPassword(posetilac.getPassword());
			_posetilac.setEmail(posetilac.getEmail());
			_posetilac.setRod(posetilac.getRod());
			_posetilac.setGodine(posetilac.getGodine());
			_posetilac.setMestoBoravista(posetilac.getMestoBoravista());
			_posetilac.setBrojTelefona(posetilac.getBrojTelefona());
			Path imagePath = Paths.get(ResourceUtils.getURL("classpath:images/profile.png").toURI());
			_posetilac.setProfileImage(Files.readAllBytes(imagePath));

			posetilacRepository.save(_posetilac);
			return new ResponseEntity<>(_posetilac, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/posetioci/{id}")
	public ResponseEntity<Posetilac> updatePosetilac(@PathVariable Long id, @RequestBody Posetilac posetilac) {
		try {
			
			Posetilac _posetilac = posetilacRepository.findById(id).get();
			_posetilac.setIme(posetilac.getIme());
			_posetilac.setPrezime(posetilac.getPrezime());
			_posetilac.setEmail(posetilac.getEmail());
			_posetilac.setGodine(posetilac.getGodine());
			_posetilac.setMestoBoravista(posetilac.getMestoBoravista());
			_posetilac.setBrojTelefona(posetilac.getBrojTelefona());
			_posetilac.setProfileImage(posetilac.getProfileImage());
			
			posetilacRepository.save(_posetilac);
						
			return new ResponseEntity<>(_posetilac, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

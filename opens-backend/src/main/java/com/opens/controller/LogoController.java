package com.opens.controller;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.opens.model.Logo;
import com.opens.service.LogoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LogoController {
	
	
	@Autowired
	private LogoService logoService;
	
	@GetMapping("/logoi")
	public ResponseEntity<List<Logo>> getAll() {
		List<Logo> logoi = new ArrayList<>();
		logoi = logoService.findAll();
		
		if(logoi.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		
		return new ResponseEntity<>(logoi, HttpStatus.OK);
	}
	
	@PostMapping(path = "/logoi", consumes = "multipart/form-data")
	public ResponseEntity<Logo> saveLogo(@RequestParam("imageFile") MultipartFile file) throws IOException{
		try {
			return new ResponseEntity<>(logoService.addLogo(file), HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
		
	}
	
	
//	@PutMapping(path = "/logoi/{id}", consumes = "multipart/form-data")
//	public ResponseEntity<Logo> updateLogo(@PathVariable Long id, @RequestParam("imageFile") MultipartFile file) throws IOException {
//		Optional<Logo> upLogo = logoRepo.findById(id);
//		
//		Logo updateLogo = upLogo.get();
//		updateLogo.setName(file.getOriginalFilename());
//		updateLogo.setPicByte(file.getBytes());
//		updateLogo.setType(file.getContentType());
//		
//		logoRepo.save(updateLogo);
//		
//		return new ResponseEntity<>(updateLogo, HttpStatus.OK);
//	}
	
	@DeleteMapping("/logoi/{id}")
	public ResponseEntity<String> deleteLogo(@PathVariable Long id) {
		try {
			logoService.deleteLogo(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

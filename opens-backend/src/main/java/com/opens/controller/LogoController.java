package com.opens.controller;

import java.awt.PageAttributes.MediaType;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.opens.model.Logo;
import com.opens.repository.LogoRepository;

import ch.qos.logback.core.model.Model;
import jakarta.persistence.criteria.Path;

@RestController
@RequestMapping("/api")
public class LogoController {
	
	@Autowired
	private LogoRepository logoRepo;
	
	@GetMapping("/logoi")
	public ResponseEntity<List<Logo>> getAll() {
		List<Logo> logoi = new ArrayList<>();
		logoi = logoRepo.findAll();
		
		return new ResponseEntity<>(logoi, HttpStatus.OK);
	}
	
	@PostMapping(path = "/logoi", consumes={"application/json"})
	public ResponseEntity<Logo> saveLogo(@RequestParam("image") MultipartFile file) throws IOException{
		
		Logo addLogo = new Logo();
		addLogo.setNaziv(file.getOriginalFilename());
		addLogo.setTip(file.getContentType());
		addLogo.setPicByte(file.getBytes());
		
		System.out.println("Naziv je: " + addLogo.getNaziv());
		
		logoRepo.save(addLogo);
		
		return new ResponseEntity<>(addLogo, HttpStatus.OK);
	}
	
	@PutMapping("/logoi/{id}")
	public ResponseEntity<Logo> updateLogo(@PathVariable Long id, @RequestBody Logo logo) {
		Optional<Logo> upLogo = logoRepo.findById(id);
		
		Logo updateLogo = upLogo.get();
		updateLogo.setNaziv(logo.getNaziv());
		updateLogo.setPicByte(logo.getPicByte());
		updateLogo.setTip(logo.getTip());
		
		logoRepo.save(updateLogo);
		
		return new ResponseEntity<>(updateLogo, HttpStatus.OK);
	}
	
	@DeleteMapping("/logoi/{id}")
	public ResponseEntity<String> deleteLogo(@PathVariable Long id) {
		logoRepo.deleteById(id);
		
		return new ResponseEntity<>("Logo je obrisan.", HttpStatus.OK);
	}

}

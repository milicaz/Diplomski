package com.opens.controller;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.opens.model.Logo;
import com.opens.repository.LogoRepository;
import com.opens.service.LogoService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class LogoController {
	
	@Autowired
	private LogoRepository logoRepo;
	
	@Autowired
	private LogoService logoService;
	
	@GetMapping("/logoi")
	public ResponseEntity<List<Logo>> getAll() {
//		List<Logo> logoi = new ArrayList<>();
//		logoi = logoRepo.findAll();
		
		return new ResponseEntity<>(logoService.findAll(), HttpStatus.OK);
	}
	
//	@GetMapping("/logoi/picByte")
//	public List<String> getAllPic() {
//		List<Logo> logoi = new ArrayList<>();
//		logoi = logoRepo.findAll();
//		List<String> encoded = new ArrayList<>();
//		
//		
//		for(Logo logo: logoi) {
//			System.out.println("Pic byte je: " + logo.getPicByte());
//			encoded.add(Base64.getEncoder().encodeToString(logo.getPicByte()));
//			System.out.println("Encoded: " + encoded);
//		}
//		
//		return encoded;
//	}
	
//	@GetMapping("/logoi/pic")
//	public List<byte[]> getAllP() {
//		List<Logo> logoi = new ArrayList<>();
//		logoi = logoRepo.findAll();
//		List<byte[]> picByte  = new ArrayList<>();
//		
//		
//		for(Logo logo: logoi) {
//			picByte.add(logo.getPicByte());
//		}
//		
//		return picByte;
//	}
	
	@PostMapping(path = "/logoi", consumes = "multipart/form-data")
	public ResponseEntity<Logo> saveLogo(@RequestParam("imageFile") MultipartFile file) throws IOException{
		
//		Logo logo = new Logo();
//		logo.setName(file.getOriginalFilename());
//		logo.setType(file.getContentType());
//		logo.setPicByte(file.getBytes());
//		
//		logoRepo.save(logo);
		
		return new ResponseEntity<>(logoService.addLogo(file), HttpStatus.OK);
	}
	
//	@PostMapping(path = "/logos", consumes = "multipart/form-data")
//	public ResponseEntity<List<Logo>> saveLogos(@RequestParam("imageFile") MultipartFile file) throws IOException{
//		
//		List<Logo> logos = new ArrayList<>();
//		
//		if(file.isEmpty()) {
//			System.out.println("File is empty!");
//		}else {
//			Logo logo = new Logo();
//			logo.setName(file.getOriginalFilename());
//			logo.setType(file.getContentType());
//			logo.setPicByte(file.getBytes());
//			logos.add(logo);
//			System.out.println("Logos: " + logos.toString());
//		}
//		
//		logoRepo.saveAll(logos);
//		
//		return new ResponseEntity<>(logos, HttpStatus.OK);
//	}
	
	@PutMapping(path = "/logoi/{id}", consumes = "multipart/form-data")
	public ResponseEntity<Logo> updateLogo(@PathVariable Long id, @RequestParam("imageFile") MultipartFile file) throws IOException {
		Optional<Logo> upLogo = logoRepo.findById(id);
		
		Logo updateLogo = upLogo.get();
		updateLogo.setName(file.getOriginalFilename());
		updateLogo.setPicByte(file.getBytes());
		updateLogo.setType(file.getContentType());
		
		logoRepo.save(updateLogo);
		
		return new ResponseEntity<>(updateLogo, HttpStatus.OK);
	}
	
	@DeleteMapping("/logoi/{id}")
	public ResponseEntity<String> deleteLogo(@PathVariable Long id) {
		logoService.deleteLogo(id);
		
		return new ResponseEntity<>("Logo je obrisan.", HttpStatus.OK);
	}

}

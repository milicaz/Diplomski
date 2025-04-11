package com.opens.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.PosetilacEditDTO;
import com.opens.model.Posetilac;
import com.opens.model.ProfilnaSlika;
import com.opens.repository.PosetilacRepository;
import com.opens.repository.ProfilnaSlikaRepository;
import com.opens.service.PosetilacService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PosetilacController {

	@Autowired
	private PosetilacRepository posetilacRepository;
	
	@Autowired
	private ProfilnaSlikaRepository profilnaSlikaRepository;
	
	@Autowired
	private PosetilacService posetilacService;

	@GetMapping("/posetioci")
	public ResponseEntity<List<Posetilac>> getAllPosetioci() {
		List<Posetilac> posetioci = new ArrayList<Posetilac>();
		posetilacRepository.findAll().forEach(posetioci::add);
		if (posetioci.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posetioci, HttpStatus.OK);
	}
	
	@GetMapping("/posetioci/bezPosete")
	public ResponseEntity<List<Posetilac>> getPosetiociBezPosete() {
		List<Posetilac> posetioci = new ArrayList<Posetilac>();
		posetilacRepository.findPosetiociBezPosete().forEach(posetioci::add);
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
	
	@GetMapping("/posetioci/{id}/profilna")
	public ResponseEntity<byte[]> getProfilna(@PathVariable Long id) {
		
		ProfilnaSlika profilna = posetilacService.getProfilnaSlikaByPosetilacId(id)
;
	    if (profilna == null || profilna.getProfilnaSlika() == null) {
	        return ResponseEntity.notFound().build();
	    }
	    
	    String tipSlike = profilna.getTipSlike();
	    String contentType = validateAndCorrectMimeType(tipSlike);

	    HttpHeaders headers = new HttpHeaders();
	    headers.setContentType(MediaType.parseMediaType(contentType));
	    return new ResponseEntity<>(profilna.getProfilnaSlika(), headers, HttpStatus.OK);
	}
		
	@PutMapping("/posetioci/{id}")
	public ResponseEntity<Posetilac> updatePosetilac(@PathVariable Long id, @RequestBody PosetilacEditDTO posetilac) {
		try {
			
			Posetilac _posetilac = posetilacRepository.findById(id).get();
			_posetilac.setIme(posetilac.getIme());
			_posetilac.setPrezime(posetilac.getPrezime());
			_posetilac.setEmail(posetilac.getEmail());
			_posetilac.setGodine(posetilac.getGodine());
			_posetilac.setMestoBoravista(posetilac.getMestoBoravista());
			_posetilac.setBrojTelefona(posetilac.getBrojTelefona());
			
			posetilacRepository.save(_posetilac);
			
			ProfilnaSlika profilna = posetilacService.getProfilnaSlikaByPosetilacId(id)
;
			profilna.setProfilnaSlika(posetilac.getProfileImage());
			
			profilnaSlikaRepository.save(profilna);
						
			return new ResponseEntity<>(_posetilac, HttpStatus.CREATED);
		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	private String validateAndCorrectMimeType(String mimeType) {
	    if (mimeType == null || mimeType.isEmpty()) {
	        return "application/octet-stream"; // Fallback MIME type
	    }
	    
	    switch (mimeType.toLowerCase()) {
	        case "jpeg":
	        case "jpg":
	            return "image/jpeg";
	        case "png":
	            return "image/png";
	        case "gif":
	            return "image/gif";
	        case "bmp":
	            return "image/bmp";
	        default:
	            return "application/octet-stream"; // Default fallback
	    }
	}

}
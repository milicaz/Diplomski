package com.opens.controller;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Uloga;
import com.opens.model.Zaposleni;
import com.opens.repository.UlogaRepository;
import com.opens.repository.ZaposleniRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ZaposleniController {
	
	@Autowired
	private ZaposleniRepository zaposleniRepo;
	
	@Autowired
	private UlogaRepository ulogaRepo;
	
	@GetMapping("/zaposleni")
	public ResponseEntity<List<Zaposleni>> getAll() {
		List<Zaposleni> zaposleni = new ArrayList<>();
		zaposleni = zaposleniRepo.findAllActive();
		
		return new ResponseEntity<>(zaposleni, HttpStatus.OK);
	}
	
	@PostMapping("/zaposleni")
	public ResponseEntity<Zaposleni> save(@RequestBody Zaposleni zaposleni) {
		Zaposleni z = zaposleniRepo.save(zaposleni);
		
		return new ResponseEntity<>(z, HttpStatus.OK);
	}
	
	@PutMapping("/zaposleni/{id}")
	public ResponseEntity<Zaposleni> updateZaposleni(@PathVariable Long id, @RequestBody Zaposleni zaposleni) {
		Optional<Zaposleni> updateZaposleni = zaposleniRepo.findById(id);
		
		Zaposleni upZaposleni = updateZaposleni.get();
		upZaposleni.setEmail(zaposleni.getEmail());
		upZaposleni.setIme(zaposleni.getIme());
		upZaposleni.setPrezime(zaposleni.getPrezime());
		upZaposleni.setRod(zaposleni.getRod());
		upZaposleni.setGodine(zaposleni.getGodine());
		upZaposleni.setBrojTelefona(zaposleni.getBrojTelefona());
//		upZaposleni.setUloge(zaposleni.getUloge());
		if (zaposleni.getUloge() != null) {
	        // Assuming you have a method to fetch Uloga by name
	        Set<Uloga> roles = new HashSet<>();
	        for (Uloga uloga : zaposleni.getUloge()) {
	            Uloga existingRole = ulogaRepo.findByNaziv(uloga.getNaziv()).get();
	            if (existingRole != null) {
	                roles.add(existingRole);
	            } else {
	                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
	            }
	        }
	        upZaposleni.setUloge(roles);
	    }
		
		zaposleniRepo.save(upZaposleni);
		
		return new ResponseEntity<>(upZaposleni, HttpStatus.OK);
	}
	
	@DeleteMapping("/zaposleni/{id}")
	public ResponseEntity<String> deleteZaposleni(@PathVariable Long id) {
		zaposleniRepo.deleteById(id);
		return new ResponseEntity<>("Zaposleni je obrisan!", HttpStatus.OK);
	}
	
	//Logicko brisanje
	@DeleteMapping("/zaposleni/delete/{id}")
	public ResponseEntity<String> logicalDelete(@PathVariable Long id) {
        Optional<Zaposleni> optionalZaposleni = zaposleniRepo.findById(id);

        if (!optionalZaposleni.isPresent()) {
            return new ResponseEntity<>("Zaposleni not found", HttpStatus.NOT_FOUND);
        }

        Zaposleni zaposleni = optionalZaposleni.get();
        zaposleni.setDeleted(true);
        zaposleniRepo.save(zaposleni);

        return new ResponseEntity<>("Zaposleni marked as deleted", HttpStatus.OK);
    }

}

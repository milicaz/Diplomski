package com.opens.controller;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.Obavestenja;
import com.opens.repository.ObavestenjaRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class ObavestenjaController {
	
	@Autowired
	private ObavestenjaRepository obavestenjaRepository;
	
	@GetMapping("/obavestenja")
	public ResponseEntity<List<Obavestenja>> getAllObavestenja() {
		List<Obavestenja> obavestenja = new ArrayList<>();
		obavestenjaRepository.findAll().forEach(obavestenja::add);

		if (obavestenja.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(obavestenja, HttpStatus.OK);
	}
	
	@GetMapping("/obavestenja/validna")
	@Transactional
    public ResponseEntity<List<Obavestenja>> getValidObavestenja(
            @RequestParam("currentDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate currentDate) {
        List<Obavestenja> validObavestenja = obavestenjaRepository
                .findByPocetakPrikazivanjaLessThanEqualAndKrajPrikazivanjaGreaterThanEqual(currentDate, currentDate);
        return new ResponseEntity<>(validObavestenja, HttpStatus.OK);
    }

	@PostMapping("/obavestenja")
	public ResponseEntity<Obavestenja> createObavestenje(@RequestBody Obavestenja obavestenje) {
		try {
			Obavestenja _obavestenje = obavestenjaRepository.save(new Obavestenja(obavestenje.getNaziv(),
					obavestenje.getTekst(), obavestenje.getPocetakPrikazivanja(), obavestenje.getKrajPrikazivanja(), obavestenje.getPrioritet()));
			return new ResponseEntity<>(_obavestenje, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@PutMapping("/obavestenja/{id}")
	public ResponseEntity<Obavestenja> updateObavestenje(@PathVariable Long id, @RequestBody Obavestenja obavestenje) {
		Optional<Obavestenja> obavestenjeData = obavestenjaRepository.findById(id);
				
		if (obavestenjeData.isPresent()) {
			Obavestenja _obavestenje = obavestenjeData.get();
			_obavestenje.setNaziv(obavestenje.getNaziv());
			_obavestenje.setTekst(obavestenje.getTekst());
			_obavestenje.setPocetakPrikazivanja(obavestenje.getPocetakPrikazivanja());
			_obavestenje.setKrajPrikazivanja(obavestenje.getKrajPrikazivanja());
			_obavestenje.setPrioritet(obavestenje.getPrioritet());
			return new ResponseEntity<>(obavestenjaRepository.save(_obavestenje), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@DeleteMapping("/obavestenja/{id}")
	public ResponseEntity<HttpStatus> deleteObavestenje(@PathVariable Long id) {
		try {
			obavestenjaRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

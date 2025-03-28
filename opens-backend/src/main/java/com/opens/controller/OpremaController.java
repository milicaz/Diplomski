package com.opens.controller;

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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.OpremaDTO;
import com.opens.model.Oprema;
import com.opens.service.OpremaService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class OpremaController {

	@Autowired
	private OpremaService opremaService;

	@GetMapping("/oprema")
	public ResponseEntity<List<Oprema>> getAllOprema() {
		List<Oprema> opreme = new ArrayList<>();

		opremaService.findAll().forEach(opreme::add);

		if (opreme.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(opreme, HttpStatus.OK);

	}

	@GetMapping("/oprema/slobodna")
	public ResponseEntity<List<Oprema>> getSlobodnuOpremu() {
		List<Oprema> opreme = new ArrayList<>();

		opremaService.findByIsZauzeta().forEach(opreme::add);

		if (opreme.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(opreme, HttpStatus.OK);
	}

	@GetMapping("/oprema/{serijskiBroj}/check")
	public ResponseEntity<String> checkIfSerijskiBrojExists(@PathVariable String serijskiBroj) {
		Boolean serijskiBrojExists = opremaService.existsBySerijskiBroj(serijskiBroj);

		if (serijskiBrojExists) {
			return new ResponseEntity<>("exists", HttpStatus.OK);
		} else {
			return new ResponseEntity<>("do-not-exist", HttpStatus.OK);
		}
	}

	@PostMapping("/oprema")
	public ResponseEntity<Oprema> createOpremu(@RequestBody OpremaDTO opremaDTO) {
		try {
			return new ResponseEntity<>(opremaService.addOprema(opremaDTO), HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/oprema/{id}")
	public ResponseEntity<Oprema> updateOpremu(@PathVariable Long id, @RequestBody OpremaDTO opremaDTO) {
		Oprema updatedOprema = opremaService.updatedOprema(id, opremaDTO);

		if (updatedOprema == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(updatedOprema, HttpStatus.OK);
		}
	}

	@DeleteMapping("/oprema/{id}")
	public ResponseEntity<HttpStatus> deleteOpremu(@PathVariable Long id) {
		try {
			opremaService.deleteOprema(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}
	
	@GetMapping("/oprema/dzojstik/zauzet")
	public ResponseEntity<Boolean> isDzojstikZauzet() {
		try {
			boolean zauzet = opremaService.isAnyDzojstikZauzet();
		    return new ResponseEntity<>(zauzet, HttpStatus.OK);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

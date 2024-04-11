package com.opens.controller;

import java.util.ArrayList;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.OpremaDTO;
import com.opens.model.Oprema;
import com.opens.model.TipOpreme;
import com.opens.repository.OpremaRepository;
import com.opens.repository.TipOpremeRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class OpremaController {

	@Autowired
	private OpremaRepository opremaRepository;

	@Autowired
	private TipOpremeRepository tipOpremeRepository;

	@GetMapping("/oprema")
	public ResponseEntity<List<Oprema>> getAllOprema() {
		List<Oprema> opreme = new ArrayList<>();

		opremaRepository.findAll().forEach(opreme::add);

		if (opreme.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(opreme, HttpStatus.OK);

	}

	@GetMapping("/oprema/{isZauzeta}")
	public ResponseEntity<List<Oprema>> getSlobodnuOpremu(@PathVariable Boolean isZauzeta) {
		List<Oprema> opreme = new ArrayList<>();

		opremaRepository.findByIsZauzeta(isZauzeta).forEach(opreme::add);

		if (opreme.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(opreme, HttpStatus.OK);
	}

	@PostMapping("/oprema")
	public ResponseEntity<Oprema> createOpremu(@RequestBody OpremaDTO opremaDTO) {
		try {
			Optional<TipOpreme> tipOpreme = tipOpremeRepository.findById(opremaDTO.getTipOpremeID());

			Oprema _oprema = new Oprema();
			_oprema.setTipOpreme(tipOpreme.get());
			_oprema.setSerijskiBroj(opremaDTO.getSerijskiBroj());
			opremaRepository.save(_oprema);
			return new ResponseEntity<>(_oprema, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/oprema/{id}")
	public ResponseEntity<Oprema> updateOpremu(@PathVariable Long id, @RequestBody OpremaDTO opremaDTO) {
		// Optional<TipOpreme> tipOpreme =
		// tipOpremeRepository.findById(opremaDTO.getTipOpremeID());
		Optional<Oprema> opremaData = opremaRepository.findById(id);

		if (opremaData.isPresent()) {
			Oprema _oprema = opremaData.get();
			_oprema.setSerijskiBroj(opremaDTO.getSerijskiBroj());
			// _oprema.setTipOpreme(tipOpreme.get());
			return new ResponseEntity<>(opremaRepository.save(_oprema), HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@DeleteMapping("/oprema/{id}")
	public ResponseEntity<HttpStatus> deleteOpremu(@PathVariable Long id) {
		try {
			opremaRepository.deleteById(id);
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		} catch (Exception e) {
			return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

package com.opens.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.PosetaDTO;
import com.opens.model.MestoPosete;
import com.opens.model.Poseta;
import com.opens.model.Posetilac;
import com.opens.repository.MestoPoseteRepository;
import com.opens.repository.PosetaRepository;
import com.opens.repository.PosetilacRepository;
import com.opens.view.PoseteCoworkingView;
import com.opens.view.PoseteOmladinskiView;
import com.opens.view.repository.PoseteCoworkingViewRepository;
import com.opens.view.repository.PoseteOmladinskiViewRepository;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PosetaController {

	@Autowired
	private PosetaRepository posetaRepository;

	@Autowired
	private MestoPoseteRepository mestoPoseteRepository;

	@Autowired
	private PosetilacRepository posetilacRepository;
	
	@Autowired
	private PoseteCoworkingViewRepository poseteCoworkingViewRepository;
	
	@Autowired
	private PoseteOmladinskiViewRepository poseteOmladinskiViewRepository;

	@GetMapping("/posete")
	public ResponseEntity<List<Poseta>> getAllPosete() {
		List<Poseta> posete = new ArrayList<>();

		posetaRepository.findAll().forEach(posete::add);

		if (posete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posete, HttpStatus.OK);

	}
	
	@GetMapping("/posete/coworking")
	public ResponseEntity<List<PoseteCoworkingView>> getCoworkingPosete(){
		List<PoseteCoworkingView> posete = new ArrayList<>();

		poseteCoworkingViewRepository.findAll().forEach(posete::add);

		if (posete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posete, HttpStatus.OK);
	}
	
	@GetMapping("/posete/omladinski")
	public ResponseEntity<List<PoseteOmladinskiView>> getOmladinskiPosete(){
		List<PoseteOmladinskiView> posete = new ArrayList<>();

		poseteOmladinskiViewRepository.findAll().forEach(posete::add);

		if (posete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posete, HttpStatus.OK);
	}

	@PostMapping("/posete")
	public ResponseEntity<Poseta> createPosetu(@RequestBody PosetaDTO posetaDTO) {
		try {
			Optional<MestoPosete> mestoPosete = mestoPoseteRepository.findById(posetaDTO.getMestoPoseteID());
			Optional<Posetilac> posetilac = posetilacRepository.findById(posetaDTO.getPosetilacID());

			Poseta _poseta = new Poseta();
			_poseta.setDatumPosete(posetaDTO.getDatumPosete());
			_poseta.setVremePosete(posetaDTO.getVremePosete());
			_poseta.setMestoPosete(mestoPosete.get());
			_poseta.setPosetilac(posetilac.get());
			posetaRepository.save(_poseta);

			return new ResponseEntity<>(_poseta, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

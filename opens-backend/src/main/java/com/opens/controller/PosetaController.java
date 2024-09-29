package com.opens.controller;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.PosetaDTO;
import com.opens.dto.PosetaPrvaDTO;
import com.opens.model.MestoPosete;
import com.opens.model.Poseta;
import com.opens.model.Posetilac;
import com.opens.repository.MestoPoseteRepository;
import com.opens.repository.PosetaRepository;
import com.opens.repository.PosetilacRepository;
import com.opens.service.PosetaService;
import com.opens.view.DirektniView;
import com.opens.view.PoseteView;
import com.opens.view.repository.DirektniViewRepository;

import jakarta.transaction.Transactional;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PosetaController {

	@Autowired
	private PosetaService posetaService;

	@Autowired
	private PosetaRepository posetaRepository;

	@Autowired
	private MestoPoseteRepository mestoPoseteRepository;

	@Autowired
	private PosetilacRepository posetilacRepository;

	@Autowired
	private DirektniViewRepository direktniViewRepository;

	@GetMapping("/posete")
	public ResponseEntity<List<Poseta>> getAllPosete() {
		List<Poseta> posete = new ArrayList<>();

		posetaService.findAll().forEach(posete::add);

		if (posete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posete, HttpStatus.OK);
	}

	@GetMapping("/posete/neodjavljene")
	public ResponseEntity<List<Poseta>> getNeodjavljenePosete() {
		List<Poseta> posete = new ArrayList<>();

		posetaService.getNeodjavljenePosete().forEach(posete::add);

		return new ResponseEntity<>(posete, HttpStatus.OK);
	}

	@GetMapping("/posete/{mestoPoseteId}")
	public ResponseEntity<List<PoseteView>> getPosete(@PathVariable Long mestoPoseteId) {
		List<PoseteView> posete = new ArrayList<>();

		posetaService.getPosetePoMestuPosete(mestoPoseteId).forEach(posete::add);

		if (posete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posete, HttpStatus.OK);
	}

	@Transactional
	@GetMapping("/posete/{mestoPoseteId}/datumPosete")
	public ResponseEntity<List<Poseta>> getAllPosete(@PathVariable Long mestoPoseteId) {

		List<Poseta> posete = new ArrayList<>();

		posetaService.getTrenutnePosetePoMestuPosete(mestoPoseteId).forEach(posete::add);

		if (posete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}

		return new ResponseEntity<>(posete, HttpStatus.OK);

	}

	@GetMapping("/posete/{mestoPoseteId}/prvePosete")
	public ResponseEntity<List<DirektniView>> getPrvePosete(@PathVariable Long mestoPoseteId) {
		List<DirektniView> posete = new ArrayList<>();

		direktniViewRepository.findByMestoPoseteId(mestoPoseteId).forEach(posete::add);

		if (posete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posete, HttpStatus.OK);
	}

	@PostMapping("/posete")
	public ResponseEntity<Poseta> createPosetu(@RequestBody PosetaDTO posetaDTO) {
		try {
			Poseta _poseta = posetaService.addPoseta(posetaDTO);

			return new ResponseEntity<>(_poseta, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PostMapping("/posete/prva")
	public ResponseEntity<Poseta> createPrvuPosetu(@RequestBody PosetaPrvaDTO posetaDTO) {
		try {
			Optional<MestoPosete> mestoPosete = mestoPoseteRepository.findById(posetaDTO.getMestoPoseteID());
			Optional<Posetilac> posetilac = posetilacRepository.findByEmail(posetaDTO.getPosetilacEmail());

			Poseta _poseta = new Poseta();
			_poseta.setDatumPosete(posetaDTO.getDatumPosete());
			_poseta.setVremePosete(posetaDTO.getVremePosete());
			_poseta.setVremeOdjave(posetaDTO.getVremeOdjave());
			_poseta.setMestoPosete(mestoPosete.get());
			_poseta.setPosetilac(posetilac.get());

			posetaRepository.save(_poseta);

			return new ResponseEntity<>(_poseta, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	@PutMapping("/posete/{id}/oprema")
	public ResponseEntity<Poseta> odjaviOpremu(@PathVariable Long id) {
		Poseta posetaData = posetaService.odjaviOpremuTrenutno(id);

		if (posetaData == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(posetaData, HttpStatus.OK);
		}
	}

	@PutMapping("/posete/{id}/odjava")
	public ResponseEntity<Poseta> checkOut(@PathVariable Long id) {
		Poseta posetaData = posetaService.checkOutTrenutno(id);

		if (posetaData == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(posetaData, HttpStatus.OK);
		}
	}

	@PutMapping("/posete/{id}/nevracene")
	public ResponseEntity<Poseta> checkOutNevracene(@PathVariable Long id) {
		Poseta posetaData = posetaService.checkOutNevracene(id);

		if (posetaData == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		} else {
			return new ResponseEntity<>(posetaData, HttpStatus.OK);
		}
	}

	@GetMapping("/posete/{email}/status")
	public ResponseEntity<String> checkStatus(@PathVariable String email) {
		Poseta poseta = posetaService.checkStatus(email);

		if (poseta == null) {
			return new ResponseEntity<String>("not-checked-in", HttpStatus.OK);
		}

		boolean checkedOut = poseta.getVremeOdjave() != null;

		if (checkedOut) {
			return new ResponseEntity<>("checked-out", HttpStatus.OK);
		} else {
			boolean hasOprema = poseta.getOprema() != null && !poseta.getOprema().isEmpty();
			if (hasOprema) {
				return new ResponseEntity<>("checked-in-with-oprema", HttpStatus.OK);
			} else {
				return new ResponseEntity<>("checked-in", HttpStatus.OK);
			}
		}
	}

	@GetMapping("/posete/{email}/oprema")
	public ResponseEntity<Poseta> findPoseta(@PathVariable String email) {
		Poseta poseta = posetaService.findPoseta(email);

		return new ResponseEntity<>(poseta, HttpStatus.OK);
	}

	@PutMapping("/posete/{email}")
	public ResponseEntity<Poseta> checkOutEmail(@PathVariable String email) {
		Poseta poseta = posetaService.checkOutQRcode(email);

		return new ResponseEntity<>(poseta, HttpStatus.OK);
	}

	@PutMapping("/posete/{email}/checkOprema")
	public ResponseEntity<Poseta> checkOutEmailOprema(@PathVariable String email) {
		Poseta poseta = posetaService.checkOutOpremaQRcode(email);

		return new ResponseEntity<>(poseta, HttpStatus.OK);

	}

}

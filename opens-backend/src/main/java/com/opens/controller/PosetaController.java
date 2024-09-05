package com.opens.controller;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
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
import com.opens.model.Oprema;
import com.opens.model.Poseta;
import com.opens.model.Posetilac;
import com.opens.repository.MestoPoseteRepository;
import com.opens.repository.OpremaRepository;
import com.opens.repository.PosetaRepository;
import com.opens.repository.PosetilacRepository;
import com.opens.view.DirektniView;
import com.opens.view.PoseteView;
import com.opens.view.repository.DirektniViewRepository;
import com.opens.view.repository.PoseteViewRepository;

import jakarta.transaction.Transactional;

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
	private OpremaRepository opremaRepository;

	@Autowired
	private PoseteViewRepository poseteViewRepository;

	@Autowired
	private DirektniViewRepository direktniViewRepository;

	@GetMapping("/posete")
	public ResponseEntity<List<Poseta>> getAllPosete() {
		List<Poseta> posete = new ArrayList<>();

		posetaRepository.findAll().forEach(posete::add);

		if (posete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posete, HttpStatus.OK);

	}
	
	@GetMapping("/posete/neodjavljene")
	public ResponseEntity<List<Poseta>> getNeodjavljenePosete() {
		LocalDate danas = LocalDate.now();
		
		List<Poseta> posete = new ArrayList<>();

		posetaRepository.findByVremeOdjaveIsNullAndDatumPoseteBefore(danas).forEach(posete::add);

		return new ResponseEntity<>(posete, HttpStatus.OK);
	}

	@GetMapping("/posete/{mestoPoseteId}")
	public ResponseEntity<List<PoseteView>> getPosete(@PathVariable Long mestoPoseteId) {
		List<PoseteView> posete = new ArrayList<>();

		poseteViewRepository.findByMestoPoseteId(mestoPoseteId).forEach(posete::add);

		if (posete.isEmpty()) {
			return new ResponseEntity<>(HttpStatus.NO_CONTENT);
		}
		return new ResponseEntity<>(posete, HttpStatus.OK);
	}

	@Transactional
	@GetMapping("/posete/{mestoPoseteId}/datumPosete")
	public ResponseEntity<List<Poseta>> getAllPosete(@PathVariable Long mestoPoseteId) {

		LocalDate datum = LocalDate.now();

		List<Poseta> posete = new ArrayList<>();

		posetaRepository.findByMestoPoseteIdAndDatumPosete(mestoPoseteId, datum).forEach(posete::add);

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
			Optional<MestoPosete> mestoPosete = mestoPoseteRepository.findById(posetaDTO.getMestoPoseteID());
			Optional<Posetilac> posetilac = posetilacRepository.findByEmail(posetaDTO.getPosetilacEmail());

			List<Oprema> oprema = new ArrayList<>();

			Poseta _poseta = new Poseta();
			_poseta.setDatumPosete(LocalDate.now());
			_poseta.setVremePosete(LocalTime.now().truncatedTo(ChronoUnit.SECONDS));
			_poseta.setMestoPosete(mestoPosete.get());
			_poseta.setPosetilac(posetilac.get());

			if (posetaDTO.getOprema() != null) {
				for (int i = 0; i < posetaDTO.getOprema().size(); i++) {
					Optional<Oprema> _oprema = opremaRepository.findById(posetaDTO.getOprema().get(i).getId());
					_oprema.get().setIsZauzeta(true);
					oprema.add(_oprema.get());
				}
			}

			_poseta.setOprema(oprema);

			posetaRepository.save(_poseta);

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
		Optional<Poseta> posetaData = posetaRepository.findById(id);

		if (posetaData.isPresent()) {
			Poseta poseta = posetaData.get();

			for (Oprema oprema : poseta.getOprema()) {
				oprema.setIsZauzeta(false);
				opremaRepository.save(oprema);
			}

			poseta.setOprema(null);
			posetaRepository.save(poseta);
			return new ResponseEntity<>(poseta, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@PutMapping("/posete/{id}/odjava")
	public ResponseEntity<Poseta> checkOut(@PathVariable Long id) {
		Optional<Poseta> posetaData = posetaRepository.findById(id);

		if (posetaData.isPresent()) {
			Poseta poseta = posetaData.get();

			LocalTime vremeOdjave = LocalTime.now().truncatedTo(ChronoUnit.SECONDS);
			poseta.setVremeOdjave(vremeOdjave);

			posetaRepository.save(poseta);
			return new ResponseEntity<>(poseta, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	@PutMapping("/posete/{id}/nevracene")
	public ResponseEntity<Poseta> checkOutNevracene(@PathVariable Long id) {
		Optional<Poseta> posetaData = posetaRepository.findById(id);

		if (posetaData.isPresent()) {
			Poseta poseta = posetaData.get();

			LocalTime vremeOdjave = LocalTime.of(22, 0).truncatedTo(ChronoUnit.SECONDS);
			poseta.setVremeOdjave(vremeOdjave);
			
			for (Oprema oprema : poseta.getOprema()) {
				oprema.setIsZauzeta(false);
				opremaRepository.save(oprema);
			}

			poseta.setOprema(null);

			posetaRepository.save(poseta);
			return new ResponseEntity<>(poseta, HttpStatus.OK);
		} else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}

	@GetMapping("/posete/{email}/status")
	public ResponseEntity<String> checkStatus(@PathVariable String email) {
		LocalDate danas = LocalDate.now();

		Poseta poseta = posetaRepository
				.findTopByPosetilacEmailAndDatumPoseteAndVremeOdjaveIsNullOrderByVremePoseteDesc(email, danas);

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
		LocalDate danas = LocalDate.now();

		Poseta poseta = posetaRepository
				.findTopByPosetilacEmailAndDatumPoseteAndVremeOdjaveIsNullOrderByVremePoseteDesc(email, danas);

		return new ResponseEntity<>(poseta, HttpStatus.OK);
	}

	@PutMapping("/posete/{email}")
	public ResponseEntity<Poseta> checkOutEmail(@PathVariable String email) {
		LocalDate danas = LocalDate.now();

		Poseta poseta = posetaRepository
				.findTopByPosetilacEmailAndDatumPoseteAndVremeOdjaveIsNullOrderByVremePoseteDesc(email, danas);

		LocalTime vremeOdjave = LocalTime.now().truncatedTo(ChronoUnit.SECONDS);
		poseta.setVremeOdjave(vremeOdjave);

		posetaRepository.save(poseta);

		return new ResponseEntity<>(poseta, HttpStatus.OK);
	}
	
	@PutMapping("/posete/{email}/checkOprema")
	public ResponseEntity<Poseta> checkOutEmailOprema(@PathVariable String email) {
		LocalDate danas = LocalDate.now();
		
		Poseta poseta = posetaRepository
				.findTopByPosetilacEmailAndDatumPoseteAndVremeOdjaveIsNullOrderByVremePoseteDesc(email, danas);
		
		for (Oprema oprema : poseta.getOprema()) {
			oprema.setIsZauzeta(false);
			opremaRepository.save(oprema);
		}

		poseta.setOprema(null);

		LocalTime vremeOdjave = LocalTime.now().truncatedTo(ChronoUnit.SECONDS);
		poseta.setVremeOdjave(vremeOdjave);

		posetaRepository.save(poseta);
		
		return new ResponseEntity<>(poseta, HttpStatus.OK);

	}

}

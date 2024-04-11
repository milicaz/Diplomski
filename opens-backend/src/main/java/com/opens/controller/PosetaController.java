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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.PosetaDTO;
import com.opens.model.MestoPosete;
import com.opens.model.Oprema;
import com.opens.model.Poseta;
import com.opens.model.Posetilac;
import com.opens.repository.MestoPoseteRepository;
import com.opens.repository.OpremaRepository;
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
	private OpremaRepository opremaRepository;
	
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
	
	@GetMapping("/posete/{mestoPoseteId}/datum-posete")
	public ResponseEntity<List<Poseta>> getAllPosete(@PathVariable Long mestoPoseteId, @RequestParam LocalDate datum) {
		List<Poseta> posete = new ArrayList<>();

		posetaRepository.findByMestoPoseteIdAndDatumPosete(mestoPoseteId, datum).forEach(posete::add);

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
			
			List<Oprema> oprema = new ArrayList<>();

			Poseta _poseta = new Poseta();
			_poseta.setDatumPosete(LocalDate.now());
			_poseta.setVremePosete(LocalTime.now().truncatedTo(ChronoUnit.SECONDS));
			_poseta.setMestoPosete(mestoPosete.get());
			_poseta.setPosetilac(posetilac.get());
			
			for (int i = 0; i < posetaDTO.getOprema().size(); i++) {
				Optional<Oprema> _oprema = opremaRepository.findById(posetaDTO.getOprema().get(i).getId());
				_oprema.get().setIsZauzeta(true);
				oprema.add(_oprema.get());
			}

			_poseta.setOprema(oprema);
			
			posetaRepository.save(_poseta);

			return new ResponseEntity<>(_poseta, HttpStatus.CREATED);

		} catch (Exception e) {
			return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

}

package com.opens.service.impl;

import java.time.LocalDate;
import java.time.LocalTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.dto.PosetaDTO;
import com.opens.model.MestoPosete;
import com.opens.model.Oprema;
import com.opens.model.Poseta;
import com.opens.model.Posetilac;
import com.opens.repository.MestoPoseteRepository;
import com.opens.repository.OpremaRepository;
import com.opens.repository.PosetaRepository;
import com.opens.repository.PosetilacRepository;
import com.opens.service.PosetaService;
import com.opens.view.PoseteView;
import com.opens.view.repository.PoseteViewRepository;

@Service
public class PosetaServiceImpl implements PosetaService {

	@Autowired
	private PosetaRepository posetaRepository;

	@Autowired
	private PoseteViewRepository poseteViewRepository;

	@Autowired
	private MestoPoseteRepository mestoPoseteRepository;

	@Autowired
	private PosetilacRepository posetilacRepository;

	@Autowired
	private OpremaRepository opremaRepository;

	@Override
	public List<Poseta> findAll() {
		return posetaRepository.findAll();
	}

	@Override
	public List<Poseta> getNeodjavljenePosete() {
		LocalDate danas = LocalDate.now();
		return posetaRepository.findByVremeOdjaveIsNullAndDatumPoseteBefore(danas);
	}

	@Override
	public List<PoseteView> getPosetePoMestuPosete(Long mestoPoseteId) {
		return poseteViewRepository.findByMestoPoseteId(mestoPoseteId);
	}

	@Override
	public List<Poseta> getTrenutnePosetePoMestuPosete(Long mestoPoseteId) {
		LocalDate datum = LocalDate.now();
		return posetaRepository.findByMestoPoseteIdAndDatumPosete(mestoPoseteId, datum);
	}

	@Override
	public Poseta addPoseta(PosetaDTO posetaDTO) {
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

		return posetaRepository.save(_poseta);
	}

	// Odjava opreme u trenutno tabu
	@Override
	public Poseta odjaviOpremuTrenutno(Long id) {
		Optional<Poseta> posetaData = posetaRepository.findById(id);

		if (posetaData.isPresent()) {
			Poseta poseta = posetaData.get();

			for (Oprema oprema : poseta.getOprema()) {
				oprema.setIsZauzeta(false);
				opremaRepository.save(oprema);
			}

			poseta.setOprema(null);
			return posetaRepository.save(poseta);
		}
		return null;
	}

	// Odjava posetioca u trenutno tabu
	@Override
	public Poseta checkOutTrenutno(Long id) {
		Optional<Poseta> posetaData = posetaRepository.findById(id);

		if (posetaData.isPresent()) {
			Poseta poseta = posetaData.get();

			LocalTime vremeOdjave = LocalTime.now().truncatedTo(ChronoUnit.SECONDS);
			poseta.setVremeOdjave(vremeOdjave);

			return posetaRepository.save(poseta);
		}
		return null;
	}

	@Override
	public Poseta checkOutNevracene(Long id) {
		Optional<Poseta> posetaData = posetaRepository.findById(id);

		if (posetaData.isPresent()) {
			Poseta poseta = posetaData.get();

			LocalTime vremePosete = poseta.getVremePosete();
			LocalTime vremeOdjave;

			if (vremePosete.isBefore(LocalTime.of(16, 0))) {
				vremeOdjave = LocalTime.of(16, 0).truncatedTo(ChronoUnit.SECONDS);
			} else {

				vremeOdjave = LocalTime.of(22, 0).truncatedTo(ChronoUnit.SECONDS);
			}
			poseta.setVremeOdjave(vremeOdjave);

			for (Oprema oprema : poseta.getOprema()) {
				oprema.setIsZauzeta(false);
				opremaRepository.save(oprema);
			}

			poseta.setOprema(null);

			return posetaRepository.save(poseta);
		}
		return null;
	}

	@Override
	public Poseta checkStatus(String email) {
		LocalDate danas = LocalDate.now();
		return posetaRepository.findTopByPosetilacEmailAndDatumPoseteAndVremeOdjaveIsNullOrderByVremePoseteDesc(email,
				danas);
	}

	@Override
	public Poseta findPoseta(String email) {
		LocalDate danas = LocalDate.now();
		return posetaRepository.findTopByPosetilacEmailAndDatumPoseteAndVremeOdjaveIsNullOrderByVremePoseteDesc(email,
				danas);
	}

	@Override
	public Poseta checkOutQRcode(String email) {
		LocalDate danas = LocalDate.now();
		Poseta poseta = posetaRepository
				.findTopByPosetilacEmailAndDatumPoseteAndVremeOdjaveIsNullOrderByVremePoseteDesc(email, danas);

		LocalTime vremeOdjave = LocalTime.now().truncatedTo(ChronoUnit.SECONDS);
		poseta.setVremeOdjave(vremeOdjave);

		return posetaRepository.save(poseta);
	}

	@Override
	public Poseta checkOutOpremaQRcode(String email) {
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

		return posetaRepository.save(poseta);
	}

}

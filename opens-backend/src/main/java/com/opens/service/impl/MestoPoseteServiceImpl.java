package com.opens.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.MestoPosete;
import com.opens.repository.MestoPoseteRepository;
import com.opens.service.MestoPoseteService;

@Service
public class MestoPoseteServiceImpl implements MestoPoseteService {

	@Autowired
	private MestoPoseteRepository mestoPoseteRepository;

	@Override
	public List<MestoPosete> findAll() {
		return mestoPoseteRepository.findByDeletedFalse();
	}

	@Override
	public MestoPosete addMestoPosete(MestoPosete mestoPosete) {
		return mestoPoseteRepository
				.save(new MestoPosete(mestoPosete.getNazivMesta(), mestoPosete.getUkupanBrojMesta()));
	}

	@Override
	public MestoPosete updateMestoPosete(Long id, MestoPosete mestoPosete) {
		Optional<MestoPosete> mestoPoseteData = mestoPoseteRepository.findById(id);

		if (mestoPoseteData.isPresent()) {
			MestoPosete _mestoPosete = mestoPoseteData.get();
			_mestoPosete.setNazivMesta(mestoPosete.getNazivMesta());
			_mestoPosete.setUkupanBrojMesta(mestoPosete.getUkupanBrojMesta());
			return mestoPoseteRepository.save(_mestoPosete);
		}
		return null;
	}

	@Override
	public void deleteMestoPosete(Long id) {
		MestoPosete mestoPosete = mestoPoseteRepository.findById(id).get();
		mestoPosete.setDeleted(true);
		mestoPoseteRepository.save(mestoPosete);
	}

}

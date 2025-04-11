package com.opens.service.impl;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.Posetilac;
import com.opens.model.ProfilnaSlika;
import com.opens.repository.PosetilacRepository;
import com.opens.repository.ProfilnaSlikaRepository;
import com.opens.service.PosetilacService;

import jakarta.transaction.Transactional;

@Service
public class PosetilacServiceImpl implements PosetilacService {

	@Autowired
	private PosetilacRepository posetilacRepo;
	@Autowired
	private ProfilnaSlikaRepository profilnaSlikaRepository;

	@Override
	public Optional<Posetilac> findByEmail(String email) {
		// TODO Auto-generated method stub
		return posetilacRepo.findByEmail(email)
;
	}

	@Override
	public Boolean existsByEmail(String email) {
		// TODO Auto-generated method stub
		return posetilacRepo.existsByEmail(email)
;
	}

	@Override
	@Transactional
	public ProfilnaSlika getProfilnaSlikaByPosetilacId(Long id) {
		return profilnaSlikaRepository.findByPosetilacId(id)
;
	}

}

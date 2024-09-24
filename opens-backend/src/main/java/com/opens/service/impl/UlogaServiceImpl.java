package com.opens.service.impl;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.EUloge;
import com.opens.model.Uloga;
import com.opens.repository.UlogaRepository;
import com.opens.service.UlogaService;

@Service
public class UlogaServiceImpl implements UlogaService {
	
	@Autowired
	private UlogaRepository ulogaRepo;

	@Override
	public List<Uloga> findAll() {
		// TODO Auto-generated method stub
		return ulogaRepo.findAll();
	}

	@Override
	public Uloga findOneByNaziv(EUloge naziv) {
		// TODO Auto-generated method stub
		return ulogaRepo.findOneByNaziv(naziv);
	}
	
	

}

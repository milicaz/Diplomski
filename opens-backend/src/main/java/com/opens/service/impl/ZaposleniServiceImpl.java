package com.opens.service.impl;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.opens.model.Uloga;
import com.opens.model.Zaposleni;
import com.opens.repository.UlogaRepository;
import com.opens.repository.ZaposleniRepository;
import com.opens.service.ZaposleniService;

@Service
public class ZaposleniServiceImpl implements ZaposleniService {

	@Autowired
	private ZaposleniRepository zaposleniRepo;

	@Autowired
	private UlogaRepository ulogaRepo;

	@Override
	public List<Zaposleni> findAllActive() {
		// TODO Auto-generated method stub
		return zaposleniRepo.findAllActive();
	}

	@Override
	public Zaposleni findActiveById(Long id) {
		// TODO Auto-generated method stub
		return zaposleniRepo.findActiveById(id);
	}

	@Override
	public Optional<Zaposleni> findByEmail(String email) {
		// TODO Auto-generated method stub
		return zaposleniRepo.findByEmail(email);
	}

	@Override
	public Boolean existsByEmail(String email) {
		// TODO Auto-generated method stub
		return zaposleniRepo.existsByEmail(email);
	}

	@Override
	public Zaposleni updateZaposleni(Long id, Zaposleni zaposleni) {
		Optional<Zaposleni> updateZaposleni = zaposleniRepo.findById(id);

		if (updateZaposleni.isPresent()) {
			Zaposleni upZaposleni = updateZaposleni.get();
			upZaposleni.setEmail(zaposleni.getEmail());
			upZaposleni.setIme(zaposleni.getIme());
			upZaposleni.setPrezime(zaposleni.getPrezime());
			upZaposleni.setRod(zaposleni.getRod());
			upZaposleni.setGodine(zaposleni.getGodine());
			upZaposleni.setMestoBoravista(zaposleni.getMestoBoravista());
			upZaposleni.setBrojTelefona(zaposleni.getBrojTelefona());
//		upZaposleni.setUloge(zaposleni.getUloge());
			if (zaposleni.getUloge() != null) {
				// Assuming you have a method to fetch Uloga by name
				Set<Uloga> roles = new HashSet<>();
				for (Uloga uloga : zaposleni.getUloge()) {
					Uloga existingRole = ulogaRepo.findByNaziv(uloga.getNaziv()).get();
					if (existingRole != null) {
						roles.add(existingRole);
					} else {
//	                return ResponseEntity()<>(HttpStatus.BAD_REQUEST);
						return null;
					}
				}
				upZaposleni.setUloge(roles);
			}

			zaposleniRepo.save(upZaposleni);
			return upZaposleni;
		}

		return null;
	}

//	@Override
//	public String deleteZaposleni(Long id) {
//		Optional<Zaposleni> optionalZaposleni = zaposleniRepo.findById(id);
//
//		if (!optionalZaposleni.isPresent()) {
////            return new ResponseEntity<>("Zaposleni not found", HttpStatus.NOT_FOUND);
//			return "Zaposleni nije pronađen!";
//		}
//
//		Zaposleni zaposleni = optionalZaposleni.get();
//		zaposleni.setDeleted(true);
//		zaposleniRepo.save(zaposleni);
//		return "Zaposleni je obrisan!";
//	}
	
	@Override
	public String deleteZaposleni(Long id) {
	    if (!zaposleniRepo.existsById(id)) {
	        return "Zaposleni nije pronađen!";
	    }

	    zaposleniRepo.deleteById(id);
	    return "Zaposleni je uspešno obrisan!";
	}

}

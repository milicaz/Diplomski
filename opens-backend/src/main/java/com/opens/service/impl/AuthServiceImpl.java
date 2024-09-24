package com.opens.service.impl;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.Set;

import org.springframework.stereotype.Service;
import org.springframework.util.ResourceUtils;

import com.opens.dto.PosetilacDTO;
import com.opens.dto.ZaposleniDTO;
import com.opens.model.EUloge;
import com.opens.model.Posetilac;
import com.opens.model.ProfilnaSlika;
import com.opens.model.Uloga;
import com.opens.model.Zaposleni;
import com.opens.service.AuthService;
import com.opens.repository.UlogaRepository;
import com.opens.repository.ZaposleniRepository;
import com.opens.repository.PosetilacRepository;
import com.opens.repository.ProfilnaSlikaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;


@Service
public class AuthServiceImpl implements AuthService {
	
	@Autowired
	private UlogaRepository ulogaRepo;
	
	@Autowired
	private ZaposleniRepository zaposleniRepo;
	
	@Autowired
	private PosetilacRepository posetilacRepo;
	
	@Autowired
	private ProfilnaSlikaRepository profilnaSlikaRepository;
	
	@Autowired
	PasswordEncoder encoder;

	@Override
	public void registerZaposleni(ZaposleniDTO zaposleniDTO) {
		// TODO Auto-generated method stub
		Zaposleni zaposleni = new Zaposleni();
		zaposleni.setEmail(zaposleniDTO.getEmail());
		zaposleni.setPassword(encoder.encode(zaposleniDTO.getPassword()));
		zaposleni.setIme(zaposleniDTO.getIme());
		zaposleni.setPrezime(zaposleniDTO.getPrezime());
		zaposleni.setRod(zaposleniDTO.getRod());
		zaposleni.setGodine(zaposleniDTO.getGodine());
		zaposleni.setMestoBoravista(zaposleniDTO.getMestoBoravista());
		zaposleni.setBrojTelefona(zaposleniDTO.getBrojTelefon());
		
		Set<String> strUloge = zaposleniDTO.getUloge();
		Set<Uloga> uloge = new HashSet<>();
		
		if(strUloge == null) {
			Uloga zaposleniUloga = ulogaRepo.findByNaziv(EUloge.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			uloge.add(zaposleniUloga);
		} else {
			strUloge.forEach(uloga -> {
				switch (uloga) {
				case "admin":
					Uloga adminUloga = ulogaRepo.findByNaziv(EUloge.ROLE_ADMIN)
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					uloge.add(adminUloga);
				
					break;
				case "dogadjaj_admin":
					Uloga dogadjajUloga = ulogaRepo.findByNaziv(EUloge.ROLE_ADMIN_DOGADJAJ)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					uloge.add(dogadjajUloga);
					
					break;
					
				case "super_admin":
					Uloga superUloga = ulogaRepo.findByNaziv(EUloge.ROLE_SUPER_ADMIN)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					uloge.add(superUloga);
					
					break;
					
				default:
					Uloga zaposleniUloga = ulogaRepo.findByNaziv(EUloge.ROLE_ADMIN)
						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					uloge.add(zaposleniUloga);
				}
			});
		}
		
		zaposleni.setUloge(uloge);
		zaposleniRepo.save(zaposleni);
		
	}

	@Override
	public void registerPosetilac(PosetilacDTO posetilacDTO) {
		// TODO Auto-generated method stub
		
		Uloga uloga = ulogaRepo.findOneByNaziv(EUloge.ROLE_POSETILAC);
		
		Posetilac posetilac = new Posetilac();
		posetilac.setEmail(posetilacDTO.getEmail());
		posetilac.setPassword(encoder.encode(posetilacDTO.getPassword()));
		posetilac.setIme(posetilacDTO.getIme());
		posetilac.setPrezime(posetilacDTO.getPrezime());
		posetilac.setRod(posetilacDTO.getRod());
		posetilac.setGodine(posetilacDTO.getGodine());
		posetilac.setMestoBoravista(posetilacDTO.getMestoBoravista());
		posetilac.setBrojTelefona(posetilacDTO.getBrojTelefona());
		posetilac.setUloga(uloga);
		
		posetilacRepo.save(posetilac);
		
		try {
			ProfilnaSlika profilnaSlika = new ProfilnaSlika();
			
			Path imagePath = Paths.get(ResourceUtils.getURL("classpath:images/profile.png").toURI());
			String imageName = imagePath.getFileName().toString();
			profilnaSlika.setTipSlike(getFileExtension(imageName));
			profilnaSlika.setProfilnaSlika(Files.readAllBytes(imagePath));
			
			profilnaSlika.setPosetilac(posetilac);
			
			profilnaSlikaRepository.save(profilnaSlika);
		}catch(Exception e) {}
		
	}
	
	private String getFileExtension(String fileName) {
	    int lastIndexOfDot = fileName.lastIndexOf('.');
	    if (lastIndexOfDot > 0 && lastIndexOfDot < fileName.length() - 1) {
	        return fileName.substring(lastIndexOfDot + 1).toLowerCase();
	    }
	    return "";
	}

}

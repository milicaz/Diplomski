package com.opens.controller;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.opens.dto.LoginDTO;
import com.opens.dto.PosetilacDTO;
import com.opens.dto.ZaposleniDTO;
import com.opens.model.EUloge;
import com.opens.model.Posetilac;
import com.opens.model.Uloga;
import com.opens.model.Zaposleni;
import com.opens.repository.UlogaRepository;
import com.opens.repository.ZaposleniRepository;
import com.opens.repository.PosetilacRepository;
import com.opens.security.jwt.JwtUtils;
import com.opens.security.service.ZaposleniDetailsImpl;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {
	
	@Autowired
	AuthenticationManager authenticationManager;
	
	@Autowired
	PosetilacRepository posetilacRepo;
	
	@Autowired
	ZaposleniRepository zaposleniRepo;
	
	@Autowired
	UlogaRepository ulogaRepo;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@Validated @RequestBody LoginDTO loginDTO) {
		
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		ZaposleniDetailsImpl zaposleniDetails = (ZaposleniDetailsImpl) authentication.getPrincipal();
		
		String jwt = jwtUtils.generateJwtToken(zaposleniDetails);
		
		List<String> uloge = zaposleniDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.collect(Collectors.toList());
		
		logger.info("USER_LOGIN_SUCCESS - User logged in successfully");
		return (ResponseEntity<?>) ResponseEntity
				.ok("User logged in successfully!");
		
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerZaposleni(@Validated @RequestBody ZaposleniDTO zaposleniDTO) {
		if(zaposleniRepo.existsByEmail(zaposleniDTO.getEmail())) {
			logger.warn("USER_REGISTRATION_FAIL - Email " + zaposleniDTO.getEmail() + " is already in use");
			return ResponseEntity.badRequest().body("Error: Email is already in use!");
		}
		
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
		
		logger.info("USER_REGISTRATION_SUCCESS - User registered successfully");
		return ResponseEntity.ok("User registered successfully!");
	}
	
	@PostMapping("/signupPosetilac")
	public ResponseEntity<?> registerPosetilac(@Validated @RequestBody PosetilacDTO posetilacDTO){
		if(posetilacRepo.existsByEmail(posetilacDTO.getEmail())) {
			logger.warn("USER_REGISTRATION_FAIL - Email " + posetilacDTO.getEmail() + " is already in use");
			return ResponseEntity.badRequest().body("Error: Email is already in use!");
		}
		
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
		
		logger.info("USER_REGISTRATION_SUCCESS - User registered successfully");
		return ResponseEntity.ok("User registered successfully!");
		
	}
	
}

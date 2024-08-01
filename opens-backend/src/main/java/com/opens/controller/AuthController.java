package com.opens.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.util.ResourceUtils;
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
import com.opens.model.ProfilnaSlika;
import com.opens.model.Uloga;
import com.opens.model.Zaposleni;
import com.opens.repository.PosetilacRepository;
import com.opens.repository.ProfilnaSlikaRepository;
import com.opens.repository.UlogaRepository;
import com.opens.repository.ZaposleniRepository;
import com.opens.security.jwt.JwtUtils;
import com.opens.security.service.PosetilacDetailsImpl;
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
	
	@Autowired
	private ProfilnaSlikaRepository profilnaSlikaRepository;
	
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
		
		try {
			ProfilnaSlika profilnaSlika = new ProfilnaSlika();
			
			Path imagePath = Paths.get(ResourceUtils.getURL("classpath:images/profile.png").toURI());
			String imageName = imagePath.getFileName().toString();
			profilnaSlika.setTipSlike(getFileExtension(imageName));
			profilnaSlika.setProfilnaSlika(Files.readAllBytes(imagePath));
			
			profilnaSlika.setPosetilac(posetilac);
			
			profilnaSlikaRepository.save(profilnaSlika);
		}catch(Exception e) {}
				
		logger.info("USER_REGISTRATION_SUCCESS - User registered successfully");
		return ResponseEntity.ok("User registered successfully!");
		
	}
		    
	@PostMapping("/loginPosetilac")
	public ResponseEntity<?> loginPosetilac(@Validated @RequestBody LoginDTO loginDTO) {
		
		System.out.println("Email je: " + loginDTO.getEmail());
		System.out.println("Password je: " + loginDTO.getPassword());
		
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
		
		System.out.println("Prosao je Authentication");
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		PosetilacDetailsImpl posetilacDetails = (PosetilacDetailsImpl) authentication.getPrincipal();
		
		System.out.println("Prosao je Security");
		
		String jwt = jwtUtils.generateJwtToken(posetilacDetails);
		
		System.out.println();
		
		String roleToCheck = "ROLE_POSETILAC";
		
		 boolean hasRole = posetilacDetails.getAuthorities().stream()
		            .map(item -> item.getAuthority())
		            .anyMatch(authority -> authority.equals(roleToCheck));

		    // Log information and return response based on role presence
		    if (hasRole) {
		        logger.info("USER_LOGIN_SUCCESS - User with role '{}' logged in successfully", roleToCheck);
		        return ResponseEntity.ok("User with role '" + roleToCheck + "' logged in successfully!");
		    } else {
		        logger.info("USER_LOGIN_FAILURE - User with role '{}' not found", roleToCheck);
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User with role '" + roleToCheck + "' not found.");
		    }
		
//		List<String> uloge = posetilacDetails.getAuthorities().stream().map(item -> item.getAuthority())
//				.collect(Collectors.toList());
		
//		logger.info("USER_LOGIN_SUCCESS - User logged in successfully");
//		return (ResponseEntity<?>) ResponseEntity
//				.ok("User logged in successfully!");
	
	}
	
	private String getFileExtension(String fileName) {
	    int lastIndexOfDot = fileName.lastIndexOf('.');
	    if (lastIndexOfDot > 0 && lastIndexOfDot < fileName.length() - 1) {
	        return fileName.substring(lastIndexOfDot + 1).toLowerCase();
	    }
	    return "";
	}
	
}

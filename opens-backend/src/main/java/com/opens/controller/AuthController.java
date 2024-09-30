package com.opens.controller;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
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
import com.opens.model.RefreshToken;
import com.opens.model.Uloga;
import com.opens.model.Zaposleni;
import com.opens.repository.PosetilacRepository;
import com.opens.repository.ProfilnaSlikaRepository;
import com.opens.repository.UlogaRepository;
import com.opens.repository.ZaposleniRepository;
import com.opens.security.TokenRefreshException;
import com.opens.security.jwt.JwtUtils;
import com.opens.security.request.TokenRefreshRequest;
import com.opens.security.response.JwtResponse;
import com.opens.security.response.MessageResponse;
import com.opens.security.response.TokenRefreshResponse;
import com.opens.security.service.PosetilacDetailsImpl;
import com.opens.security.service.ZaposleniDetailsImpl;
import com.opens.security.service.RefreshTokenService;
import com.opens.service.ZaposleniService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import com.opens.service.AuthService;
import com.opens.service.PosetilacService;

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
	ZaposleniService zaposleniService;
	
	@Autowired
	PosetilacService posetilacService;
	
	@Autowired
	AuthService authService;
	
	@Autowired
	UlogaRepository ulogaRepo;
	
	@Autowired
	PasswordEncoder encoder;
	
	@Autowired
	JwtUtils jwtUtils;
	
	@Autowired
	private ProfilnaSlikaRepository profilnaSlikaRepository;
	
	@Autowired
	RefreshTokenService refreshTokenService;
	
	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@Validated @RequestBody LoginDTO loginDTO, HttpServletResponse response) {
	    try {
	        Authentication authentication = authenticationManager.authenticate(
	                new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
	        
	        SecurityContextHolder.getContext().setAuthentication(authentication);
	        
	        System.out.println("Authentication u login je: " + authentication);
	    
	        
	        ZaposleniDetailsImpl zaposleniDetails = (ZaposleniDetailsImpl) authentication.getPrincipal();
	        
	        System.out.println("Authenticated user: " + zaposleniDetails.getEmail());
	        System.out.println("Auth principal login: " + authentication.getPrincipal());
	        
	        String jwt = jwtUtils.generateJwtToken(zaposleniDetails);
	        RefreshToken refreshToken = refreshTokenService.createRefreshToken(zaposleniDetails.getEmail());

	        // Create cookies for the tokens
	        Cookie jwtCookie = new Cookie("accessToken", jwt);
	        jwtCookie.setHttpOnly(true);
	        jwtCookie.setSecure(true);
	        jwtCookie.setPath("/");
	        jwtCookie.setMaxAge(3600);

	        Cookie refreshCookie = new Cookie("refreshToken", refreshToken.getToken());
	        refreshCookie.setHttpOnly(true);
//	        refreshCookie.setSecure(true);
	        refreshCookie.setPath("/");
	        refreshCookie.setMaxAge(86400);

	        // Add cookies to the response
	        response.addCookie(jwtCookie);
	        response.addCookie(refreshCookie);
	        
	        List<String> uloge = zaposleniDetails.getAuthorities().stream()
	                .map(item -> item.getAuthority())
	                .collect(Collectors.toList());

	        return ResponseEntity.ok(new JwtResponse(null, null, 
	                zaposleniDetails.getId(), 
	                zaposleniDetails.getEmail(), 
	                uloge));
	    } catch (Exception e) {
	        System.out.println("Login failed: " + e.getMessage());
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
	    }
	}
	
	@PostMapping("/signup")
	public ResponseEntity<?> registerZaposleni(@Validated @RequestBody ZaposleniDTO zaposleniDTO) {
//		if(zaposleniRepo.existsByEmail(zaposleniDTO.getEmail()) || posetilacRepo.existsByEmail(zaposleniDTO.getEmail())) {
//			logger.warn("USER_REGISTRATION_FAIL - Email " + zaposleniDTO.getEmail() + " is already in use");
//			return ResponseEntity.badRequest().body("Error: Email is already in use!");
//		}
		if(zaposleniService.existsByEmail(zaposleniDTO.getEmail()) || posetilacService.existsByEmail(zaposleniDTO.getEmail())) {
			logger.warn("USER_REGISTRATION_FAIL - Email " + zaposleniDTO.getEmail() + " is already in use");
			return ResponseEntity.badRequest().body("Error: Email is already in use!");
		}
		
//		Zaposleni zaposleni = new Zaposleni();
//		zaposleni.setEmail(zaposleniDTO.getEmail());
//		zaposleni.setPassword(encoder.encode(zaposleniDTO.getPassword()));
//		zaposleni.setIme(zaposleniDTO.getIme());
//		zaposleni.setPrezime(zaposleniDTO.getPrezime());
//		zaposleni.setRod(zaposleniDTO.getRod());
//		zaposleni.setGodine(zaposleniDTO.getGodine());
//		zaposleni.setMestoBoravista(zaposleniDTO.getMestoBoravista());
//		zaposleni.setBrojTelefona(zaposleniDTO.getBrojTelefon());
//		
//		Set<String> strUloge = zaposleniDTO.getUloge();
//		Set<Uloga> uloge = new HashSet<>();
//		
//		if(strUloge == null) {
//			Uloga zaposleniUloga = ulogaRepo.findByNaziv(EUloge.ROLE_ADMIN)
//					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//			uloge.add(zaposleniUloga);
//		} else {
//			strUloge.forEach(uloga -> {
//				switch (uloga) {
//				case "admin":
//					Uloga adminUloga = ulogaRepo.findByNaziv(EUloge.ROLE_ADMIN)
//					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					uloge.add(adminUloga);
//				
//					break;
//				case "dogadjaj_admin":
//					Uloga dogadjajUloga = ulogaRepo.findByNaziv(EUloge.ROLE_ADMIN_DOGADJAJ)
//						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					uloge.add(dogadjajUloga);
//					
//					break;
//					
//				case "super_admin":
//					Uloga superUloga = ulogaRepo.findByNaziv(EUloge.ROLE_SUPER_ADMIN)
//						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					uloge.add(superUloga);
//					
//					break;
//					
//				default:
//					Uloga zaposleniUloga = ulogaRepo.findByNaziv(EUloge.ROLE_ADMIN)
//						.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
//					uloge.add(zaposleniUloga);
//				}
//			});
//		}
//		
//		zaposleni.setUloge(uloge);
//		zaposleniRepo.save(zaposleni);
		authService.registerZaposleni(zaposleniDTO);
//		logger.info("USER_REGISTRATION_SUCCESS - User registered successfully");
//		return ResponseEntity.ok("User registered successfully!");
		
		return ResponseEntity.ok(new MessageResponse("Zaposleni je uspešno registrovan!"));
	}
	
	@PostMapping("/signupPosetilac")
	public ResponseEntity<?> registerPosetilac(@Validated @RequestBody PosetilacDTO posetilacDTO){
//		if(posetilacRepo.existsByEmail(posetilacDTO.getEmail()) || zaposleniRepo.existsByEmail(posetilacDTO.getEmail())) {
//			logger.warn("USER_REGISTRATION_FAIL - Email " + posetilacDTO.getEmail() + " is already in use");
//			return ResponseEntity.badRequest().body("Error: Email is already in use!");
//		}
		if(posetilacService.existsByEmail(posetilacDTO.getEmail()) || zaposleniService.existsByEmail(posetilacDTO.getEmail())) {
			logger.warn("USER_REGISTRATION_FAIL - Email " + posetilacDTO.getEmail() + " is already in use");
			return ResponseEntity.badRequest().body("Error: Email is already in use!");
		}
		
//		Uloga uloga = ulogaRepo.findOneByNaziv(EUloge.ROLE_POSETILAC);
//		
//		Posetilac posetilac = new Posetilac();
//		posetilac.setEmail(posetilacDTO.getEmail());
//		posetilac.setPassword(encoder.encode(posetilacDTO.getPassword()));
//		posetilac.setIme(posetilacDTO.getIme());
//		posetilac.setPrezime(posetilacDTO.getPrezime());
//		posetilac.setRod(posetilacDTO.getRod());
//		posetilac.setGodine(posetilacDTO.getGodine());
//		posetilac.setMestoBoravista(posetilacDTO.getMestoBoravista());
//		posetilac.setBrojTelefona(posetilacDTO.getBrojTelefona());
//		posetilac.setUloga(uloga);
//		
//		posetilacRepo.save(posetilac);
		
//		try {
//			ProfilnaSlika profilnaSlika = new ProfilnaSlika();
//			
//			Path imagePath = Paths.get(ResourceUtils.getURL("classpath:images/profile.png").toURI());
//			String imageName = imagePath.getFileName().toString();
//			profilnaSlika.setTipSlike(getFileExtension(imageName));
//			profilnaSlika.setProfilnaSlika(Files.readAllBytes(imagePath));
//			
//			profilnaSlika.setPosetilac(posetilac);
//			
//			profilnaSlikaRepository.save(profilnaSlika);
//		}catch(Exception e) {}
				
//		logger.info("USER_REGISTRATION_SUCCESS - User registered successfully");
//		return ResponseEntity.ok("User registered successfully!");
		
		authService.registerPosetilac(posetilacDTO);
		
		return ResponseEntity.ok(new MessageResponse("Posetilac je uspešno registrovan!"));
		
	}
		    
	@PostMapping("/loginPosetilac")
	public ResponseEntity<?> loginPosetilac(@Validated @RequestBody LoginDTO loginDTO) {
		
		
		Authentication authentication = authenticationManager
				.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
		
		SecurityContextHolder.getContext().setAuthentication(authentication);
		PosetilacDetailsImpl posetilacDetails = (PosetilacDetailsImpl) authentication.getPrincipal();
		
		String jwt = jwtUtils.generateJwtToken(posetilacDetails);
		
		RefreshToken refreshToken = refreshTokenService.createRefreshToken(posetilacDetails.getEmail());
		
		String roleToCheck = "ROLE_POSETILAC";
		
		 boolean hasRole = posetilacDetails.getAuthorities().stream()
		            .map(item -> item.getAuthority())
		            .anyMatch(authority -> authority.equals(roleToCheck));

		    // Log information and return response based on role presence
		    if (hasRole) {
		        logger.info("USER_LOGIN_SUCCESS - User with role '{}' logged in successfully", roleToCheck);
		        return ResponseEntity.ok(new JwtResponse(jwt, 
		        		refreshToken.getToken(),
		                posetilacDetails.getId(), 
		                posetilacDetails.getEmail(), 
		                roleToCheck));
		    } else {
		        logger.info("USER_LOGIN_FAILURE - User with role '{}' not found", roleToCheck);
		        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User with role '" + roleToCheck + "' not found.");
		    }
	
	}
	
	@PostMapping("/refreshtoken")
	public ResponseEntity<?> refreshtoken(@Validated @RequestBody TokenRefreshRequest request) {
		String requestRefreshToken = request.getRefreshToken();

	    // Find the refresh token in the database
	    Optional<RefreshToken> optionalRefreshToken = refreshTokenService.findByToken(requestRefreshToken);

	    if (optionalRefreshToken.isPresent()) {
	        RefreshToken refreshToken = optionalRefreshToken.get();
	        
	        // Verify the token's expiration
	        RefreshToken verifiedToken = refreshTokenService.verifyExpiration(refreshToken);
	        if (verifiedToken != null) {
	            String email;
	            String userType;

	            // Determine the type of user and get the email
	            if (verifiedToken.getZaposleni() != null) {
	                email = verifiedToken.getZaposleni().getEmail();
	                userType = "Zaposleni";
	            } else if (verifiedToken.getPosetilac() != null) {
	                email = verifiedToken.getPosetilac().getEmail();
	                userType = "Posetilac";
	            } else {
	                throw new TokenRefreshException(requestRefreshToken, "No associated user found!");
	            }

	            // Generate a new JWT token using the user's email
	            String token;
	            if ("Zaposleni".equals(userType)) {
	                // Create a ZaposleniDetailsImpl instance for the user
	                ZaposleniDetailsImpl zaposleniDetails = new ZaposleniDetailsImpl(
	                    verifiedToken.getZaposleni().getId(),
	                    email,
	                    verifiedToken.getZaposleni().getPassword(),
	                    null // Set appropriate authorities if needed
	                );
	                token = jwtUtils.generateJwtToken(zaposleniDetails);
	            } else {
	                // Create a PosetilacDetailsImpl instance for the user
	                PosetilacDetailsImpl posetilacDetails = new PosetilacDetailsImpl(
	                    verifiedToken.getPosetilac().getId(),
	                    email,
	                    verifiedToken.getPosetilac().getPassword(),
	                    null // Set appropriate authorities if needed
	                );
	                token = jwtUtils.generateJwtToken(posetilacDetails);
	            }

	            // Return a response with the new JWT token and the old refresh token
	            return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
	        } else {
	            throw new TokenRefreshException(requestRefreshToken, "Refresh token has expired!");
	        }
	    } else {
	        throw new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!");
	    }
	}
	
	@PostMapping("/logout")
	public ResponseEntity<?> logout(@Validated @RequestBody TokenRefreshRequest request) {
	    String refreshToken = request.getRefreshToken();

	    // Check if the refresh token exists
	    Optional<RefreshToken> optionalRefreshToken = refreshTokenService.findByToken(refreshToken);
	    
	    if (optionalRefreshToken.isPresent()) {
	        RefreshToken token = optionalRefreshToken.get();
	        
	        // Invalidate the token by deleting it
	        refreshTokenService.delete(token);
	        
	        return ResponseEntity.ok(new MessageResponse("Logout successful."));
	    } else {
	        return ResponseEntity.badRequest().body("Invalid refresh token.");
	    }
	}
	
	@PostMapping("/logoutZaposleniNovi")
	public ResponseEntity<?> logout(HttpServletRequest request) {
	    // Read the refresh token from the HttpOnly cookie
		
	    Cookie[] cookies = request.getCookies();
	    System.out.println("Cookies: " + cookies);
	    String refreshToken = null;

	    if (cookies != null) {
	        for (Cookie cookie : cookies) {
	            if ("refreshToken".equals(cookie.getName())) {
	                refreshToken = cookie.getValue();
	                break;
	            }
	        }
	    }

	    // Check if the refresh token was found
	    if (refreshToken != null) {
	        // Check if the refresh token exists in the database
	        Optional<RefreshToken> optionalRefreshToken = refreshTokenService.findByToken(refreshToken);
	        
	        if (optionalRefreshToken.isPresent()) {
	            RefreshToken token = optionalRefreshToken.get();
	            
	            // Invalidate the token by deleting it
	            refreshTokenService.delete(token);
	            
	            // Optionally, clear the security context if needed
	            // SecurityContextHolder.clearContext(); // Uncomment if needed
	            
	            return ResponseEntity.ok(new MessageResponse("Logout successful."));
	        } else {
	            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token.");
	        }
	    } else {
	        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token found.");
	    }
	}
}

package com.opens.controller;

import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
import com.opens.model.RefreshToken;
import com.opens.repository.PosetilacRepository;
import com.opens.repository.UlogaRepository;
import com.opens.repository.ZaposleniRepository;
import com.opens.security.TokenRefreshException;
import com.opens.security.jwt.JwtUtils;
import com.opens.security.request.TokenRefreshRequest;
import com.opens.security.response.JwtResponse;
import com.opens.security.response.MessageResponse;
import com.opens.security.response.TokenRefreshResponse;
import com.opens.security.service.PosetilacDetailsImpl;
import com.opens.security.service.RefreshTokenService;
import com.opens.security.service.ZaposleniDetailsImpl;
import com.opens.service.AuthService;
import com.opens.service.PosetilacService;
import com.opens.service.ZaposleniService;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

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
	RefreshTokenService refreshTokenService;

	private static final Logger logger = LoggerFactory.getLogger(AuthController.class);

	/*
	 * ZAPOSLENI
	 */
	@PostMapping("/signup")
	public ResponseEntity<?> registerZaposleni(@Validated @RequestBody ZaposleniDTO zaposleniDTO) {
		if (zaposleniService.existsByEmail(zaposleniDTO.getEmail())
				|| posetilacService.existsByEmail(zaposleniDTO.getEmail())) {
			logger.warn("USER_REGISTRATION_FAIL - Email " + zaposleniDTO.getEmail() + " is already in use");
//			return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Email is already in use!");
			return ResponseEntity.status(HttpStatus.CONFLICT).body(new MessageResponse("Email je u upotrebi!"));
		}
		authService.registerZaposleni(zaposleniDTO);
		return ResponseEntity.ok(new MessageResponse("Zaposleni je uspešno registrovan!"));
	}

	@PostMapping("/login")
	public ResponseEntity<?> loginZaposleni(@Validated @RequestBody LoginDTO loginDTO, HttpServletResponse response) {
		try {
			Authentication authentication = authenticationManager
					.authenticate(new UsernamePasswordAuthenticationToken(loginDTO.getEmail(), loginDTO.getPassword()));
			SecurityContextHolder.getContext().setAuthentication(authentication);
			ZaposleniDetailsImpl zaposleniDetails = (ZaposleniDetailsImpl) authentication.getPrincipal();

			String jwt = jwtUtils.generateJwtToken(zaposleniDetails);
			RefreshToken refreshToken = refreshTokenService.createRefreshToken(zaposleniDetails.getEmail());

			Cookie refreshCookie = new Cookie("refreshToken", refreshToken.getToken());
			refreshCookie.setHttpOnly(true);
//			refreshCookie.setSecure(true);
			refreshCookie.setPath("/");
			refreshCookie.setMaxAge(691200);

			// Add cookies to the response
			response.addCookie(refreshCookie);

			List<String> uloge = zaposleniDetails.getAuthorities().stream().map(item -> item.getAuthority())
					.collect(Collectors.toList());

			return ResponseEntity
					.ok(new JwtResponse(jwt, null, zaposleniDetails.getId(), zaposleniDetails.getEmail(), uloge));
		} catch (Exception e) {
			logger.error("LOGIN FAILED: {}", e.getMessage());
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed");
		}
	}
	
	

	@PostMapping("/logoutZaposleni")
	public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response) {
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

				Cookie refreshCookie = new Cookie("refreshToken", null);
				refreshCookie.setHttpOnly(true);
				refreshCookie.setSecure(true);
				refreshCookie.setPath("/");
				refreshCookie.setMaxAge(0); // This will delete the cookie

				response.addCookie(refreshCookie);

				return ResponseEntity.ok(new MessageResponse("Logout successful."));
			} else {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid refresh token.");
			}
		} else {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("No refresh token found.");
		}
	}
	
	@PostMapping("/refreshtokenZaposleni")
	public ResponseEntity<?> refreshToken(HttpServletRequest request, HttpServletResponse response) {
		String requestRefreshToken = extractCookie(request, "refreshToken");
		System.out.println("Refresh token u requestu: " + requestRefreshToken);

		if (requestRefreshToken == null) {
			logger.error("REFRESH TOKEN ZAPOSLENI - Refresh token not found in cookies");
			deleteCookies(response);
			return ResponseEntity.badRequest().body("Refresh token not found in cookies!");
		}

		Optional<RefreshToken> optionalRefreshToken = refreshTokenService.findByToken(requestRefreshToken);
		if (optionalRefreshToken.isPresent()) {
			try {
				RefreshToken refreshToken = optionalRefreshToken.get();
				RefreshToken verifiedToken = refreshTokenService.verifyExpiration(refreshToken);

				if (verifiedToken != null && verifiedToken.getZaposleni() != null) {
					String email = verifiedToken.getZaposleni().getEmail();
					List<GrantedAuthority> authorities = verifiedToken.getZaposleni().getUloge().stream()
							.map(uloga -> new SimpleGrantedAuthority(uloga.getNaziv().name())).collect(Collectors.toList());
					ZaposleniDetailsImpl zaposleniDetails = new ZaposleniDetailsImpl(
							verifiedToken.getZaposleni().getId(), email, verifiedToken.getZaposleni().getPassword(),
							authorities // Set appropriate authorities if needed
					);

					String token = jwtUtils.generateJwtToken(zaposleniDetails);
					return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
				} else {
					logger.warn("REFRESH TOKEN ZAPOSLENI - Refresh token has expired");
					deleteCookies(response);
					return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token has expired!");
				}
			} catch (TokenRefreshException e) {
				logger.warn("REFRESH TOKEN ZAPOSLENI - {}", e.getMessage());
				deleteCookies(response);
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
			}
		} else {
			logger.warn("REFRESH TOKEN ZAPOSLENI - Refresh token is not in database");
			deleteCookies(response);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh token is not in database!");
		}
	}

	private String extractCookie(HttpServletRequest request, String name) {
		Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (name.equals(cookie.getName())) {
					return cookie.getValue();
				}
			}
		}
		return null;
	}

	private void deleteCookies(HttpServletResponse response) {
		deleteCookie(response, "refreshToken");
	}

	private void deleteCookie(HttpServletResponse response, String cookieName) {
		Cookie cookie = new Cookie(cookieName, null);
		cookie.setHttpOnly(true);
		cookie.setSecure(true);
		cookie.setPath("/");
		cookie.setMaxAge(0); // This will delete the cookie
		response.addCookie(cookie);
	}

	/*
	 * POSETILAC
	 */
	@PostMapping("/signupPosetilac")
	public ResponseEntity<?> registerPosetilac(@Validated @RequestBody PosetilacDTO posetilacDTO) {
		if (posetilacService.existsByEmail(posetilacDTO.getEmail())
				|| zaposleniService.existsByEmail(posetilacDTO.getEmail())) {
			logger.warn("USER_REGISTRATION_FAIL - Email " + posetilacDTO.getEmail() + " is already in use");
			return ResponseEntity.status(HttpStatus.CONFLICT).body("Error: Email is already in use!");
		}
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

		boolean hasRole = posetilacDetails.getAuthorities().stream().map(item -> item.getAuthority())
				.anyMatch(authority -> authority.equals(roleToCheck));

		// Log information and return response based on role presence
		if (hasRole) {
			logger.info("USER_LOGIN_SUCCESS - User with role '{}' logged in successfully", roleToCheck);
			return ResponseEntity.ok(new JwtResponse(jwt, refreshToken.getToken(), posetilacDetails.getId(),
					posetilacDetails.getEmail(), roleToCheck));
		} else {
			logger.info("USER_LOGIN_FAILURE - User with role '{}' not found", roleToCheck);
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
					.body("User with role '" + roleToCheck + "' not found.");
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

	@PostMapping("/refreshtoken")
	public ResponseEntity<?> refreshtoken(@Validated @RequestBody TokenRefreshRequest request) {
		String requestRefreshToken = request.getRefreshToken();

		// Find the refresh token in the database
		Optional<RefreshToken> optionalRefreshToken = refreshTokenService.findByToken(requestRefreshToken);

		if (optionalRefreshToken.isPresent()) {
			RefreshToken refreshToken = optionalRefreshToken.get();
			System.out.println("Usao je u prvi if " + optionalRefreshToken.get().getExpiryDate());
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
							verifiedToken.getZaposleni().getId(), email, verifiedToken.getZaposleni().getPassword(),
							null // Set appropriate authorities if needed
					);
					token = jwtUtils.generateJwtToken(zaposleniDetails);
				} else {
					if (Instant.now()
							.compareTo(optionalRefreshToken.get().getExpiryDate().minus(1, ChronoUnit.DAYS)) >= 0
							&& Instant.now().compareTo(optionalRefreshToken.get().getExpiryDate()) < 0) {
						System.out.println("Usao je u dobar if");
						RefreshToken refToken = optionalRefreshToken.get();
						String newAccessToken = "";
						RefreshToken newRefreshToken = new RefreshToken();
						if (refToken.getPosetilac() != null) {
							email = refToken.getPosetilac().getEmail();
							userType = "Posetilac";
							PosetilacDetailsImpl posetilacDetails = new PosetilacDetailsImpl(
									refToken.getPosetilac().getId(), email, refToken.getPosetilac().getPassword(),
									null);
							refreshTokenService.delete(refToken);
							newRefreshToken = refreshTokenService.createRefreshToken(email);
							newAccessToken = jwtUtils.generateJwtToken(posetilacDetails);
						}
						return ResponseEntity.ok(new TokenRefreshResponse(newAccessToken, newRefreshToken.getToken()));
					}

					System.out.println("Usao je u else");
					// Create a PosetilacDetailsImpl instance for the user
					PosetilacDetailsImpl posetilacDetails = new PosetilacDetailsImpl(
							verifiedToken.getPosetilac().getId(), email, verifiedToken.getPosetilac().getPassword(),
							null // Set appropriate authorities if needed
					);
					token = jwtUtils.generateJwtToken(posetilacDetails);
				}

				// Return a response with the new JWT token and the old refresh token
				return ResponseEntity.ok(new TokenRefreshResponse(token, requestRefreshToken));
			} else {
				System.out.println("Usao je u else kad refresh token ne postoji");
				throw new TokenRefreshException(requestRefreshToken, "Refresh token has expired!");
			}
		} else {
			System.out.println("Usao je u else kad refresh token ne postoji u bazi ");
			throw new TokenRefreshException(requestRefreshToken, "Refresh token is not in database!");
		}
	}

}

package com.opens.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opens.model.PasswordResetToken;
import com.opens.model.Posetilac;
import com.opens.model.RefreshToken;
import com.opens.repository.PasswordResetTokenRepository;
import com.opens.repository.PosetilacRepository;
import com.opens.security.service.PasswordResetService;

@RestController
@RequestMapping("/api/auth/password-reset")
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordResetController {
	
	@Autowired
	private PasswordResetService passwordResetService;
	
	@Autowired
	private PosetilacRepository posetilacRepo;
	
	@Autowired
	private PasswordResetTokenRepository resetRepo;
	
	@PostMapping("/request")
	public ResponseEntity<String> requestPasswordReset(@RequestParam String email) {
		
		passwordResetService.createPasswordResetTokenForUser(email);
		return ResponseEntity.ok("Email za resetovanje lozinke je poslat");
		
	}
	
	@PutMapping("/reset")
	public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
		
		try {
			passwordResetService.resetPassword(token, newPassword);
			return ResponseEntity.ok("Lozinka je uspesno promenjena");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}
}

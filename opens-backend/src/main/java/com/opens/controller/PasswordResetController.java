package com.opens.controller;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opens.security.service.PasswordResetService;

import jakarta.mail.MessagingException;
import jakarta.persistence.EntityNotFoundException;

@RestController
@RequestMapping("/api/auth/password-reset")
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordResetController {

	@Autowired
	private PasswordResetService passwordResetService;

	@PostMapping("/request")
	public ResponseEntity<String> requestPasswordReset(@RequestParam String email)
			throws UnsupportedEncodingException, MessagingException {
		try {
			passwordResetService.createPasswordResetTokenForUser(email);
			return ResponseEntity.ok("Email za resetovanje lozinke je poslat");
		} catch (EntityNotFoundException e) {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
		} catch (MessagingException | UnsupportedEncodingException e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
					.body("Desila se greska prilikom slanja email");
		}
	}

	@PutMapping("/reset")
	public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
		try {
			passwordResetService.resetPassword(token, newPassword);
			return ResponseEntity.ok("Lozinka je uspesno promenjena");
		} catch (IllegalArgumentException e) {
			if (e.getMessage().equals("Invalid or expired token.")) {
				return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
			}
			return ResponseEntity.badRequest().body(e.getMessage());
		}

	}
}

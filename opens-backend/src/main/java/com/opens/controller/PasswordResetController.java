package com.opens.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.opens.security.service.PasswordResetService;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:3000")
public class PasswordResetController {
	
	@Autowired
	private PasswordResetService passwordResetService;

	@PostMapping("/forgot-password")
	public ResponseEntity<String> forgotPassword(@RequestParam String email) {
		
		passwordResetService.createPasswordResetTokenForUser(email);
		return ResponseEntity.ok("If an account with the provided email exists, a password reset link will be sent.");
		
	}
	
//	@GetMapping("/ResetPassword")
//	public ResponseEntity<?> chengePassword(@RequestParam String token) {
//		
//	}
	
	@PostMapping("/reset-password")
	public ResponseEntity<String> resetPassword(@RequestParam String token, @RequestParam String newPassword) {
		
		try {
			passwordResetService.resetPassword(token, newPassword);
			return ResponseEntity.ok("Password reset successfully.");
		} catch (IllegalArgumentException e) {
			return ResponseEntity.badRequest().body(e.getMessage());
		}
		
	}
}

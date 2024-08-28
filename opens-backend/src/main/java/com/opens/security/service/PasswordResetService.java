package com.opens.security.service;

import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.opens.model.PasswordResetToken;
import com.opens.model.Posetilac;
import com.opens.model.Zaposleni;
import com.opens.repository.PasswordResetTokenRepository;
import com.opens.repository.PosetilacRepository;
import com.opens.repository.ZaposleniRepository;

@Service
public class PasswordResetService {

	@Autowired
	private ZaposleniRepository zaposleniRepo;
	
	@Autowired
	private PosetilacRepository posetilacRepo;
	
	@Autowired
	private PasswordResetTokenRepository tokenRepo;
	
	@Autowired
	private JavaMailSender mailSender;
	
	@Autowired
	PasswordEncoder encoder;
	
	public void createPasswordResetTokenForUser(String email) {
		
		// Find Zaposleni by email
	    Optional<Zaposleni> optionalZaposleni = zaposleniRepo.findByEmail(email);
	    Zaposleni zaposleni = optionalZaposleni.orElse(null);
	    
	    // Find Posetilac by email
	    Optional<Posetilac> optionalPosetilac = posetilacRepo.findByEmail(email);
	    Posetilac posetilac = optionalPosetilac.orElse(null);
		
		if(zaposleni != null || posetilac != null) {
			String token = UUID.randomUUID().toString();
			PasswordResetToken resetToken = new PasswordResetToken();
			resetToken.setToken(token);
			if(zaposleni != null) {
				resetToken.setZaposleni(zaposleni);
			} else {
				resetToken.setPosetilac(posetilac);
			}
			
			resetToken.setExpirationDate(LocalDateTime.now().plusHours(1)); // Token valid for 1 hour

            tokenRepo.save(resetToken);
            sendResetTokenEmail(email, token);
		}
	}
	
	private void sendResetTokenEmail(String email, String token) {
		SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(email);
        message.setSubject("Password Reset Request");
        message.setText("To reset your password, please click the link below:\n" +
                        "http://localhost:3000/ResetPassword?token=" + token);
	}
	
	public void resetPassword(String token, String newPassword) {
		PasswordResetToken resetToken = tokenRepo.findByToken(token);
		
		if(resetToken == null || resetToken.getExpirationDate().isBefore(LocalDateTime.now())) {
			throw new IllegalArgumentException("Invalid or expired token.");
		}
		
		if(resetToken.getZaposleni() != null) {
			Zaposleni zaposleni = resetToken.getZaposleni();
			zaposleni.setPassword(encoder.encode(newPassword));
			zaposleniRepo.save(zaposleni);
		} else if(resetToken.getPosetilac() != null) {
			Posetilac posetilac = resetToken.getPosetilac();
			posetilac.setPassword(encoder.encode(newPassword));
			posetilacRepo.save(posetilac);
		}
		
		tokenRepo.delete(resetToken);
	}
}

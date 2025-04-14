package com.opens.security.service;

import java.io.UnsupportedEncodingException;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.core.io.ClassPathResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.opens.model.PasswordResetToken;
import com.opens.model.Posetilac;
import com.opens.model.Zaposleni;
import com.opens.repository.PasswordResetTokenRepository;
import com.opens.repository.PosetilacRepository;
import com.opens.repository.ZaposleniRepository;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.persistence.EntityNotFoundException;

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

	@Autowired
	private Environment environment;

	//Za posetioca
	public void createPasswordResetTokenForUser(String email) throws MessagingException, UnsupportedEncodingException {

		Optional<Posetilac> optionalPosetilac = posetilacRepo.findByEmail(email);
		Posetilac posetilac = optionalPosetilac.orElse(null);

		if (posetilac == null) {
			throw new EntityNotFoundException("Email nije pronadjen ni medju zaposlenim ni medju poseticima");
		}
		String token;
		PasswordResetToken resetToken = new PasswordResetToken();
		if (posetilac != null) {
//			token = UUID.randomUUID().toString();
			token = UUID.randomUUID().toString().replace("-", "").substring(0, 8);
			resetToken.setToken(token);
			resetToken.setPosetilac(posetilac);
			sendResetTokenEmail(email, token);
		}
		resetToken.setExpirationDate(LocalDateTime.now().plusHours(1));
		tokenRepo.save(resetToken);
	}
	
	public void createPasswordResetTokenForZaposleni(String email) throws MessagingException, UnsupportedEncodingException {
		// Find Zaposleni by email
		Optional<Zaposleni> optionalZaposleni = zaposleniRepo.findByEmail(email);
		Zaposleni zaposleni = optionalZaposleni.orElse(null);
		System.out.println("Zaposleni email je: " + zaposleni);
		
		if (zaposleni == null) {
			throw new EntityNotFoundException("Email nije pronadjen medju zaposlenima");
		}
		String token;
		PasswordResetToken resetToken = new PasswordResetToken();
		
		if (zaposleni != null) {
			token = UUID.randomUUID().toString();
			resetToken.setToken(token);
			resetToken.setZaposleni(zaposleni);
			sendResetTokenEmailZaposleni(email, token);
		}
		
		resetToken.setExpirationDate(LocalDateTime.now().plusHours(1));
		tokenRepo.save(resetToken);
	}

	private void sendResetTokenEmail(String email, String token) throws MessagingException, UnsupportedEncodingException {

		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);
		String htmlContent = "<html><body>"
				+ "<p>Da biste resetovali svoju lozinku, molimo Vas da koristite sledeći token:</p>"
				+ "<div style='font-size: 15px; font-weight: bold; color: #007BFF;'>" + token + "</div>"
				+ "<p>Ako niste tražili resetovanje lozinke, molimo Vas da ignorišete ovaj email.</p>"
				+ "<hr style='width: 50%; border: 1px solid #ccc; margin: 20px 0; align: left;' />"
				+ "<p>To reset your password, please use the following token:</p>"
				+ "<div style='font-size: 15px; font-weight: bold; color: #007BFF;'>" + token + "</div>"
				+ "<p>If you did not request a password reset, please ignore this email.</p>"
				+ "<div style='margin-top: 20px; padding: 10px; color: #999; font-size: 14px;'>"
				+ "<p style='margin: 0;'>OPENS</p>" + "<p style='margin: 0;'>Bulevar despota Stefana 5</p>"
				+ "<p style='margin: 0;'>21000 Novi Sad</p>" + "<p style='margin: 0;'>PIB: 109499809</p>"
				+ "<p style='margin: 0;'>MB: 28202717</p>"
				+ "<p style='margin: 0;'><a href='https://www.opens.rs'>opens.rs</a></p>"
				+ "<p style='margin: 0;'>@opens2019</p>" + "</div>" + "<footer style='margin-top: 30px;'>"
				+ "<img src='cid:footerImage' alt='Footer Image' style='width: 100%; max-width: 800px;' />"
				+ "</footer>" + "</body></html>";

		helper.setTo(email);
		helper.setFrom(environment.getProperty("spring.mail.username"), "OPENS");
		helper.setSubject("Zahtev za resetovanje lozinke / Password reset request ");
		helper.setText(htmlContent, true);

		helper.addInline("footerImage", new ClassPathResource("images/OPENS footer.png"));

		mailSender.send(message);

	}

	private void sendResetTokenEmailZaposleni(String email, String token) throws MessagingException, UnsupportedEncodingException {
		
		MimeMessage message = mailSender.createMimeMessage();
		MimeMessageHelper helper = new MimeMessageHelper(message, true);

		String htmlContent = "<html><body>"
				+ "<p>Da biste resetovali svoju lozinku, molimo Vas kliknite na sledeći link:</p>"
				+ "<div style='font-size: 15px; font-weight: bold; color: #007BFF;'>"
				+ "<a href='http://localhost:3000/reset-password?token=" + token + "'>"
				+ "Resetujte svoju lozinku</a></div>"
				+ "<p>Ako niste tražili resetovanje lozinke, molimo Vas da ignorišete ovaj email.</p>"
				+ "<div style='margin-top: 20px; padding: 10px; color: #999; font-size: 14px;'>"
				+ "<p style='margin: 0;'>OPENS</p>" + "<p style='margin: 0;'>Bulevar despota Stefana 5</p>"
				+ "<p style='margin: 0;'>21000 Novi Sad</p>" + "<p style='margin: 0;'>PIB: 109499809</p>"
				+ "<p style='margin: 0;'>MB: 28202717</p>"
				+ "<p style='margin: 0;'><a href='https://www.opens.rs'>opens.rs</a></p>"
				+ "<p style='margin: 0;'>@opens2019</p>" + "</div>" + "<footer style='margin-top: 30px;'>"
				+ "<img src='cid:footerImage' alt='Footer Image' style='width: 100%; max-width: 800px;' />"
				+ "</footer>" + "</body></html>";

		helper.setTo(email);
		helper.setFrom(environment.getProperty("spring.mail.username"), "OPENS");
		helper.setSubject("Zahtev za resetovanje lozinke");
		helper.setText(htmlContent, true); // Set to true to send HTML email

		// Embed the image
		helper.addInline("footerImage", new ClassPathResource("images/OPENS footer.png"));

		mailSender.send(message);
	}

	public void resetPassword(String token, String newPassword) {
		PasswordResetToken resetToken = tokenRepo.findByToken(token);

		if (resetToken == null || resetToken.getExpirationDate().isBefore(LocalDateTime.now())) {
			throw new IllegalArgumentException("Invalid or expired token.");
		}

		if (resetToken.getZaposleni() != null) {
			Zaposleni zaposleni = resetToken.getZaposleni();
			zaposleni.setPassword(encoder.encode(newPassword));
			zaposleniRepo.save(zaposleni);
		} else if (resetToken.getPosetilac() != null) {
			Posetilac posetilac = resetToken.getPosetilac();
			posetilac.setPassword(encoder.encode(newPassword));
			posetilacRepo.save(posetilac);
		}

		tokenRepo.delete(resetToken);
	}
}

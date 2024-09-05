package com.opens.security.service;

import java.time.Instant;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.opens.model.Posetilac;
import com.opens.model.RefreshToken;
import com.opens.model.Zaposleni;
import com.opens.repository.PosetilacRepository;
import com.opens.repository.RefreshTokenRepository;
import com.opens.repository.ZaposleniRepository;
import com.opens.security.TokenRefreshException;

@Service
public class RefreshTokenService {

	@Value("${opens.jwtRefreshExpirationMs}")
	private Long refreshTokenDurationMs;
	
	@Autowired
	private RefreshTokenRepository refreshRepository;
	
	@Autowired
	private ZaposleniRepository zaposleniRepo;
	
	@Autowired
	private PosetilacRepository posetilacRepo;
	
	public Optional<RefreshToken> findByToken(String token) {
		
		return refreshRepository.findByToken(token);
	}
	
	public RefreshToken createRefreshToken(String email) {
		Optional<Zaposleni> zaposleniOptional = zaposleniRepo.findByEmail(email);
	    Optional<Posetilac> posetilacOptional = posetilacRepo.findByEmail(email);
	    
	    RefreshToken refreshToken = new RefreshToken();
	    
	    if (zaposleniOptional.isPresent()) {
	        Zaposleni zaposleni = zaposleniOptional.get();
	        refreshToken.setZaposleni(zaposleni);
	    } else if (posetilacOptional.isPresent()) {
	        Posetilac posetilac = posetilacOptional.get();
	        refreshToken.setPosetilac(posetilac);
	    } else {
	        // Handle the case when no user is found for the given email
	        throw new IllegalArgumentException("Ne postoji korisnik sa unetom e-amil adresom: " + email);
	    }
	    
	    refreshToken.setExpiryDate(Instant.now().plusMillis(refreshTokenDurationMs));
	    refreshToken.setToken(UUID.randomUUID().toString());
	    
	    return refreshRepository.save(refreshToken);
	}
	
	public RefreshToken verifyExpiration(RefreshToken token) {
	    if (token.getExpiryDate().compareTo(Instant.now()) < 0) {
	      refreshRepository.delete(token);
	      throw new TokenRefreshException(token.getToken(), "Refresh token was expired. Please make a new signin request");
	    }

	    return token;
	  }
	
	public void delete(RefreshToken refreshToken) {
        refreshRepository.delete(refreshToken);
    }
	
	@Transactional
	  public int deleteByZaposleni(String email) {
	    return refreshRepository.deleteByZaposleni(zaposleniRepo.findByEmail(email).get());
	  }
	
	@Transactional
	  public int deleteByPosetilac(String email) {
	    return refreshRepository.deleteByPosetilac(posetilacRepo.findByEmail(email).get());
	  }
}

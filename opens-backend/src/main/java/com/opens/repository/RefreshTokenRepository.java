package com.opens.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Repository;

import com.opens.model.Posetilac;
import com.opens.model.RefreshToken;
import com.opens.model.Zaposleni;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshToken, Long> {

	Optional<RefreshToken> findByToken(String token);
	
	@Modifying
	int deleteByZaposleni(Zaposleni zaposleni);
	
	@Modifying
	int deleteByPosetilac(Posetilac posetilac);
}

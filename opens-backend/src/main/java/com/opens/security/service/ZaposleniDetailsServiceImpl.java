package com.opens.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.opens.model.Zaposleni;
import com.opens.repository.ZaposleniRepository;

@Service
public class ZaposleniDetailsServiceImpl implements UserDetailsService {

	@Autowired
	ZaposleniRepository zaposleniRepo;
	
	@Override
	@Transactional
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		Zaposleni zaposleni = zaposleniRepo.findByEmail(email)
				.orElseThrow(() -> new UsernameNotFoundException("Korisnik čiji je email: " + email + " nije pronađen."));
		
		return ZaposleniDetailsImpl.build(zaposleni);
	}

}

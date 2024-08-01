package com.opens.security.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomeDetailsService implements UserDetailsService {
	
	@Autowired
    private ZaposleniDetailsServiceImpl zaposleniDetailsService;

    @Autowired
    private PosetilacDetailsServiceImpl posetilacDetailsService;

	@Override
	public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
		// TODO Auto-generated method stub
		UserDetails userDetails = null;
        try {
            userDetails = zaposleniDetailsService.loadUserByUsername(email);
        } catch (UsernameNotFoundException e) {
            // If user is not found, continue to try loading from PosetilacDetailsService
            // Logging for debug purposes
            System.out.println("User not found in ZaposleniDetailsService, trying PosetilacDetailsService.");
        }
        
        if (userDetails == null) {
        	System.out.println("Usao je u if posetilac");
        	System.out.println("Userdetails pre load: " + userDetails);
            userDetails = posetilacDetailsService.loadUserByUsername(email);
            System.out.println("Userdetails posle load: " + userDetails);
        }

        // If userDetails is still null, throw an exception
        if (userDetails == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        
        return userDetails;
	}

	
}

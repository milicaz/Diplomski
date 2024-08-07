package com.opens.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import com.opens.security.jwt.AuthEntryPointJwt;
import com.opens.security.jwt.AuthTokenFilter;
import com.opens.security.service.CustomeDetailsService;
import com.opens.security.service.PosetilacDetailsServiceImpl;
import com.opens.security.service.ZaposleniDetailsServiceImpl;

@Configuration
@EnableMethodSecurity
public class WebSecurityConfig {
	
	@Autowired
	private AuthEntryPointJwt unauthorizedHandler;
	
	@Autowired
	ZaposleniDetailsServiceImpl zaposleniDetailsService;
	
	@Autowired
	PosetilacDetailsServiceImpl posetilacDetailsService;
	
	@Autowired
    private CustomeDetailsService customeDetailsService;
	
	
	@Bean
	public AuthTokenFilter authenticationJwtTokenFilter() {
	    return new AuthTokenFilter();
	  }
	
	
	@Bean
	public DaoAuthenticationProvider authenticationProvider() {
		
		DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
		
//		authProvider.setUserDetailsService(zaposleniDetailsService);
		authProvider.setUserDetailsService(customeDetailsService);
		authProvider.setPasswordEncoder(PasswordEncoder());
		
		return authProvider;
		
	}
	
	@Bean
	public AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig) throws Exception {
	    return authConfig.getAuthenticationManager();
	  }
	
	@Bean
	public PasswordEncoder PasswordEncoder() {
		
		return new BCryptPasswordEncoder();
	}
	
	@Bean
	public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
		http.csrf(csrf -> csrf.disable())
		.exceptionHandling(exception -> exception.authenticationEntryPoint(unauthorizedHandler))
		.sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
		.authorizeHttpRequests(auth -> 
//			auth.requestMatchers("/api/auth/**").permitAll()
			auth.requestMatchers("/api/**").permitAll()
//            .requestMatchers("/api/test/**").permitAll()
            .anyRequest().authenticated()
		);
		
		http.authenticationProvider(authenticationProvider());
		
		http.addFilterBefore(authenticationJwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
		
		return http.build();
		
	}
}

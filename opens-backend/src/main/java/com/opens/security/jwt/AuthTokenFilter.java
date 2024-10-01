package com.opens.security.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.opens.security.service.PosetilacDetailsServiceImpl;
import com.opens.security.service.ZaposleniDetailsServiceImpl;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class AuthTokenFilter extends OncePerRequestFilter {

	@Autowired
	private JwtUtils jwtUtils;

	@Autowired
	private ZaposleniDetailsServiceImpl zaposleniDetailsService;

	@Autowired
	private PosetilacDetailsServiceImpl posetilacDetailsService;

	private static final Logger logger = LoggerFactory.getLogger(AuthTokenFilter.class);

	@Override
	protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
			throws ServletException, IOException {
		try {
			String jwt = parseJwt(request);
			if (jwt != null && jwtUtils.validateJwtToken(jwt)) {
				String email = jwtUtils.getEmailFromJwtToken(jwt);
				String userType = jwtUtils.getClaimFromJwtToken(jwt, "userType");

//				UserDetails userDetails = zaposleniDetailsService.loadUserByUsername(email);
//				UserDetails userDetails = null;
				UserDetails userDetails;
				System.out.println("Jeste ili nije: " + "Zaposleni".equals(userType));
				if ("Zaposleni".equals(userType)) {
					System.out.println("Usao je u if");
					userDetails = zaposleniDetailsService.loadUserByUsername(email);
					System.out.println("Korisnik je Zaposleni.");
				} else if ("Posetilac".equals(userType)) {
					System.out.println("Usao je u else if");
					userDetails = posetilacDetailsService.loadUserByUsername(email);
					System.out.println("Korisnik je Posetilac.");
				} else {
					throw new RuntimeException("Unknown user type");
				}

				UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
						userDetails, null, userDetails.getAuthorities());
				authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

				SecurityContextHolder.getContext().setAuthentication(authentication);
			}
		} catch (Exception e) {
			logger.error("Cannot set user authentication: {}", e);
		}

		filterChain.doFilter(request, response);

	}

	private String parseJwt(HttpServletRequest request) {
		String headerAuth = request.getHeader("Authorization");

		if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
			return headerAuth.substring(7);
		} else {
			logger.warn("No JWT token found in request headers");
			return null;
		}
	}

}

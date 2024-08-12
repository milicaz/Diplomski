package com.opens.security.response;

import java.util.List;

public class JwtResponse {
	
	private String token;
	private String type = "Bearer";
	private String refreshToken;
	private Long id;
	private String email;
	private List<String> roles;
	private String uloga;
	
	
	public JwtResponse(String accessToken, String refreshToken, Long id, String email, List<String> roles) {
		super();
		this.token = accessToken;
		this.refreshToken = refreshToken;
		this.id = id;
		this.email = email;
		this.roles = roles;
	}
	
	


	public JwtResponse(String accessToken, String refreshToken, Long id, String email, String uloga) {
		super();
		this.token = accessToken;
		this.refreshToken = refreshToken;
		this.id = id;
		this.email = email;
		this.uloga = uloga;
	}




	public String getAccessToken() {
		return token;
	}


	public void setAccessToken(String accessToken) {
		this.token = accessToken;
	}


	public String getTokenType() {
		return type;
	}


	public void setTokenType(String tokenType) {
		this.type = tokenType;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public List<String> getRoles() {
		return roles;
	}


	public void setRoles(List<String> roles) {
		this.roles = roles;
	}




	public String getUloga() {
		return uloga;
	}




	public void setUloga(String uloga) {
		this.uloga = uloga;
	}




	public String getRefreshToken() {
		return refreshToken;
	}




	public void setRefreshToken(String refreshToken) {
		this.refreshToken = refreshToken;
	}

}

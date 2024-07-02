package com.opens.security.service;

import java.util.Collection;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.opens.model.Zaposleni;

public class ZaposleniDetailsImpl implements UserDetails {
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String email;
	
	@JsonIgnore
	private String password;
	
	private Collection<? extends GrantedAuthority> authorities;
	
	

	public ZaposleniDetailsImpl(Long id, String email, String password,
			Collection<? extends GrantedAuthority> authorities) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
	}
	
	public static ZaposleniDetailsImpl build(Zaposleni zaposleni) {
		List<GrantedAuthority> authorities = zaposleni.getUloge().stream()
				.map(uloga -> new SimpleGrantedAuthority(uloga.getNaziv().name()))
				.collect(Collectors.toList());
		
		return new ZaposleniDetailsImpl(zaposleni.getId(), zaposleni.getEmail(), zaposleni.getPassword(), authorities);
		
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		
		return true;
	}

	@Override
	public boolean isEnabled() {
		
		return true;
	}
	
	@Override
	public boolean equals(Object o) {
		if(this == o)
			return true;
		if(o == null || getClass() != o.getClass())
			return false;
		ZaposleniDetailsImpl zaposleni = (ZaposleniDetailsImpl) o;
		return Objects.equals(id, zaposleni.id);
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

	public void setPassword(String password) {
		this.password = password;
	}

	public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
		this.authorities = authorities;
	}
	
	

}

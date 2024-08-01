package com.opens.security.service;

import java.util.Collection;
import java.util.Collections;
import java.util.Objects;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.opens.model.Posetilac;

public class PosetilacDetailsImpl implements UserDetails {
	
	private static final long serialVersionUID = 1L;
	
	private Long id;
	
	private String email;
	
	@JsonIgnore
	private String password;
	
	private Collection<? extends GrantedAuthority> authorities;
	
	

	public PosetilacDetailsImpl(Long id, String email, String password,
			Collection<? extends GrantedAuthority> authorities) {
		super();
		this.id = id;
		this.email = email;
		this.password = password;
		this.authorities = authorities;
	}
	
	public static PosetilacDetailsImpl build(Posetilac posetilac) {
	    // Create a single granted authority if only one Uloga
	    GrantedAuthority authority = new SimpleGrantedAuthority(posetilac.getUloga().getNaziv().name());
	    
	    // Return the PosetilacDetailsImpl instance with the single authority
	    return new PosetilacDetailsImpl(
	    		posetilac.getId(),
	            posetilac.getEmail(),
	            posetilac.getPassword(),
	            Collections.singletonList(authority)
	    );
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return authorities;
	}

	@Override
	public String getPassword() {
		// TODO Auto-generated method stub
		return password;
	}

	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return email;
	}

	@Override
	public boolean isAccountNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		// TODO Auto-generated method stub
		return true;
	}

	@Override
	public boolean isEnabled() {
		// TODO Auto-generated method stub
		return true;
	}
	
	@Override
	public boolean equals(Object o) {
		if(this == o)
			return true;
		if(o == null || getClass() != o.getClass())
			return false;
		PosetilacDetailsImpl posetilac = (PosetilacDetailsImpl) o;
		return Objects.equals(id, posetilac.id);
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

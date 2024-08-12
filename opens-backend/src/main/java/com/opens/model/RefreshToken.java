package com.opens.model;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity(name = "refreshtoken")
public class RefreshToken {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(nullable = false, unique = true)
	private String token;
	
	@Column(nullable = false)
	private Instant expiryDate;
	
	@OneToOne
	@JoinColumn(name = "zaposleni_id", referencedColumnName = "id")
	private Zaposleni zaposleni;
	
	@OneToOne
	@JoinColumn(name = "posetilac_id", referencedColumnName = "id")
	private Posetilac posetilac;

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Instant getExpiryDate() {
		return expiryDate;
	}

	public void setExpiryDate(Instant expiryDate) {
		this.expiryDate = expiryDate;
	}

	public Zaposleni getZaposleni() {
		return zaposleni;
	}

	public void setZaposleni(Zaposleni zaposleni) {
		this.zaposleni = zaposleni;
	}

	public Posetilac getPosetilac() {
		return posetilac;
	}

	public void setPosetilac(Posetilac posetilac) {
		this.posetilac = posetilac;
	}
	
	
	
	
}

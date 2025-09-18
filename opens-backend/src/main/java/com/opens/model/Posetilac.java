package com.opens.model;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "posetioci")
public class Posetilac extends Korisnik {

	@Column(name = "password")
	private String password;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "uloga_id")
	private Uloga uloga;

	@Column(nullable = false)
	private boolean deleted = false;

	public Posetilac() {
	}

	public Posetilac(String ime, String prezime, Rod rod, Integer godine, String mestoBoravista, String brojTelefona,
			String email, String password, Uloga uloga) {
		super(ime, prezime, rod, godine, mestoBoravista, brojTelefona, email);
		this.password = password;
		this.uloga = uloga;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Uloga getUloga() {
		return uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

}

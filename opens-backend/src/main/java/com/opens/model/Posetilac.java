package com.opens.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "posetioci")
public class Posetilac extends Korisnik {

	@Column(name = "prava_poseta")
	private Boolean prvaPoseta;

	public Posetilac() {
		super();
	}

	public Posetilac(String ime, String prezime, Rod rod, Integer godine, String mestoBoravista, String brojTelefona,
			String email, Boolean prvaPoseta) {
		super(ime, prezime, rod, godine, mestoBoravista, brojTelefona, email);
		this.prvaPoseta = prvaPoseta;
	}

	public Boolean getPrvaPoseta() {
		return prvaPoseta;
	}

	public void setPrvaPoseta(Boolean prvaPoseta) {
		this.prvaPoseta = prvaPoseta;
	}

}

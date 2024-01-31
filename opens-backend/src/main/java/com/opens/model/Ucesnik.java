package com.opens.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;

@Entity
@Table(name = "ucesnici")
public class Ucesnik extends Korisnik {
	
	@Column(name = "organizacija")
	private String organizacija;

	public Ucesnik() {
		super();
	}

	public Ucesnik(String ime, String prezime, Rod rod, Integer godine, String mestoBoravista, String brojTelefona,
			String email, String organizacija) {
		super(ime, prezime, rod, godine, mestoBoravista, brojTelefona, email);
		this.organizacija = organizacija;
	}

	public String getOrganizacija() {
		return organizacija;
	}

	public void setOrganizacija(String organizacija) {
		this.organizacija = organizacija;
	}
	
	
	
	

}

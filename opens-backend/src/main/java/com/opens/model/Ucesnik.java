package com.opens.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "ucesnici")
public class Ucesnik extends Korisnik {
	
	@Column(name = "organizacija")
	private String organizacija;
	
	@ManyToMany
	@JoinTable(
		name = "ucesnici_dogadjaji",
		joinColumns = @JoinColumn(name = "ucesnik_id"),
		inverseJoinColumns = @JoinColumn(name = "dogadjaj_id"))
	@JsonIgnore
	private Set<Dogadjaj> dogadjaji = new HashSet<>();

	public Ucesnik() {
		super();
		// TODO Auto-generated constructor stub
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

	public Set<Dogadjaj> getDogadjaji() {
		return dogadjaji;
	}

	public void setDogadjaji(Set<Dogadjaj> dogadjaji) {
		this.dogadjaji = dogadjaji;
	}
	
	

}

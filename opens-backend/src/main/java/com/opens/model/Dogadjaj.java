package com.opens.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "dogadjaji")
public class Dogadjaj {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "naziv")
	private String naziv;
	
	@Column(name = "datum")
	private LocalDate datum;
	
	@Column(name = "pocetak_dogadjaja")
	private LocalTime pocetakDogadjaja;
	
	@Column(name = "kraj_dogadjaja")
	private LocalTime krajDogadjaja;
	
	@OneToOne
	@JoinColumn(name = "mesto_dogadjaja_id")
	private MestoDogadjaja mesto;
	
	@OneToOne
	@JoinColumn(name = "vrsta_dogadjaja_id")
	private TipDogadjaja vrsta;
	
	@ManyToOne
	@JoinColumn(name = "organizacija_id", nullable = false)
	private Organizacija organizacija;

	public Dogadjaj() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Dogadjaj(String naziv, LocalDate datum, LocalTime pocetakDogadjaja, LocalTime krajDogadjaja,
			MestoDogadjaja mesto, TipDogadjaja vrsta) {
		super();
		this.naziv = naziv;
		this.datum = datum;
		this.pocetakDogadjaja = pocetakDogadjaja;
		this.krajDogadjaja = krajDogadjaja;
		this.mesto = mesto;
		this.vrsta = vrsta;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getNaziv() {
		return naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public LocalDate getDatum() {
		return datum;
	}

	public void setDatum(LocalDate datum) {
		this.datum = datum;
	}

	public LocalTime getPocetakDogadjaja() {
		return pocetakDogadjaja;
	}

	public void setPocetakDogadjaja(LocalTime pocetakDogadjaja) {
		this.pocetakDogadjaja = pocetakDogadjaja;
	}

	public LocalTime getKrajDogadjaja() {
		return krajDogadjaja;
	}

	public void setKrajDogadjaja(LocalTime krajDogadjaja) {
		this.krajDogadjaja = krajDogadjaja;
	}

	public MestoDogadjaja getMesto() {
		return mesto;
	}

	public void setMesto(MestoDogadjaja mesto) {
		this.mesto = mesto;
	}

	public TipDogadjaja getVrsta() {
		return vrsta;
	}

	public void setVrsta(TipDogadjaja vrsta) {
		this.vrsta = vrsta;
	}

	public Organizacija getOrganizacija() {
		return organizacija;
	}

	public void setOrganizacija(Organizacija organizacija) {
		this.organizacija = organizacija;
	}

}

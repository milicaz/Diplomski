package com.opens.model;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "dogadjaji")
public class Dogadjaj {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "id", unique = true)
	private Long id;

	@Column(name = "naziv")
	private String naziv;

	@Column(name = "datum")
	@Temporal(TemporalType.DATE)
	private LocalDate datum;

	@Column(name = "pocetak_dogadjaja")
	@Temporal(TemporalType.TIME)
	private LocalTime pocetakDogadjaja;

	@Column(name = "kraj_dogadjaja")
	@Temporal(TemporalType.TIME)
	private LocalTime krajDogadjaja;

//	@OneToOne(cascade = CascadeType.ALL)
//	@PrimaryKeyJoinColumn
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "mesto_id")
	private MestoDogadjaja mesto;

//	@OneToOne(cascade = CascadeType.ALL)
//	@PrimaryKeyJoinColumn
	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "vrsta_id")
	private TipDogadjaja vrsta;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "organizacija_id")
	private Organizacija organizacija;

	@ManyToMany(mappedBy = "dogadjaji")
	private Set<Ucesnik> ucesnici;

	@Column(nullable = false)
	private boolean deleted = false;

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

	public Set<Ucesnik> getUcesnici() {
		return ucesnici;
	}

	public void setUcesnici(Set<Ucesnik> ucesnici) {
		this.ucesnici = ucesnici;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}

}

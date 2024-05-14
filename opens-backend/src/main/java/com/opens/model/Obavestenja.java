package com.opens.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
@Table(name = "obavestenja")
public class Obavestenja {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(name = "naziv")
	private String naziv;

	@Lob
	@Column(name = "tekst", columnDefinition = "TEXT")
	private String tekst;

	@Column(name = "pocetak_prikazivanja")
	@Temporal(TemporalType.DATE)
	private LocalDate pocetakPrikazivanja;

	@Column(name = "kraj_prikazivanja")
	@Temporal(TemporalType.DATE)
	private LocalDate krajPrikazivanja;

	public Obavestenja() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Obavestenja(String naziv, String tekst, LocalDate pocetakPrikazivanja, LocalDate krajPrikazivanja) {
		super();
		this.naziv = naziv;
		this.tekst = tekst;
		this.pocetakPrikazivanja = pocetakPrikazivanja;
		this.krajPrikazivanja = krajPrikazivanja;
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

	public String getTekst() {
		return tekst;
	}

	public void setTekst(String tekst) {
		this.tekst = tekst;
	}

	public LocalDate getPocetakPrikazivanja() {
		return pocetakPrikazivanja;
	}

	public void setPocetakPrikazivanja(LocalDate pocetakPrikazivanja) {
		this.pocetakPrikazivanja = pocetakPrikazivanja;
	}

	public LocalDate getKrajPrikazivanja() {
		return krajPrikazivanja;
	}

	public void setKrajPrikazivanja(LocalDate krajPrikazivanja) {
		this.krajPrikazivanja = krajPrikazivanja;
	}

}

package com.opens.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "organizacije")
public class Organizacija {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "naziv")
	private String naziv;
	
	@Column(name = "odgovorna_osoba")
	private String odgovornaOsoba;
	
	@Column(name = "broj_telefona")
	private String brojTelefona;
	
	@Column(name = "email")
	private String email;
	
	@Column(name = "delatnost")
	private String delatnost;
	
	@Column(name = "opis")
	private String opis;
	
	@Column(name = "link")
	private String link;
	

	public Organizacija() {
		super();
		// TODO Auto-generated constructor stub
	}

	public Organizacija(String naziv, String odgovornaOsoba, String brojTelefona, String email, String delatnost,
			String opis, String link) {
		super();
		this.naziv = naziv;
		this.odgovornaOsoba = odgovornaOsoba;
		this.brojTelefona = brojTelefona;
		this.email = email;
		this.delatnost = delatnost;
		this.opis = opis;
		this.link = link;
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

	public String getOdgovornaOsoba() {
		return odgovornaOsoba;
	}

	public void setOdgovornaOsoba(String odgovornaOsoba) {
		this.odgovornaOsoba = odgovornaOsoba;
	}

	public String getBrojTelefona() {
		return brojTelefona;
	}

	public void setBrojTelefona(String brojTelefona) {
		this.brojTelefona = brojTelefona;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getDelatnost() {
		return delatnost;
	}

	public void setDelatnost(String delatnost) {
		this.delatnost = delatnost;
	}

	public String getOpis() {
		return opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}
	
	

}

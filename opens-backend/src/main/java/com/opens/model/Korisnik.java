package com.opens.model;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.MappedSuperclass;

@MappedSuperclass
public abstract class Korisnik {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name = "ime")
	private String ime;
	@Column(name = "prezime")
	private String prezime;
	@Enumerated(EnumType.STRING)
	@Column(name = "rod")
	private Rod rod;
	@Column(name = "godine")
	private Integer godine;
	@Column(name = "mesto_boravista")
	private String mestoBoravista;
	@Column(name = "broj_telefona")
	private String brojTelefona;
	@Column(name = "email")
	private String email;

	public Korisnik() {

	}

	public Korisnik(String ime, String prezime, Rod rod, Integer godine, String mestoBoravista, String brojTelefona,
			String email) {

		this.ime = ime;
		this.prezime = prezime;
		this.rod = rod;
		this.godine = godine;
		this.mestoBoravista = mestoBoravista;
		this.brojTelefona = brojTelefona;
		this.email = email;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getIme() {
		return ime;
	}

	public void setIme(String ime) {
		this.ime = ime;
	}

	public String getPrezime() {
		return prezime;
	}

	public void setPrezime(String prezime) {
		this.prezime = prezime;
	}

	public Rod getRod() {
		return rod;
	}

	public void setRod(Rod rod) {
		this.rod = rod;
	}

	public Integer getGodine() {
		return godine;
	}

	public void setGodine(Integer godine) {
		this.godine = godine;
	}

	public String getMestoBoravista() {
		return mestoBoravista;
	}

	public void setMestoBoravista(String mestoBoravista) {
		this.mestoBoravista = mestoBoravista;
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

}

package com.opens.dto;

import com.opens.model.Rod;
import com.opens.model.Uloga;

public class PosetilacDTO {
	
	private String email;
	private String password;
	private String ime;
	private String prezime;
	private Rod rod;
	private Integer godine;
	private String mestoBoravista;
	private String brojTelefona;
	private Uloga uloga;
	
	public PosetilacDTO() {
		
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public Uloga getUloga() {
		return uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

	
}

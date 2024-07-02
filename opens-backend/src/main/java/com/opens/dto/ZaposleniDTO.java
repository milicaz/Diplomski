package com.opens.dto;

import java.util.HashSet;
import java.util.Set;

import com.opens.model.Rod;

public class ZaposleniDTO {
	
	private String email;
	private String password;
	private String ime;
	private String prezime;
	private Rod rod;
	private Integer godine;
	private String mestoBoravista;
	private String brojTelefon;
	private Set<String> uloge = new HashSet<>();
	
	public ZaposleniDTO() {
		
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

	public String getBrojTelefon() {
		return brojTelefon;
	}

	public void setBrojTelefon(String brojTelefon) {
		this.brojTelefon = brojTelefon;
	}

	public Set<String> getUloge() {
		return uloge;
	}

	public void setUloge(Set<String> uloge) {
		this.uloge = uloge;
	}

}

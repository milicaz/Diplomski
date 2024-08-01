package com.opens.dto;

public class PosetilacEditDTO {
	
	private String ime;
	private String prezime;
	private String email;
	private Integer godine;
	private String mestoBoravista;
	private String brojTelefona;
	private byte[] profileImage;

	public PosetilacEditDTO() {
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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
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

	public byte[] getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(byte[] profileImage) {
		this.profileImage = profileImage;
	}

}

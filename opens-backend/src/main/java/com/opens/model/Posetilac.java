package com.opens.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;

@Entity
@Table(name = "posetioci")
public class Posetilac extends Korisnik {

	@Column(name = "password")
	private String password;

	@Lob
	@Column(name = "profile_image", length = Integer.MAX_VALUE)
	private byte[] profileImage;

	public Posetilac() {
		super();
	}

	public Posetilac(String ime, String prezime, Rod rod, Integer godine, String mestoBoravista, String brojTelefona,
			String email, String password, byte[] profileImage) {
		super(ime, prezime, rod, godine, mestoBoravista, brojTelefona, email);
		this.password = password;
		this.profileImage = profileImage;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public byte[] getProfileImage() {
		return profileImage;
	}

	public void setProfileImage(byte[] profileImage) {
		this.profileImage = profileImage;
	}

}

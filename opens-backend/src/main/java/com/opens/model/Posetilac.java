package com.opens.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "posetioci")
public class Posetilac extends Korisnik {

	@Column(name = "password")
	private String password;

//	@Lob
//	@Column(name = "profile_image", length = Integer.MAX_VALUE)
//	private byte[] profileImage;

	@ManyToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "uloga_id")
	private Uloga uloga;

	@OneToOne(mappedBy = "posetilac", cascade = CascadeType.ALL, orphanRemoval = true)
	@JsonIgnore
	private ProfilnaSlika profilnaSlika;

	public Posetilac() {
		super();
	}

	public Posetilac(String ime, String prezime, Rod rod, Integer godine, String mestoBoravista, String brojTelefona,
			String email, String password, Uloga uloga) {
		super(ime, prezime, rod, godine, mestoBoravista, brojTelefona, email);
		this.password = password;
		this.uloga = uloga;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

//	public byte[] getProfileImage() {
//		return profileImage;
//	}
//
//	public void setProfileImage(byte[] profileImage) {
//		this.profileImage = profileImage;
//	}

	public Uloga getUloga() {
		return uloga;
	}

	public void setUloga(Uloga uloga) {
		this.uloga = uloga;
	}

	public ProfilnaSlika getProfilnaSlika() {
		return profilnaSlika;
	}

	public void setProfilnaSlika(ProfilnaSlika profilnaSlika) {
		this.profilnaSlika = profilnaSlika;
	}

}

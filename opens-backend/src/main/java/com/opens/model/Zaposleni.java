package com.opens.model;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.Table;

@Entity
@Table(name = "zaposleni")
public class Zaposleni extends Korisnik{

	@Column(name = "password")
	private String password;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(name = "zaposleni_uloge", joinColumns = @JoinColumn(name = "zaposleni_id"), inverseJoinColumns = @JoinColumn(name = "uloga_id"))
	private Set<Uloga> uloge = new HashSet<>();
	
	@Column(nullable = false)
	private boolean deleted = false;

	public Zaposleni() {
	}

	public Zaposleni(String ime, String prezime, Rod rod, Integer godine, String mestoBoravista, String brojTelefona,
			String email, String password) {
		super(ime, prezime, rod, godine, mestoBoravista, brojTelefona, email);
		
		this.password = password;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Set<Uloga> getUloge() {
		return uloge;
	}

	public void setUloge(Set<Uloga> uloge) {
		this.uloge = uloge;
	}

	public boolean isDeleted() {
		return deleted;
	}

	public void setDeleted(boolean deleted) {
		this.deleted = deleted;
	}
	
	
	
	
}

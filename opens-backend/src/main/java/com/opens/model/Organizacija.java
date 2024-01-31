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

}

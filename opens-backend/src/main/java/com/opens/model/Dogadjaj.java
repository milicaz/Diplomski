package com.opens.model;

import java.time.LocalDate;
import java.time.LocalTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "dogadjaji")
public class Dogadjaj {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column(name = "naziv")
	private String naziv;
	
	@Column(name = "datum")
	private LocalDate datum;
	
	@Column(name = "pocetak_dogadjaja")
	private LocalTime pocetakDogadjaja;
	
	@Column(name = "kraj_dogadjaja")
	private LocalTime krajDogadjaja;
	
	@Column(name = "mesto")
	private MestoDogadjaja mesto;
	
	@Column(name = "vrsta")
	private TipDogadjaja vrsta;
	
	
	
	

}

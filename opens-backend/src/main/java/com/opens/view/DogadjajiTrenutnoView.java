package com.opens.view;

import java.time.LocalDate;
import java.time.LocalTime;

import org.hibernate.annotations.Immutable;
import org.hibernate.annotations.Subselect;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
@Immutable
@Subselect("select * from dogadjaji_trenutno_view")
public class DogadjajiTrenutnoView {
	
	@Id
	private Long id;
	private String naziv_aktivnosti;
	private LocalDate datum;
	private LocalTime pocetak_dogadjaja;
	private LocalTime kraj_dogadjaja;
	private String mesto;
	private String vrsta;
	private String organizacija;
	
	
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getNaziv_aktivnosti() {
		return naziv_aktivnosti;
	}
	public void setNaziv_aktivnosti(String naziv_aktivnosti) {
		this.naziv_aktivnosti = naziv_aktivnosti;
	}
	public LocalDate getDatum() {
		return datum;
	}
	public void setDatum(LocalDate datum) {
		this.datum = datum;
	}
	
	public LocalTime getPocetak_dogadjaja() {
		return pocetak_dogadjaja;
	}
	public void setPocetak_dogadjaja(LocalTime pocetak_dogadjaja) {
		this.pocetak_dogadjaja = pocetak_dogadjaja;
	}
	public LocalTime getKraj_dogadjaja() {
		return kraj_dogadjaja;
	}
	public void setKraj_dogadjaja(LocalTime kraj_dogadjaja) {
		this.kraj_dogadjaja = kraj_dogadjaja;
	}
	public String getMesto() {
		return mesto;
	}
	public void setMesto(String mesto) {
		this.mesto = mesto;
	}
	public String getVrsta() {
		return vrsta;
	}
	public void setVrsta(String vrsta) {
		this.vrsta = vrsta;
	}
	public String getOrganizacija() {
		return organizacija;
	}
	public void setOrganizacija(String organizacija) {
		this.organizacija = organizacija;
	}
	
	

}
